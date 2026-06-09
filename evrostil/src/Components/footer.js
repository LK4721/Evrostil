import React from 'react';
import logo from '../logos/logo-main.webp'
import './footer.css'

function Footer() {
    return (
        <div className="footer siteFooter">
            <div className="footer-bg" aria-hidden="true" />
            <div className="footer-overlay" aria-hidden="true" />
            <div className="top">
                <div className="top-left">
                    <img className="logofoot" src={logo} alt="Евростил-М" loading="lazy" decoding="async"/>
                    <p>Квалитетни станови и мебел со стил. Водечка компанија во Струмица со повеќе од 20 години искуство во изградба и производство на мебел по нарачка.</p>
                    <div className="socials">
                        <a href="https://facebook.com/evrostilm" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://www.instagram.com/evrostil.m/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>
                <div className="top-right">
                    <div className="links">
                        <h5>Линкови</h5>
                        <ul>
                            <li><a href="/">Дома</a></li>
                            <li><a href="/stanovi">Станови</a></li>
                            <li><a href="/mebel">Мебел</a></li>
                            <li><a href="/materijali">Материјали</a></li>
                            <li><a href="/uslugi">Услуги</a></li>
                            <li><a href="/za-nas">За Нас</a></li>
                        </ul>
                    </div>
                    <div className="kontakt">
                        <div className="leftKontakt">

                        <h5>Контакт</h5>

                            <div className="contact-subsection">
                                <h4>Контакт за Станови</h4>
                                <div className="contact-item">
                                    <i className="fas fa-phone"></i>
                                    <a href="tel:+38975490655">+389 75 490 655</a>
                                </div>
                                <div className="contact-item">
                                    <i className="fas fa-phone"></i>
                                    <a href="tel:+38975490650">+389 75 490 650</a>
                                </div>
                            </div>

                            <div className="contact-subsection">
                                <h4>Контакт за Мебел</h4>
                                <div className="contact-item">
                                    <i className="fas fa-phone"></i>
                                    <a href="tel:+38978333841">+389 78 333 841</a>
                                </div>
                                <div className="contact-item">
                                    <i className="fas fa-phone"></i>
                                    <a href="tel:+38975490650">+389 75 490 650</a>
                                </div>
                            </div>
                        </div>

                        <div className="rightKontakt">
                            <div className="contact-item">
                                <i className="fas fa-map-marker-alt"></i>
                                <span>Населба Софилар, Струмица, Македонија</span>
                            </div>

                            <div className="contact-item">
                                <i className="fas fa-envelope"></i>
                                <a href="mailto:evrostilm@yahoo.com">evrostilm@yahoo.com</a>
                            </div>

                            <div className="contact-item">
                                <i className="fas fa-clock"></i>
                                <span>Понеделник - Петок:<br/> 9:00 - 17:00</span>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                <p>© 2026 ЕВРОСТИЛ-М • СИТЕ ПРАВА ЗАДРЖАНИ</p>
            </div>
        </div>
    )
}

export default Footer;
