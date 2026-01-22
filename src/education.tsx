
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { API_ENDPOINTS } from './config/api';


export default function Education() {
  const [educationData, setEducationData] = useState<any[]>([]);

  useEffect(() => {
    fetch(API_ENDPOINTS.education)
      .then(res => res.json())
      .then(data => setEducationData(data))
      .catch(err => console.error('Error fetching education:', err));
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="education" id="education">Education</h1>
      <div className="education-main">
        {educationData.map((item, index) => (
          <div className="educationcard" key={index}>
            <div className="edu-info">
              <h2>{item.degree}</h2>
              <p>{item.institution}</p>
            </div>
            <div className="edu-year">
              <span>{item.year}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
