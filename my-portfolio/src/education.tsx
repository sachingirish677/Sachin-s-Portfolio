    import { ArcherElement } from 'react-archer';

export default function Education() {
        
    const educationData = [
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
    return (
        <>
        <h1 className="education">Education</h1>
        <div className="education-main">
        {educationData.map((item, index) => (
          <div className="educationcard" key={index}>
            <h2>{item.degree}</h2>
            <p>{item.institution}</p>
            <span>{item.year}</span>
          </div>
        ))}
      </div>
        </>
    );
    }
