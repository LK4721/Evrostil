import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logodark from "../logos/logodark.png";
import logolight from "../logos/logolight.png";
import "./Navbar.css";

function Navbar() {
    const [darkMode, setDarkMode] = useState(true);
    const [scrolled, setScrolled] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle("dark-mode");
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setScrolled(!entry.isIntersecting),
            { threshold: 0.5 }
        );

        const heroSection = document.querySelector(".hero");
        if (heroSection) observer.observe(heroSection);

        return () => {
            if (heroSection) observer.unobserve(heroSection);
        };
    }, []);

    const navbarClasses = `navbar ${darkMode ? "dark-mode" : ""} ${
        scrolled ? "scrolled" : ""
    }`;

    const linkClass = ({ isActive }) =>
        isActive ? "navlink active" : "navlink";

    return (
        <div className="stick">
            <nav className={navbarClasses}>
                <div className="navbar-container">
                    <div className="logo">
                        {/* Example logo click -> home */}
                        {/* <NavLink to="/"><img src={darkMode ? logodark : logolight} alt="Logo" /></NavLink> */}
                    </div>

                    <div className="navbar-items">
                        <ul>
                            <li>
                                <NavLink to="/" className={linkClass}>
                                    ДОМА
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/stanovi" className={linkClass}>
                                    СТАНОВИ
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/mebel" className={linkClass}>
                                    МЕБЕЛ
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/uslugi" className={linkClass}>
                                    УСЛУГИ
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/galerija" className={linkClass}>
                                    ГАЛЕРИЈА
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/za-nas" className={linkClass}>
                                    ЗА НАС
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/kontakt" className={linkClass}>
                                    КОНТАКТ
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* your language + dark mode buttons can stay here */}
            </nav>
        </div>
    );
}

export default Navbar;
