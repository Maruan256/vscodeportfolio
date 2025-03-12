import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Using google/flan-t5-large for better quality responses
    const HF_API_ENDPOINT = "https://api-inference.huggingface.co/models/google/flan-t5-large";
    const HF_API_KEY = process.env.HF_API_KEY;

    if (!HF_API_KEY) {
      throw new Error('Missing Hugging Face API key');
    }

    // Format the prompt with context and user question
    const contextPrompt = JSON.parse(body.messages[0].content);
    const userQuestion = body.messages[1].content;
    
    // Create a more structured prompt for T5 model
    const prompt = `Answer this question about me based on the following information.

Background:
I am ${contextPrompt.portfolio.personalInfo.name}, ${contextPrompt.portfolio.personalInfo.title}.
${contextPrompt.portfolio.personalInfo.summary}

Skills:
${contextPrompt.portfolio.skills.technical.join(', ')}

Experience:
${contextPrompt.portfolio.experience.map(exp => 
  `- ${exp.position} at ${exp.company}: ${exp.achievements[0]}`
).join('\n')}

Question: ${userQuestion}

Give a helpful, natural response using the above information.`;

    console.log('Sending request to Hugging Face API...');
    console.log('Prompt:', prompt);

    const response = await fetch(HF_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${HF_API_KEY}`
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_length: 200,
          temperature: 0.3, // Lower temperature for more focused responses
          top_p: 0.95,
          do_sample: true,
          no_repeat_ngram_size: 2 // Prevent repetitive phrases
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Hugging Face API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('API Response:', data);
    
    // Extract and clean the generated text
    let generatedText = '';
    if (Array.isArray(data) && data[0]?.generated_text) {
      generatedText = data[0].generated_text;
    } else if (typeof data === 'string') {
      generatedText = data;
    } else {
      generatedText = "I apologize, but I couldn't generate a proper response at the moment.";
    }

    // Clean up the response
    generatedText = generatedText
      .replace(/^(Answer:|Response:|A:|Q:|Question:)/gi, '') // Remove common prefixes
      .replace(prompt, '') // Remove the prompt if it's included
      .trim();

    // Ensure the response starts with a capital letter and ends with proper punctuation
    generatedText = generatedText.charAt(0).toUpperCase() + generatedText.slice(1);
    if (!/[.!?]$/.test(generatedText)) {
      generatedText += '.';
    }

    return NextResponse.json({
      response: generatedText || "I apologize, but I couldn't generate a proper response at the moment."
    });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process chat request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 