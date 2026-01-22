import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { API_ENDPOINTS } from './config/api';

import leftArrow from './assets/Left.svg';
import rightArrow from './assets/Right.svg';

interface Technology {
  name: string;
  icon: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  link?: string;
  technologies: Technology[];
}

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch(API_ENDPOINTS.projects)
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error('Error fetching projects:', err));
  }, []);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
      setIsTransitioning(false);
    }, 300);
  };

  const handlePrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
      setIsTransitioning(false);
    }, 300);
  };


  const currentProject = projects[currentIndex];

  if (!currentProject) return <div>Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="project" id="projects">Projects</h1>
      <div className="Project-section">
        <div className="Project-card projects-container">
          <button
            className="nav-button prev"
            onClick={handlePrevious}
            disabled={isTransitioning}
          >
            <img src={leftArrow} alt="Previous" className="nav-icon" />
          </button>

          <button
            className="nav-button next"
            onClick={handleNext}
            disabled={isTransitioning}
          >
            <img src={rightArrow} alt="Next" className="nav-icon" />
          </button>

          <div
            className="project-content"
            style={{ opacity: isTransitioning ? 0 : 1 }}
          >
            <h2 className="project-title">
              {currentProject.title}
            </h2>
            <p className="project-description">
              {currentProject.description}
            </p>
            {currentProject.link && (
              <a
                href={currentProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                View Project →
              </a>
            )}
            <div className="tech-stack">
              {currentProject.technologies.map((tech, idx) => (
                <div key={idx} className="tech-item">
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className="tech-icon"
                  />
                </div>
              ))}
            </div>

            <div className="indicators">
              {projects.map((_, idx) => (
                <div
                  key={idx}
                  className={`indicator ${idx === currentIndex ? 'active' : 'inactive'}`}
                  onClick={() => {
                    if (!isTransitioning && idx !== currentIndex) {
                      setIsTransitioning(true);
                      setTimeout(() => {
                        setCurrentIndex(idx);
                        setIsTransitioning(false);
                      }, 300);
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}