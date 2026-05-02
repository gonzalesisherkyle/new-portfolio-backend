const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/projectModel');
const Experience = require('./models/experienceModel');
const Skill = require('./models/skillModel');
const User = require('./models/userModel');
const bcrypt = require('bcryptjs');

dotenv.config();

const users = [
  {
    name: process.env.ADMIN_NAME,
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    isAdmin: true
  }
];

const projects = [
  {
    title: 'E-Commerce Platform',
    slug: 'ecommerce-platform',
    thumbnail: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1600',
    description: 'A full-featured e-commerce solution with real-time inventory management.',
    problem: 'Traditional e-commerce platforms were slow and lacked real-time synchronization between multiple warehouses.',
    solution: 'Built a high-performance MERN stack application using Redis for caching and WebSockets for real-time updates.',
    architecture: 'Microservices architecture with Node.js and Express, using MongoDB as the primary database.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Redis', 'Tailwind CSS'],
    challenges: 'Ensuring consistent inventory levels across parallel transactions was the biggest hurdle.',
    links: { github: 'https://github.com', live: 'https://example.com' },
    featured: true
  },
  {
    title: 'AI Task Automator',
    slug: 'ai-task-automator',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1600',
    description: 'Intelligent task management system powered by GPT-4.',
    problem: 'Project managers spend too much time manually assigning tasks and tracking dependencies.',
    solution: 'Implemented an AI layer that automatically suggests task assignments based on team member skills and workload.',
    architecture: 'Event-driven architecture using RabbitMQ for task processing and OpenAI API for intelligence.',
    techStack: ['Next.js', 'Express', 'PostgreSQL', 'OpenAI API', 'Docker'],
    challenges: 'Optimizing prompt engineering for consistent structured outputs was critical.',
    links: { github: 'https://github.com' },
    featured: true
  }
];

const experiences = [
  {
    company: 'Tech Innovators Inc.',
    position: 'Senior Software Engineer',
    location: 'San Francisco, CA',
    startDate: new Date('2021-06-01'),
    current: true,
    description: [
      'Led a team of 5 developers to rebuild the core SaaS platform.',
      'Reduced server response time by 40% through query optimization.',
      'Mentored junior developers and established CI/CD best practices.'
    ],
    techStack: ['React', 'Node.js', 'AWS', 'Kubernetes']
  },
  {
    company: 'Creative Solutions',
    position: 'Full Stack Developer',
    location: 'Austin, TX',
    startDate: new Date('2018-03-01'),
    endDate: new Date('2021-05-30'),
    current: false,
    description: [
      'Developed and maintained over 15 client websites.',
      'Integrated third-party APIs for payment processing and CRM.',
      'Improved SEO rankings for clients by implementing SSR.'
    ],
    techStack: ['Vue.js', 'PHP', 'MySQL', 'Laravel']
  }
];

const skills = [
  { name: 'React', category: 'Frontend', icon: 'SiReact', color: '#61DAFB', proficiency: 95 },
  { name: 'Node.js', category: 'Backend', icon: 'SiNodedotjs', color: '#339933', proficiency: 90 },
  { name: 'MongoDB', category: 'Backend', icon: 'SiMongodb', color: '#47A248', proficiency: 85 },
  { name: 'Tailwind CSS', category: 'Frontend', icon: 'SiTailwindcss', color: '#06B6D4', proficiency: 90 },
  { name: 'Docker', category: 'Tools', icon: 'SiDocker', color: '#2496ED', proficiency: 80 },
  { name: 'AWS', category: 'Cloud', icon: 'SiAmazonaws', color: '#FF9900', proficiency: 75 },
  { name: 'TypeScript', category: 'Frontend', icon: 'SiTypescript', color: '#3178C6', proficiency: 85 }
];

const seedData = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in your .env file');
    }
    await mongoose.connect(process.env.MONGO_URI);

    await Project.deleteMany();
    await Experience.deleteMany();
    await Skill.deleteMany();
    await User.deleteMany();

    await Project.insertMany(projects);
    await Experience.insertMany(experiences);
    await Skill.insertMany(skills);
    await User.insertMany(users);

    console.log('Data Seeded Successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
