import { useState } from 'react';
import Hamburger from 'hamburger-react';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className="navspace">
                <nav className="navbar">
                    <div className="logodiv">
                        <h2 className="logo">SG</h2>
                    </div>

                    <div className="menus desktop-menu">
                        <a href="#about"><h3>About</h3></a>
                        <a href="#skills"><h3>Skills</h3></a>
                        <a href="#education"><h3>Education</h3></a>
                        <a href="#experience"><h3>Experience</h3></a>
                        <a href="#projects"><h3>Projects</h3></a>
                    </div>

                    <div className="desktop-button">
                        <button className="letstalk" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Let's talk</button>
                    </div>


                </nav>
                <div className="hamburger">
                    <Hamburger
                        size={24}
                        toggled={open}
                        toggle={setOpen}
                    />
                </div>

                {open && (
                    <div className="mobile-menu">

                        <a href="#about" onClick={() => setOpen(false)}><h3>About</h3></a>
                        <a href="#skills" onClick={() => setOpen(false)}><h3>Skills</h3></a>
                        <a href="#education" onClick={() => setOpen(false)}><h3>Education</h3></a>
                        <a href="#experience" onClick={() => setOpen(false)}><h3>Experience</h3></a>
                        <a href="#projects" onClick={() => setOpen(false)}><h3>Projects</h3></a>
                        <button className="letstalkmob" onClick={() => {
                            setOpen(false);
                            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}>Let's talk</button>
                    </div>
                )}
            </div>
        </>
    );
}