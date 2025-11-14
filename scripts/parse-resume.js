import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read resume.md
const resumePath = path.join(__dirname, '../resume.md');
const resumeContent = fs.readFileSync(resumePath, 'utf-8');

// Parse markdown content
function parseResume(content) {
  const lines = content.split('\n');
  const data = {
    personal: {},
    summary: '',
    experience: [],
    projects: [],
    skills: {},
    certifications: [],
    awards: [],
    education: {}
  };

  let currentSection = null;
  let currentExperience = null;
  let currentProject = null;
  let collectingText = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Parse header (name, title, location, links)
    if (i === 0 && line.startsWith('# ')) {
      data.personal.name = line.replace('# ', '').trim();
      continue;
    }
    
    if (i === 1 && line.startsWith('**')) {
      data.personal.title = line.replace(/\*\*/g, '').trim();
      continue;
    }
    
    if (i === 2) {
      data.personal.location = line.trim();
      continue;
    }
    
    if (i === 3 && line.startsWith('[')) {
      const linkMatches = line.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g);
      data.personal.links = [];
      for (const match of linkMatches) {
        data.personal.links.push({ text: match[1], url: match[2] });
      }
      continue;
    }

    // Detect sections
    if (line.startsWith('## ')) {
      // Save previous section content
      if (currentSection === 'summary' && collectingText) {
        data.summary = collectingText.trim();
        collectingText = '';
      }
      
      const sectionTitle = line.replace('## ', '').trim();
      
      if (sectionTitle === 'Summary') {
        currentSection = 'summary';
      } else if (sectionTitle === 'Professional Experience') {
        currentSection = 'experience';
      } else if (sectionTitle === 'Key Projects') {
        currentSection = 'projects';
      } else if (sectionTitle === 'Technical Skills') {
        currentSection = 'skills';
      } else if (sectionTitle === 'Certifications & Awards') {
        currentSection = 'certifications';
      } else if (sectionTitle === 'Education') {
        currentSection = 'education';
      }
      continue;
    }

    // Parse sections
    if (currentSection === 'summary') {
      if (line && !line.startsWith('---')) {
        collectingText += line + ' ';
      }
    }
    
    else if (currentSection === 'experience') {
      // Job title
      if (line.startsWith('### **')) {
        if (currentExperience) {
          data.experience.push(currentExperience);
        }
        currentExperience = {
          title: line.replace('### **', '').replace('**', '').trim(),
          company: '',
          location: '',
          period: '',
          achievements: []
        };
      }
      // Company and location
      else if (currentExperience && line.startsWith('**') && line.includes('–')) {
        const companyLine = line.replace(/\*\*/g, '').trim();
        const parts = companyLine.split('–');
        currentExperience.company = parts[0].trim();
        currentExperience.location = parts[1].trim();
      }
      // Period
      else if (currentExperience && line.startsWith('*') && line.includes('–')) {
        currentExperience.period = line.replace(/\*/g, '').trim();
      }
      // Achievements
      else if (currentExperience && line.startsWith('-')) {
        const achievement = line.replace(/^-\s*/, '').trim();
        if (achievement && achievement !== '--') {
          currentExperience.achievements.push(achievement);
        }
      }
    }
    
    else if (currentSection === 'projects') {
      // Project title
      if (line.startsWith('### **')) {
        if (currentProject) {
          data.projects.push(currentProject);
        }
        currentProject = {
          title: line.replace('### **', '').replace('**', '').trim(),
          period: '',
          description: '',
          stack: []
        };
      }
      // Period
      else if (currentProject && line.startsWith('*') && line.includes('–')) {
        currentProject.period = line.replace(/\*/g, '').trim();
      }
      // Stack
      else if (currentProject && line.startsWith('**Stack:**')) {
        const stackLine = line.replace('**Stack:**', '').trim();
        currentProject.stack = stackLine.split(',').map(s => s.trim());
      }
      // Description
      else if (currentProject && line && !line.startsWith('---')) {
        currentProject.description += line + ' ';
      }
    }
    
    else if (currentSection === 'skills') {
      if (line.startsWith('**') && line.includes(':**')) {
        const categoryMatch = line.match(/\*\*([^:]+):\*\*\s*(.+)/);
        if (categoryMatch) {
          const category = categoryMatch[1].trim();
          const skills = categoryMatch[2].split(',').map(s => s.trim());
          data.skills[category] = skills;
        }
      }
    }
    
    else if (currentSection === 'certifications') {
      if (line.startsWith('-')) {
        const text = line.replace(/^-\s*/, '').replace(/\*\*/g, '').trim();
        // Distinguish between certifications and awards
        if (text && text !== '--') {
          if (text.includes('Certified') || text.includes('Certificate')) {
            data.certifications.push(text);
          } else {
            data.awards.push(text);
          }
        }
      }
    }
    
    else if (currentSection === 'education') {
      if (line.startsWith('**') && line.includes('–') && !line.includes(':**')) {
        const schoolMatch = line.match(/\*\*([^–]+)–([^*]+)\*\*/);
        if (schoolMatch) {
          data.education.school = schoolMatch[1].trim();
          data.education.location = schoolMatch[2].trim();
        }
      } else if (line.startsWith('*') && line.includes('–') && !line.includes('**')) {
        const degreeMatch = line.match(/\*([^–]+)–([^*]+)\*/);
        if (degreeMatch) {
          data.education.degree = degreeMatch[1].trim();
          data.education.honors = degreeMatch[2].trim();
        } else {
          data.education.period = line.replace(/\*/g, '').trim();
        }
      } else if (line.startsWith('Majors:')) {
        data.education.majors = line.replace('Majors:', '').trim();
      } else if (line.startsWith('Minor:')) {
        data.education.minor = line.replace('Minor:', '').trim();
      }
    }
  }

  // Save last items
  if (currentExperience) {
    data.experience.push(currentExperience);
  }
  if (currentProject) {
    data.projects.push(currentProject);
  }
  if (collectingText && currentSection === 'summary') {
    data.summary = collectingText.trim();
  }

  // Clean up descriptions
  data.projects = data.projects.map(p => ({
    ...p,
    description: p.description.trim()
  }));

  return data;
}

// Parse and generate JSON
const resumeData = parseResume(resumeContent);

// Write to src directory
const outputPath = path.join(__dirname, '../src/data/resume-data.json');
const outputDir = path.dirname(outputPath);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(resumeData, null, 2));

console.log('✅ Resume data generated successfully at src/data/resume-data.json');
console.log(`   - Name: ${resumeData.personal.name}`);
console.log(`   - Title: ${resumeData.personal.title}`);
console.log(`   - Experience positions: ${resumeData.experience.length}`);
console.log(`   - Projects: ${resumeData.projects.length}`);
console.log(`   - Skill categories: ${Object.keys(resumeData.skills).length}`);
console.log(`   - Certifications: ${resumeData.certifications.length}`);
console.log(`   - Awards: ${resumeData.awards.length}`);

