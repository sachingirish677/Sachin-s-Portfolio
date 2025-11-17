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
        <div className="Project-card" style={{
          position: 'relative',
          overflow: 'hidden'
        }}>
          <button
            onClick={handlePrevious}
            disabled={isTransitioning}
            style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(27, 52, 171, 0.9)',
              border: '1px solid rgba(96, 108, 255, 0.4)',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              color: 'white',
              zIndex: 10,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(27, 52, 171, 1)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(27, 52, 171, 0.9)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            <ChevronLeft size={28} />
          </button>

          <button
            onClick={handleNext}
            disabled={isTransitioning}
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(27, 52, 171, 0.9)',
              border: '1px solid rgba(96, 108, 255, 0.4)',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              color: 'white',
              zIndex: 10,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(27, 52, 171, 1)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(27, 52, 171, 0.9)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            <ChevronRight size={28} />
          </button>

          <div style={{
            opacity: isTransitioning ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '60px 100px'
          }}>
            <h2 style={{ 
              color: '#1b34ab', 
              marginBottom: '20px',
              fontSize: '48px',
              fontWeight: '700',
              textAlign: 'center'
            }}>
              {currentProject.title}
            </h2>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.95)', 
              fontSize: '18px',
              lineHeight: '1.8',
              marginBottom: '30px',
              textAlign: 'center',
              maxWidth: '700px'
            }}>
              {currentProject.description}
            </p>
            {currentProject.link && (
              <a 
                href={currentProject.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#1b34ab',
                  fontSize: '16px',
                  textDecoration: 'none',
                  marginBottom: '40px',
                  padding: '10px 24px',
                  border: '2px solid rgba(27, 52, 171, 0.5)',
                  borderRadius: '24px',
                  transition: 'all 0.3s ease',
                  backgroundColor: 'rgba(27, 52, 171, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(27, 52, 171, 0.2)';
                  e.currentTarget.style.borderColor = 'rgba(27, 52, 171, 0.8)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(27, 52, 171, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(27, 52, 171, 0.5)';
                }}
              >
                View Project →
              </a>
            )}
            <div style={{ 
              display: 'flex', 
              gap: '30px', 
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              marginBottom: '40px'
            }}>
              {currentProject.technologies.map((tech, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <img 
                    src={tech.icon} 
                    alt={tech.name}
                    style={{
                      width: '60px',
                      height: '60px',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))'
                    }}
                  />
                  <span style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ 
              display: 'flex', 
              gap: '10px',
              justifyContent: 'center',
              marginTop: 'auto'
            }}>
              {projects.map((_, idx) => (
                <div
                  key={idx}
                  style={{
                    width: idx === currentIndex ? '32px' : '10px',
                    height: '10px',
                    borderRadius: '5px',
                    backgroundColor: idx === currentIndex 
                      ? '#1b34ab' 
                      : 'rgba(255, 255, 255, 0.4)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
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