import React from "react";
import Map from "../Components/Map";
import "./Kontakt.css"
import Footer from "../Components/minimalFooter";
import logo from "../logos/logo-main.webp";

function Kontakt() {
    return (
        <>
        <div className="KontaktWrapper">
            <div className="Kontakt">
                <p className="contactus">Контактирајте нè!</p>
                <div className="Kontakt_l">

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

                    <div className="kontaktLogo">
                        <div className="socials kontaktSocials">
                            <img src={logo} alt="Евростил-М" loading="lazy" decoding="async" />
                            <a href="https://facebook.com/evrostilm" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="https://www.instagram.com/evrostil.m/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>
                    </div>
                
                </div>
                <div className="Kontakt_r">
                    <div className="rightKontakt rmk">
                        <div className="contact-item address rmkr">
                            <i className="fas fa-map-marker-alt"></i>
                            <div>Населба Софилар, Струмица, Македонија</div>
                        </div>

                        <div className="contact-item rmkr">
                            <i className="fas fa-envelope"></i>
                                <a href="mailto:evrostilm@yahoo.com">evrostilm@yahoo.com</a>
                        </div>

                        <div className="contact-item rmkr">
                            <i className="fas fa-clock"></i>
                            <div>Понеделник - Петок:<br/> 9:00 - 17:00</div>
                        </div>
                    </div>
                </div>
                <div className="kontaktMap">
                    <Map />
                </div>
            </div>
        </div>
            <Footer />

        </>
)
}

export default Kontakt
