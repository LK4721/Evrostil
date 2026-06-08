import React from 'react';
import logo from '../logos/logo-main.webp';
import './minimalFooter.css';

function minimalFooter() {
    return (
        <div className="footer">
            <div className="footer-bg" aria-hidden="true" />
            <div className="footer-overlay" aria-hidden="true" />
            <div className="top">

                {/* LEFT */}
                <div className="top-leftminimal">
                    <img className="logofoot" src={logo} alt="Евростил-М" />

                    <p>
                        Квалитетни станови и мебел со стил. Водечка компанија во
                        Струмица со повеќе од 20 години искуство во изградба и
                        производство на мебел по нарачка.
                    </p>

                    <div className="socials">
                        <a href="https://facebook.com/evrostilm" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://www.instagram.com/evrostil.m/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="top-right">

                    {/* LINKS */}
                    <div className="links">
                        <h5>Линкови</h5>
                        <ul>
                            <li><a href="/">Дома</a></li>
                            <li><a href="/stanovi">Станови</a></li>
                            <li><a href="/mebel">Мебел</a></li>
                            <li><a href="/uslugi">Услуги</a></li>
                            <li><a href="/galerija">Галерија</a></li>
                            <li><a href="/za-nas">За Нас</a></li>
                        </ul>
                    </div>

                    {/* VERTICAL DIVIDER */}
                    <div className="footer-divider"></div>

                    {/* CTA */}
                    <div className="cta">
                        <span className="cta-label">Подготвени сте?</span>
                        <h2>Направете го вашиот дом совршен.</h2>
                        <p>Контактирајте не денес и добијте бесплатна консултација за вашиот проект.</p>
                        <a href="/kontakt" className="cta-btn">Контактирај не →</a>
                    </div>

                </div>
            </div>

            {/* BOTTOM */}
            <div className="footer-bottom">
                <p>© 2026 ЕВРОСТИЛ-М • СИТЕ ПРАВА ЗАДРЖАНИ</p>
            </div>
        </div>
    );
}

export default minimalFooter;
