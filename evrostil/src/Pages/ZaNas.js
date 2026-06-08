import React from "react";
import "./ZaNas.css";
import Footer from "../Components/footer.js";

const features = [
    {
        icon: "/Icons/20+.webp",
        title: "20+ ГОДИНИ ИСКУСТВО",
        text: "Две децении посветена работа, раст и доверба од нашите клиенти.",
    },
    {
        icon: "/Icons/zgrada.webp",
        title: "КВАЛИТЕТНА ГРАДБА",
        text: "Современи материјали, проверени технологии и прецизна изведба.",
    },
    {
        icon: "/Icons/mebel.webp",
        title: "МЕБЕЛ ПО МЕРКА",
        text: "Функционален дизајн и прецизна изработка за секој простор.",
    },
];

export default function ZaNas() {
    return (
        <>
            <main className="ZaNasWrapper">
                <section className="ZaNasSloganBanner">
                    <div className="ZaNasHeroInner">
                        <div className="ZaNasHeroDivider">
                            <span></span>
                        </div>

                        <h1>ЕВРОСТИЛ-М</h1>

                        <div className="ZaNasHeroDivider">
                            <span></span>
                        </div>

                        <h2>
                            НИЕ ГО ГРАДИМЕ И ОПРЕМУВАМЕ
                            <br />
                            ВАШИОТ ТОПОЛ ДОМ
                        </h2>
                    </div>
                </section>

                <section className="ZaNasHero">
                    <div className="ZaNasText">
                        <div className="ZaNasSectionTitle">ЗА НАС</div>

                        <p>
                            Евростил-М постои од 2003 година. Се занимава со
                            производство на мебел и изградба на станбени објекти.
                        </p>

                        <p>
                            Постојано ги следиме иновациите и потребите на пазарот,
                            со цел да одговориме и да ги примениме истите.
                        </p>

                        <p>
                            Инвестираме во модерна механизација и квалитетен
                            репроматеријал, со цел постигнување на квалитетен
                            производ.
                        </p>

                        <p>
                            Во мебелната индустрија произведуваме со софистицирани
                            машини за кроење, кантирање и склопување на иверка и
                            медијапан. Нудиме широк избор на мебелни аксесуари како:
                            окови, умивалници, рачки, механизми, чешми и друго.
                        </p>

                        <h3>СЕ НА ЕДНО МЕСТО КАЈ НАС!</h3>
                    </div>

                    <div className="ZaNasImage">
                        <img
                            src="/Uslugi/20god.webp"
                            alt="Тимот на Евростил-М"
                            loading="eager"
                            decoding="async"
                        />
                    </div>
                </section>

                <section className="ZaNasFeatureGrid">
                    {features.map((feature, index) => (
                        <article className="ZaNasFeatureCard" key={index}>
                            <div className="ZaNasFeatureIcon">
                                <img
                                    src={feature.icon}
                                    alt=""
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>

                            <div className="ZaNasFeatureContent">
                                <h4>{feature.title}</h4>
                                <p>{feature.text}</p>
                            </div>
                        </article>
                    ))}
                </section>

                <section className="ZaNasVisionSection">
                    <div className="ZaNasVisionPanel">
                        <div className="ZaNasVisionImage">
                            <div className="ZaNasVisionGlow"></div>
                        </div>

                        <div className="ZaNasVisionContent">
                            <div className="ZaNasSectionTitle center">ВИЗИЈА И ЦЕЛ</div>

                            <span className="ZaNasQuote left">“</span>

                            <h3>
                                Нашата визија е да создадеме насмевка на вашето лице.
                            </h3>

                            <p>
                                Одлуката за купување на сопствен дом е тешка,
                                долгорочна и голема финансиска инвестиција.
                            </p>

                            <h3>
                                Затоа нашата крајна цел е создавање на квалитетни
                                станови со висока изолација и квалитетен производ.
                            </h3>

                            <p>
                                Опремување на истите станови со квалитетен и современ
                                мебел, произведен од нас.
                            </p>

                            <span className="ZaNasQuote right">”</span>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
