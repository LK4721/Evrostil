import React from "react";
import "./Uslugi.css";
import Footer from "../Components/footer";

const services = [
    {
        image: "/Uslugi/komoda.webp",
        description: "Прецизно склопување и фина завршна обработка за уреден изглед.",
        title: "Склопување на МДФ крила со лајсни",
    },
    {
        image: "/Uslugi/telehandler-icon.webp",
        description: "Брза и безбедна манипулација на товар на потребна висина.",
        title: "Наем на телескопски вилушкар",
    },
    {
        image: "/Uslugi/forklift-no-background.svg",
        description: "Практична поддршка за магацин, градилиште и достава.",
        title: "Товар и истовар на роба со вилушкар",
    },
    {
        image: "/Uslugi/klap-icon1.webp",
        description: "Точно бушење за шарки и монтажа на мебелски елементи.",
        title: "Бушење на клап шарки",
    },
    {
        image: "/Uslugi/kroenje-kantiranje-no-background.svg",
        description: "Кроење по мерка и кантирање со чиста и долготрајна завршница.",
        title: "Кроење и кантирање",
    },
];

function Uslugi() {
    return (
        <div className="Uslugi">
            <main className="uslugiMain">
                <section className="uslugiIntro">
                    <div className="uslugiTitle pageTitle2">НАШИ УСЛУГИ</div>
                </section>

                <section className="uslugiWrap" aria-label="Услуги">
                    {services.map((service) => (
                        <article className="uslugiCard" key={service.title}>
                            <div className={`uslugiIcon ${service.image ? "hasImage" : ""}`} aria-hidden="true">
                                {service.image ? (
                                    <img src={service.image} alt="" loading="lazy" decoding="async" />
                                ) : (
                                    <i className={service.icon}></i>
                                )}
                            </div>
                            <div className="uslugiCardContent">
                                <div className="uslugiLabel">{service.title}</div>
                                <p className="uslugiDescription">{service.description}</p>
                            </div>
                        </article>
                    ))}
                </section>

                <div className="uslugiAction">
                    <a className="uslugiCta" href="/kontakt">Побарај услуга</a>
                </div>
                
            </main>

            <Footer />
        </div>
    );
}

export default Uslugi;
