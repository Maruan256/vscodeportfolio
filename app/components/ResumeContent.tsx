'use client';

import { useEffect } from 'react';
import Prism from 'prismjs';
import { portfolioData } from '../data/portfolio';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-json';

interface ResumeContentProps {
  fileId: string;
  theme: 'dark' | 'light';
}

export default function ResumeContent({ fileId, theme }: ResumeContentProps) {
  useEffect(() => {
    // Load appropriate theme
    const themeLink = document.createElement('link');
    themeLink.href = theme === 'dark' 
      ? 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/themes/prism-tomorrow.min.css'
      : 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/themes/prism.min.css';
    themeLink.rel = 'stylesheet';
    document.head.appendChild(themeLink);

    // Highlight code
    Prism.highlightAll();

    return () => {
      document.head.removeChild(themeLink);
    };
  }, [theme]);

  const getContent = () => {
    const { personalInfo, experience, skills, projects, education } = portfolioData;
    
    switch (fileId) {
      case 'react-component.tsx':
        return `import React from 'react';

interface DeveloperProps {
  name: string;
  title: string;
  experience: Array<{
    company: string;
    position: string;
    period: string;
    achievements: string[];
  }>;
}

export default function ${personalInfo.name.split(' ')[0]}Portfolio({ 
  name = "${personalInfo.name}",
  title = "${personalInfo.title}",
  experience = ${JSON.stringify(experience.map(exp => ({
    company: exp.company,
    position: exp.position,
    period: `${exp.startDate} - ${exp.endDate}`,
    achievements: exp.achievements
  })), null, 2)}
}: DeveloperProps) {
  const skills = ${JSON.stringify(skills.technical, null, 2)};

  return (
    <div className="developer-profile">
      <header>
        <h1>{name}</h1>
        <h2>{title}</h2>
        <p>${personalInfo.summary}</p>
      </header>
      
      <section className="skills">
        {skills.map(skill => (
          <span key={skill} className="skill-tag">
            {skill}
          </span>
        ))}
      </section>
      
      <section className="experience">
        {experience.map(job => (
          <div key={job.company} className="job-item">
            <h3>{job.position}</h3>
            <h4>{job.company}</h4>
            <p>{job.period}</p>
            <ul>
              {job.achievements.map(achievement => (
                <li key={achievement}>{achievement}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}`;

      case 'angular-component.ts':
        return `import { Component } from '@angular/core';

@Component({
  selector: 'app-developer-profile',
  templateUrl: './developer-profile.component.html',
  styleUrls: ['./developer-profile.component.css']
})
export class DeveloperProfileComponent {
  name: string = '${personalInfo.name}';
  title: string = '${personalInfo.title}';
  summary: string = '${personalInfo.summary}';
  
  skills: string[] = ${JSON.stringify(skills.technical, null, 2)};
  
  experience = ${JSON.stringify(experience.map(exp => ({
    position: exp.position,
    company: exp.company,
    period: `${exp.startDate} - ${exp.endDate}`,
    achievements: exp.achievements
  })), null, 2)};
  
  projects = ${JSON.stringify(projects.map(proj => ({
    title: proj.title,
    description: proj.description,
    technologies: proj.technologies
  })), null, 2)};
}`;

      case 'angular-template.html':
        return `<div class="developer-profile">
  <header class="profile-header">
    <h1>{{name}}</h1>
    <h2>{{title}}</h2>
    <p class="summary">{{summary}}</p>
  </header>

  <section class="skills-section">
    <h3>Technical Expertise</h3>
    <div class="skills-grid">
      <div *ngFor="let skill of skills" class="skill-item">
        {{skill}}
      </div>
    </div>
  </section>

  <section class="experience-section">
    <h3>Professional Journey</h3>
    <div *ngFor="let job of experience" class="job-item">
      <h4>{{job.position}} at {{job.company}}</h4>
      <p class="period">{{job.period}}</p>
      <ul class="achievements">
        <li *ngFor="let achievement of job.achievements">
          {{achievement}}
        </li>
      </ul>
    </div>
  </section>

  <section class="projects-section">
    <h3>Notable Projects</h3>
    <div *ngFor="let project of projects" class="project-item">
      <h4>{{project.title}}</h4>
      <p>{{project.description}}</p>
      <div class="tech-stack">
        <span *ngFor="let tech of project.technologies" class="tech-tag">
          {{tech}}
        </span>
      </div>
    </div>
  </section>
</div>`;

      case 'angular-styles.css':
        return `.developer-profile {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.profile-header {
  text-align: center;
  margin-bottom: 3rem;
}

.profile-header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.profile-header h2 {
  font-size: 1.5rem;
  color: #34495e;
  margin-bottom: 1rem;
}

.summary {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.skill-item {
  background: #3498db;
  color: white;
  padding: 0.75rem;
  border-radius: 4px;
  text-align: center;
  font-weight: 500;
  transition: transform 0.2s;
}

.skill-item:hover {
  transform: translateY(-2px);
}

.job-item {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border-left: 4px solid #3498db;
  background: #f8f9fa;
}

.project-item {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.tech-tag {
  display: inline-block;
  padding: 0.4rem 0.8rem;
  margin: 0.25rem;
  background: #e1f0fa;
  color: #2980b9;
  border-radius: 20px;
  font-size: 0.9rem;
}`;

      case 'java-spring.java':
        return `package com.portfolio.developer;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.List;
import java.util.Arrays;

@RestController
public class DeveloperController {
    
    private final Developer developer = new Developer(
        "${personalInfo.name}",
        "${personalInfo.title}",
        "${personalInfo.summary}",
        Arrays.asList(
            ${skills.technical.map(skill => `"${skill}"`).join(',\n            ')}
        )
    );

    @GetMapping("/api/developer")
    public Developer getDeveloper() {
        return developer;
    }

    @GetMapping("/api/experience")
    public List<Experience> getExperience() {
        return Arrays.asList(
            ${experience.map(exp => `
            new Experience(
                "${exp.position}",
                "${exp.company}",
                "${exp.startDate}",
                "${exp.endDate}",
                Arrays.asList(
                    ${exp.achievements.map(a => `"${a}"`).join(',\n                    ')}
                )
            )`).join(',\n            ')}
        );
    }

    @GetMapping("/api/projects")
    public List<Project> getProjects() {
        return Arrays.asList(
            ${projects.map(proj => `
            new Project(
                "${proj.title}",
                "${proj.description}",
                Arrays.asList(
                    ${proj.technologies.map(t => `"${t}"`).join(',\n                    ')}
                )
            )`).join(',\n            ')}
        );
    }
}`;

      case 'ruby-on-rails.erb':
        return `<%# Developer Profile Template %>
<div class="developer-profile">
  <header class="profile-header">
    <h1><%= @developer.name %></h1>
    <h2><%= @developer.title %></h2>
    <p class="summary"><%= @developer.summary %></p>
  </header>

  <section class="skills">
    <h3>Technical Expertise</h3>
    <div class="skills-grid">
      <% @developer.skills.each do |skill| %>
        <div class="skill-item">
          <%= skill %>
        </div>
      <% end %>
    </div>
  </section>

  <section class="experience">
    <h3>Professional Experience</h3>
    <% @developer.experience.each do |job| %>
      <div class="job-card">
        <h4><%= job.position %> at <%= job.company %></h4>
        <p class="period"><%= job.start_date %> - <%= job.end_date %></p>
        <ul class="achievements">
          <% job.achievements.each do |achievement| %>
            <li><%= achievement %></li>
          <% end %>
        </ul>
      </div>
    <% end %>
  </section>

  <section class="projects">
    <h3>Portfolio Projects</h3>
    <% @developer.projects.each do |project| %>
      <div class="project-card">
        <h4><%= project.title %></h4>
        <p><%= project.description %></p>
        <div class="technologies">
          <% project.technologies.each do |tech| %>
            <span class="tech-tag"><%= tech %></span>
          <% end %>
        </div>
      </div>
    <% end %>
  </section>
</div>

<%# Data initialization in controller %>
<%# 
@developer = Developer.new(
  name: "${personalInfo.name}",
  title: "${personalInfo.title}",
  summary: "${personalInfo.summary}",
  skills: ${JSON.stringify(skills.technical)},
  experience: ${JSON.stringify(experience)},
  projects: ${JSON.stringify(projects)}
)
%>`;

      case 'node-express.js':
        return `const express = require('express');
const router = express.Router();

// Developer profile data
const developer = {
  name: '${personalInfo.name}',
  title: '${personalInfo.title}',
  summary: '${personalInfo.summary}',
  contact: {
    email: '${personalInfo.email}',
    github: '${personalInfo.github}',
    linkedin: '${personalInfo.linkedin}'
  },
  skills: ${JSON.stringify(skills, null, 2)},
  experience: ${JSON.stringify(experience, null, 2)},
  projects: ${JSON.stringify(projects, null, 2)}
};

// Routes
router.get('/api/profile', (req, res) => {
  res.json(developer);
});

router.get('/api/experience', (req, res) => {
  res.json(developer.experience);
});

router.get('/api/projects', (req, res) => {
  res.json(developer.projects);
});

router.get('/api/skills', (req, res) => {
  res.json(developer.skills);
});

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

module.exports = router;`;

      case 'postgresql.sql':
        return `-- Create tables for developer portfolio
CREATE TABLE developers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  title VARCHAR(100) NOT NULL,
  summary TEXT,
  email VARCHAR(255),
  github_url VARCHAR(255),
  linkedin_url VARCHAR(255)
);

CREATE TABLE skills (
  id SERIAL PRIMARY KEY,
  developer_id INTEGER REFERENCES developers(id),
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL
);

CREATE TABLE experience (
  id SERIAL PRIMARY KEY,
  developer_id INTEGER REFERENCES developers(id),
  company VARCHAR(100) NOT NULL,
  position VARCHAR(100) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  description TEXT
);

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  developer_id INTEGER REFERENCES developers(id),
  title VARCHAR(100) NOT NULL,
  description TEXT,
  github_url VARCHAR(255),
  live_url VARCHAR(255)
);

-- Insert developer data
INSERT INTO developers (name, title, summary, email, github_url, linkedin_url)
VALUES (
  '${personalInfo.name}',
  '${personalInfo.title}',
  '${personalInfo.summary}',
  '${personalInfo.email}',
  '${personalInfo.github}',
  '${personalInfo.linkedin}'
);

-- Insert skills
${skills.technical.map((skill, i) => 
  `INSERT INTO skills (developer_id, name, category) VALUES (1, '${skill}', 'technical');`
).join('\n')}

-- Insert experience
${experience.map((exp, i) => 
  `INSERT INTO experience (developer_id, company, position, start_date, end_date, description)
VALUES (
  1,
  '${exp.company}',
  '${exp.position}',
  '${exp.startDate}',
  ${exp.endDate === 'Present' ? 'NULL' : `'${exp.endDate}'`},
  '${exp.description}'
);`
).join('\n\n')}

-- Insert projects
${projects.map((proj, i) => 
  `INSERT INTO projects (developer_id, title, description, github_url)
VALUES (
  1,
  '${proj.title}',
  '${proj.description}',
  '${proj.githubUrl || null}'
);`
).join('\n\n')}

-- Query to get complete developer profile
SELECT 
  d.*,
  array_agg(DISTINCT s.name) as skills,
  json_agg(DISTINCT jsonb_build_object(
    'company', e.company,
    'position', e.position,
    'startDate', e.start_date,
    'endDate', e.end_date,
    'description', e.description
  )) as experience,
  json_agg(DISTINCT jsonb_build_object(
    'title', p.title,
    'description', p.description,
    'githubUrl', p.github_url,
    'liveUrl', p.live_url
  )) as projects
FROM developers d
LEFT JOIN skills s ON s.developer_id = d.id
LEFT JOIN experience e ON e.developer_id = d.id
LEFT JOIN projects p ON p.developer_id = d.id
GROUP BY d.id;`;

      case 'mongodb.js':
        return `// MongoDB Schema and Data for Developer Portfolio

// Define Schemas
const developerSchema = {
  name: String,
  title: String,
  summary: String,
  contact: {
    email: String,
    github: String,
    linkedin: String
  },
  skills: {
    technical: [String],
    soft: [String],
    languages: [String]
  },
  experience: [{
    company: String,
    position: String,
    startDate: Date,
    endDate: Date,
    description: String,
    achievements: [String],
    technologies: [String]
  }],
  projects: [{
    title: String,
    description: String,
    technologies: [String],
    githubUrl: String,
    liveUrl: String,
    highlights: [String]
  }]
};

// Insert developer data
db.developers.insertOne({
  name: '${personalInfo.name}',
  title: '${personalInfo.title}',
  summary: '${personalInfo.summary}',
  contact: ${JSON.stringify(personalInfo, null, 2)},
  skills: ${JSON.stringify(skills, null, 2)},
  experience: ${JSON.stringify(experience, null, 2)},
  projects: ${JSON.stringify(projects, null, 2)}
});

// Queries to retrieve developer information
// Get complete profile
db.developers.findOne({ name: '${personalInfo.name}' });

// Get experience
db.developers.findOne(
  { name: '${personalInfo.name}' },
  { experience: 1 }
);

// Get projects with specific technology
db.developers.findOne(
  { name: '${personalInfo.name}' },
  { projects: { $elemMatch: { technologies: 'React' } } }
);

// Aggregation to get skills summary
db.developers.aggregate([
  { $match: { name: '${personalInfo.name}' } },
  { $project: {
    _id: 0,
    totalSkills: { $size: '$skills.technical' },
    skillCategories: {
      $objectToArray: '$skills'
    }
  }}
]);`;

      default:
        return 'Select a file to view content';
    }
  };

  const getSyntaxClass = () => {
    if (fileId.endsWith('.tsx') || fileId.endsWith('.ts')) return 'language-typescript';
    if (fileId.endsWith('.js')) return 'language-javascript';
    if (fileId.endsWith('.css')) return 'language-css';
    if (fileId.endsWith('.html')) return 'language-markup';
    if (fileId.endsWith('.java')) return 'language-java';
    if (fileId.endsWith('.erb')) return 'language-ruby';
    if (fileId.endsWith('.sql')) return 'language-sql';
    if (fileId.endsWith('.yml')) return 'language-yaml';
    if (fileId.endsWith('.md')) return 'language-markdown';
    if (fileId.endsWith('.json')) return 'language-json';
    return 'language-typescript';
  };

  return (
    <pre className={getSyntaxClass()}>
      <code className={getSyntaxClass()}>
        {getContent()}
      </code>
    </pre>
  );
}
