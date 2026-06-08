import React, { useState, useEffect, useLayoutEffect, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { resetScrollPosition } from "../utils/scrollToTop";
import "./Navbar.css";

let navbarIntroPlayed = false;

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [playIntroAnimation, setPlayIntroAnimation] = useState(
    () => location.pathname === "/" && !navbarIntroPlayed,
  );

  const scrollToTop = useCallback((smooth = false) => {
    resetScrollPosition(smooth);
  }, []);

  const handleNavClick = useCallback(
    (targetPath) => {
      setMobileMenuOpen(false);

      if (location.pathname === "/" && targetPath === "/") {
        scrollToTop(true);
      }
    },
    [location.pathname, scrollToTop],
  );

  useLayoutEffect(() => {
    setMobileMenuOpen(false);

    const heroSection = document.querySelector(".hero");
    if (!heroSection || location.pathname !== "/") {
      setScrolled(true);
      return;
    }

    setScrolled(window.scrollY > heroSection.offsetHeight - 120);
  }, [location.pathname]);

  useEffect(() => {
    const heroSection = document.querySelector(".hero");
    const homeScroller = document.querySelector(".Home");

    if (!heroSection) {
      setScrolled(true);
      return;
    }

    const updateScrolled = () => {
      const scrollTop = homeScroller ? homeScroller.scrollTop : window.scrollY;
      setScrolled(scrollTop > heroSection.offsetHeight - 120);
    };

    updateScrolled();

    const scrollTarget = homeScroller || window;
    scrollTarget.addEventListener("scroll", updateScrolled, { passive: true });
    window.addEventListener("resize", updateScrolled);

    return () => {
      scrollTarget.removeEventListener("scroll", updateScrolled);
      window.removeEventListener("resize", updateScrolled);
    };
  }, [location.pathname]);

  const handleIntroAnimationEnd = (event) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    navbarIntroPlayed = true;
    setPlayIntroAnimation(false);
  };

  const isHomeHero = location.pathname === "/" && !scrolled;

  const navbarClasses = `navbar ${playIntroAnimation ? "animate-on-load" : ""} ${
    scrolled ? "scrolled" : ""
  } ${isHomeHero ? "home-hero" : ""} ${mobileMenuOpen ? "mobile-open" : ""}`;

  const linkClass = ({ isActive }) => (isActive ? "navlink active" : "navlink");

  return (
    <div className="stick">
      <nav
        className={navbarClasses}
        onAnimationEnd={handleIntroAnimationEnd}
        onDragStart={(event) => event.preventDefault()}
      >
        <div className="navbar-container">
          <button
            className="mobileMenuButton"
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className="navbar-items">
            <ul>
              <li>
                <NavLink to="/" className={linkClass} onClick={() => handleNavClick("/")}>
                  ДОМА
                </NavLink>
              </li>
              <li>
                <NavLink to="/stanovi" className={linkClass} onClick={() => handleNavClick("/stanovi")}>
                  СТАНОВИ
                </NavLink>
              </li>
              <li>
                <NavLink to="/mebel" className={linkClass} onClick={() => handleNavClick("/mebel")}>
                  МЕБЕЛ
                </NavLink>
              </li>
              <li>
                <NavLink to="/galerija" className={linkClass} onClick={() => handleNavClick("/galerija")}>
                  МАТЕРИЈАЛИ
                </NavLink>
              </li>
              <li>
                <NavLink to="/uslugi" className={linkClass} onClick={() => handleNavClick("/uslugi")}>
                  УСЛУГИ
                </NavLink>
              </li>
              <li>
                <NavLink to="/za-nas" className={linkClass} onClick={() => handleNavClick("/za-nas")}>
                  ЗА НАС
                </NavLink>
              </li>
              <li>
                <NavLink to="/kontakt" className={linkClass} onClick={() => handleNavClick("/kontakt")}>
                  КОНТАКТ
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
