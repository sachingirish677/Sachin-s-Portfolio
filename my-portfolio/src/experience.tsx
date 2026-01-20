import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import axios from 'axios';

interface ExperienceData {
    _id: string;
    company: string;
    role: string;
    duration: string;
    description: string;
}

export default function Experience() {
    const [experiences, setExperiences] = useState<ExperienceData[]>([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/experiences')
            .then(res => setExperiences(res.data))
            .catch(err => console.error('Error fetching experiences:', err));
    }, []);

    // Placeholder data if no data from backend
    const placeholderExperience: ExperienceData[] = [
        {
            _id: 'place1',
            company: 'Tech Solutions Inc.',
            role: 'Senior Developer',
            duration: '2023 - Present',
            description: 'Leading the frontend team, architecting scalable React applications, and mentoring junior developers.'
        },
        {
            _id: 'place2',
            company: 'Creative Agency',
            role: 'Web Developer',
            duration: '2021 - 2023',
            description: 'Developed responsive websites using HTML, CSS, and Javascript. Collaborated with designers to implement pixel-perfect UIs.'
        }
    ];

    const displayData = experiences.length > 0 ? experiences : placeholderExperience;

    return (
        <motion.div
            className="experience-main"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8 }}
        >
            <h1 className="experience-title" id="experience">Experience</h1>
            {displayData.map((exp) => (
                <div key={exp._id} className="educationcard experience-card">
                    <div className="exp-header">
                        <h2 className="exp-company">{exp.company}</h2>
                        <span className="exp-duration">{exp.duration}</span>
                    </div>
                    <h3 className="exp-role">{exp.role}</h3>
                    <p className="exp-description">{exp.description}</p>
                </div>
            ))}
        </motion.div>
    );
}
