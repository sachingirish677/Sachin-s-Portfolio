import pythonIcon from './assets/python.png';
import flutterIcon from './assets/flutter.png';
import reactIcon from './assets/react.png';
import jsIcon from './assets/js.png';
import shopifyIcon from './assets/shopify.png';


export default function Skills() {
    const skills = [
        { name: "React", icon: reactIcon },
        { name: "NodeJS", icon: jsIcon },
        { name: "Shopify", icon: shopifyIcon },
        { name: "Flutter", icon: flutterIcon },
        { name: "Python", icon: pythonIcon },
      ];
    return (
        <>
               <div className="skills-section">
            <h1 className="skills">Skills</h1>

            <div className="skills-grid">
        {skills.map((skill, index) => (
          <div className="skill-card" key={index}>
            <img src={skill.icon} alt={skill.name} className="skill-icon" />
            <p className="skill-name">{skill.name}</p>
          </div>
        ))}
                </div>
                </div>
        </>
    )
}