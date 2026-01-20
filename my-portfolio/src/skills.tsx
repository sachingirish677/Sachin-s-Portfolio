import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';


export default function Skills() {
  const [skills, setSkills] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/skills')
      .then(res => res.json())
      .then(data => setSkills(data))
      .catch(err => console.error('Error fetching skills:', err));
  }, []);
  return (
    <>
      <motion.div
        className="skills-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="skills" id="skills">Skills</h1>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div className="skill-card" key={index}>
              <img src={skill.icon} alt={skill.name} className="skill-icon" />
              <p className="skill-name">{skill.name}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  )
}