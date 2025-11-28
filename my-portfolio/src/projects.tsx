  import { useState } from 'react';
  import { ChevronLeft, ChevronRight } from 'lucide-react';

  export default function Projects() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const projects = [
      {
        id: 1,
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
        id: 2,
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
        id: 3,
        title: "Project Three",
        description: "Mobile-first social media dashboard with analytics, user engagement tracking, and content scheduling features.",
        technologies: [
          { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
          { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
          { name: "Redux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" }
        ]
      }
    ];

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

    return (
      <>
        <h1 className="project">Projects</h1>
        <div className="Project-section">
          <div className="Project-card projects-container">
            <button
              className="nav-button prev"
              onClick={handlePrevious}
              disabled={isTransitioning}
            >
              <ChevronLeft size={28} />
            </button>

            <button
              className="nav-button next"
              onClick={handleNext}
              disabled={isTransitioning}
            >
              <ChevronRight size={28} />
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
                    <span className="tech-name">
                      {tech.name}
                    </span>
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
      </>
    );
  }