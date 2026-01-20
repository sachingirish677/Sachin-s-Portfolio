import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project';
import Skill from './models/Skill';
import Education from './models/Education';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

const seedData = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB for seeding');

        await Project.deleteMany({});
        await Skill.deleteMany({});
        await Education.deleteMany({});

        const projects = [
            {
                title: "Project One",
                description: "A modern web application built with React and Node.js featuring real-time data synchronization and responsive design.",
                link: "https://github.com/yourusername/project-one",
                technologies: [
                    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
                    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
                    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" }
                ]
            },
            {
                title: "Project Two",
                description: "E-commerce platform with advanced search capabilities, payment integration, and inventory management system.",
                link: "https://github.com/yourusername/project-two",
                technologies: [
                    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
                    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
                    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" }
                ]
            },
            {
                title: "Project Three",
                description: "Mobile-first social media dashboard with analytics, user engagement tracking, and content scheduling features.",
                technologies: [
                    { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
                    { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
                    { name: "Redux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" }
                ]
            }
        ];

        const skills = [
            { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
            { name: "NodeJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
            { name: "Shopify", icon: "https://cdn.worldvectorlogo.com/logos/shopify.svg" },
            { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
            { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        ];

        const education = [
            {
                degree: "Bachelor of Computer Science",
                institution: "ABC University",
                year: "2019 – 2023",
            },
            {
                degree: "Higher Secondary Education",
                institution: "XYZ School",
                year: "2017 – 2019",
            },
            {
                degree: "Secondary School",
                institution: "Little Flower School",
                year: "2017",
            },
        ];

        await Project.insertMany(projects);
        await Skill.insertMany(skills);
        await Education.insertMany(education);

        console.log('Database seeded successfully');
        process.exit(0);
    } catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
};

seedData();
