import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { API_ENDPOINTS } from './config/api';

import resumePdf from './assets/Resume.pdf';

interface AboutData {
    description: string;
    imageUrl: string;
}

export default function About() {
    const [aboutData, setAboutData] = useState<AboutData | null>(null);
    const defaultPhoto = "https://i.pinimg.com/736x/6e/1f/18/6e1f18cb8ba4d4a0f5481c4aa12ecc42.jpg";

    useEffect(() => {
        axios.get(API_ENDPOINTS.about)
            .then((res: { data: AboutData }) => {
                if (res.data && (res.data.description || res.data.imageUrl)) {
                    setAboutData(res.data);
                }
            })
            .catch((err: unknown) => console.error('Error fetching about data:', err));
    }, []);

    return (
        <>
            <motion.div
                className="about-main"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="about" id="about">About Me </h1>
                <div className="about-section">
                    <div className="about-content">
                        {aboutData ? (
                            <p className="description" dangerouslySetInnerHTML={{ __html: aboutData.description }} />
                        ) : (
                            <p className="description"></p>
                        )}
                        <a href={resumePdf} download="Resume.pdf" className="resume-button">
                            Download Resume
                        </a>
                    </div>
                    <div className="circle-container">
                        <div className="blue-circle">
                            <img
                                className="profile"
                                src={aboutData?.imageUrl || defaultPhoto}
                                alt="Profile"
                            />
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    )
}   