
export default function About() {
    const myPhoto="https://i.pinimg.com/736x/6e/1f/18/6e1f18cb8ba4d4a0f5481c4aa12ecc42.jpg"
    return (
        <>
            <div className="about-main">
                <h1 className="about">About Me </h1>
                <div className="about-section">
                    <p className="description">Hi! I'm <strong>Sachin Girish</strong>, a passionate frontend developer with a love for clean and modern design.
                        I specialize in creating responsive, user-friendly websites using technologies like
                        <strong>React, JavaScript, and CSS</strong></p>
                    <div className="circle-container">
                        <div className="blue-circle">
                            <img className="profile" src={myPhoto} alt="not loading" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}   