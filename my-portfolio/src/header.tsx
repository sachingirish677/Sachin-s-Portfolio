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
                            <h3>Home</h3>
                            <h3>About</h3>
                            <h3>Services</h3>
                            <h3>Contact</h3>
                        </div>

                        <div className="desktop-button">
                        <button className="letstalk">Let's talk</button>
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
                            <h3>Home</h3>
                            <h3>About</h3>
                            <h3>Services</h3>
                            <h3>Contact</h3>
                            <button className="letstalkmob">Let's talk</button>
                        </div>
                    )}
                </div>
            </>
        );
    }