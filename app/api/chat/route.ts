import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // TODO: Replace with your LLM API endpoint and key
    const LLM_API_ENDPOINT = process.env.LLM_API_ENDPOINT;
    const LLM_API_KEY = process.env.LLM_API_KEY;

    if (!LLM_API_ENDPOINT || !LLM_API_KEY) {
      throw new Error('Missing API configuration');
    }

    const response = await fetch(LLM_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LLM_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // or your preferred model
        messages: body.messages,
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error('Failed to get response from LLM API');
    }

    const data = await response.json();
    
    return NextResponse.json({
      response: data.choices[0].message.content
    });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
} 