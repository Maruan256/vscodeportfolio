export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  highlights: string[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  graduationDate: string;
  achievements: string[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  summary: string;
  location: string;
  email: string;
  github?: string;
  linkedin?: string;
  website?: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  projects: Project[];
  experience: Experience[];
  education: Education[];
  skills: {
    technical: string[];
    soft: string[];
    languages: string[];
  };
}

// Default portfolio data
export const portfolioData: PortfolioData = {
  personalInfo: {
    name: "Benny Blitz",
    title: "Full Stack Developer",
    summary: "Passionate developer with expertise in building scalable web applications and solving complex problems.",
    location: "San Francisco, CA",
    email: "benny@example.com",
    github: "https://github.com/bennyblitz",
    linkedin: "https://linkedin.com/in/bennyblitz",
  },
  projects: [
    {
      id: "project-1",
      title: "Portfolio Variation",
      description: "A modern portfolio website with theme switching and AI assistant capabilities.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "AI Integration"],
      highlights: [
        "Implemented dark/light theme switching",
        "Created an AI assistant interface",
        "Built responsive layout with modern design principles"
      ]
    }
    // Add more projects here
  ],
  experience: [
    {
      id: "exp-1",
      company: "Tech Solutions Inc.",
      position: "Senior Full Stack Developer",
      startDate: "2021-01",
      endDate: "Present",
      description: "Lead developer for enterprise web applications",
      achievements: [
        "Reduced application load time by 40%",
        "Implemented CI/CD pipeline",
        "Mentored junior developers"
      ],
      technologies: ["React", "Node.js", "PostgreSQL", "AWS"]
    }
    // Add more experience here
  ],
  education: [
    {
      id: "edu-1",
      institution: "University of Technology",
      degree: "Bachelor of Science",
      field: "Computer Science",
      graduationDate: "2020",
      achievements: [
        "Graduated with Honors",
        "Led the Computer Science Club",
        "Published research paper on AI applications"
      ]
    }
  ],
  skills: {
    technical: [
      "JavaScript/TypeScript",
      "React",
      "Node.js",
      "Python",
      "SQL",
      "AWS"
    ],
    soft: [
      "Problem Solving",
      "Team Leadership",
      "Communication",
      "Project Management"
    ],
    languages: [
      "English (Native)",
      "Spanish (Intermediate)"
    ]
  }
}; 