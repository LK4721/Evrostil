import React, { useEffect, useState } from "react";
import "./Home.css";
import Carousel from "../Components/Carousel";
import plan from "../sliki/planApartman.webp";
import mebel from "../sliki/Mebel.webp";
import logoOutline from "../logos/outline logo.webp";
import drawer from "../logos/drawer.webp";
import leftLeg from "../logos/leftLeg.webp";
import rightLeg from "../logos/rightLeg.webp";
import hat from "../logos/Hat.webp";
import text from "../logos/text.webp";
import materijali from "../sliki/materijali.webp";
import Footer from "../Components/footer.js";
import { useNavigate } from "react-router-dom";

const galleryContext = require.context(
  "../evrostilSLIKI",
  false,
  /\.(png|jpe?g|webp)$/i,
);
const galleryImages = galleryContext
  .keys()
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((key) => galleryContext(key));
const heroContext = require.context(
  "../mebelSliki",
  false,
  /\.(png|jpe?g|webp)$/i,
);
const heroImages = heroContext
  .keys()
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((key) => heroContext(key));

function Home() {
  const navigate = useNavigate();
  const [galleryIndex, setGalleryIndex] = useState(0);
  const activeGalleryImage = galleryImages[galleryIndex];

  const showPrevGalleryImage = () => {
    setGalleryIndex(
      (index) => (index - 1 + galleryImages.length) % galleryImages.length,
    );
  };

  const showNextGalleryImage = () => {
    setGalleryIndex((index) => (index + 1) % galleryImages.length);
  };

  useEffect(() => {
    if (galleryImages.length < 2) {
      return undefined;
    }

    const galleryTimer = setInterval(() => {
      setGalleryIndex((index) => (index + 1) % galleryImages.length);
    }, 6000);

    return () => clearInterval(galleryTimer);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") {
      return undefined;
    }

    const firstHeroImage = heroImages[0];
    if (!firstHeroImage) {
      return undefined;
    }

    const links = [firstHeroImage].map((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
      return link;
    });

    return () => links.forEach((link) => link.parentNode?.removeChild(link));
  }, []);

  return (
    <div className="HomeWrapper">
      <div className="Home">
        <div className="hero">
          <div className="image">
            <Carousel images={heroImages} />
          </div>
          <div className="text">
            <img
              className="drawer1 drawer"
              src={drawer}
              alt=""
              loading="eager"
              decoding="async"
            />
            <img
              className="drawer2 drawer"
              src={drawer}
              alt=""
              loading="eager"
              decoding="async"
            />
            <img
              className="drawer3 drawer"
              src={drawer}
              alt=""
              loading="eager"
              decoding="async"
            />
            <img
              className="leftleg leg"
              src={leftLeg}
              alt=""
              loading="eager"
              decoding="async"
            />
            <img
              className="rightleg leg"
              src={rightLeg}
              alt=""
              loading="eager"
              decoding="async"
            />
            <img className="hat" src={hat} alt="" loading="eager" decoding="async" />
            <img
              className="textlogo"
              src={text}
              alt=""
              loading="eager"
              decoding="async"
            />
            <div id="popustnov">
              <p>
                <span id="num">20%</span> ПОПУСТ НА МЕБЕЛ
              </p>
              <span id="sks">со секој купен стан</span>
            </div>
          </div>
          <img
            className="mobileHeroLogo"
            src={logoOutline}
            alt="Евростил-М"
            loading="eager"
            decoding="async"
          />
        </div>

        <div className="main">
          <div className="homeOfferHeader">
            <div className="homeOfferCopy">
              <div className="homeSectionLabel">ШТО НУДИМЕ</div>
              <h1>РЕШЕНИЈА ЗА ВАШИОТ ДОМ</h1>
              <p className="homeIntro">
                Мебел, станови и материјали за уредување на простори што ја
                одразуваат вашата приказна.
              </p>
            </div>
            <div className="homeOfferVisual">
              <img
                src="../Uslugi/resenija.webp"
                alt="Ентериер"
                loading="lazy"
                decoding="async"
              />
            </div>
            </div>
            <div className="linkovi">
              <div className="linkplan" onClick={() => navigate("/stanovi")}>
              <img src={plan} alt="План на стан" loading="lazy" decoding="async" />
              <div className="label">
                <span className="cardTitle">Станови</span>
                <span className="cardDesc">
                  Функционални распореди, современи детали и домови креирани за
                  секојдневие.
                </span>
                <span className="cardCta">Повеќе</span>
              </div>
            </div>
            <div className="linkmebel" onClick={() => navigate("/mebel")}>
              <img src={mebel} alt="Модерен мебел по мерка" loading="lazy" decoding="async" />
              <div className="label">
                <span className="cardTitle">Мебел</span>
                <span className="cardDesc">
                  Дизајн што создава атмосфера, удобност што трае и квалитет што
                  се гледа.
                </span>
                <span className="cardCta">Повеќе</span>
              </div>
            </div>
            <div className="linkmebel" onClick={() => navigate("/galerija")}>
              <img src={materijali} alt="Материјали за мебел" loading="lazy" decoding="async" />
              <div className="label">
                <span className="cardTitle">материјали</span>
                <span className="cardDesc">
                  Внимателно одбрани материјали кои носат стил, издржливост и
                  карактер.
                </span>
                <span className="cardCta">Повеќе</span>
              </div>
            </div>
          </div>
        </div>

        <section className="homeValues">
          <div className="homeValuesIntro">
            <span>ПОВЕЌЕ ОД НАЈДОБРОТО</span>
            <h2>СОЗДАВАМЕ ПРОСТОРИ СО ДУША</h2>
            <p>Функционални и естетски решенија за секојдневие што трае.</p>
          </div>
          <div className="homeValuesGrid">
            <div className="homeValueItem">
              <span className="homeValueIcon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M4 11.5 12 5l8 6.5" />
                  <path d="M6.5 10.5V20h11v-9.5" />
                  <path d="M9.5 20v-6h5v6" />
                </svg>
              </span>
              <h3>СЕ ЗА ВАШИОТ ДОМ</h3>
              <p>Едно место. Бескрајни можности.</p>
            </div>
            <div className="homeValueItem">
              <span className="homeValueIcon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M5 7h14v10H5z" />
                  <path d="M7 17v2" />
                  <path d="M17 17v2" />
                  <path d="M8 7V5h8v2" />
                </svg>
              </span>
              <h3>ДИЗАЈН И КВАЛИТЕТ</h3>
              <p>Внимание на секој детал.</p>
            </div>
            <div className="homeValueItem">
              <span className="homeValueIcon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M7 4h10v16H7z" />
                  <path d="M10 4v16" />
                  <path d="M14 4v16" />
                  <path d="M7 8h10" />
                  <path d="M7 16h10" />
                </svg>
              </span>
              <h3>МАТЕРИЈАЛИ СО ДУША</h3>
              <p>Одбрани за убавина и трајност.</p>
            </div>
            <div className="homeValueItem">
              <span className="homeValueIcon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                  <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
                </svg>
              </span>
              <h3>ЛИЧЕН ПРИСТАП</h3>
              <p>Вашата визија, наш приоритет.</p>
            </div>
          </div>
        </section>

        <section className="bot">
          <img
            className="astraPromoImage"
            src="/Uslugi/astra.webp"
            alt="ASTRA Residence"
            loading="lazy"
            decoding="async"
          />
          <div className="astraPromoOverlay"></div>
          <div className="astraPromoContent">
            <div className="astraEyebrow">НАСКОРО</div>
            <div className="astraPromoTitle">
              <span>ASTRA</span>
              <small>RESIDENCE</small>
            </div>
            <div className="astraOrnament"></div>
            <div className="astraFrom">from</div>
            <div className="astraBrand">ЕВРОСТИЛ-М</div>

            <div className="astraFeatureGrid">
              <div className="astraFeature">
                <svg viewBox="0 0 24 24">
                  <path d="M4 20h16" />
                  <path d="M6 20V9l6-4 6 4v11" />
                  <path d="M9 20v-6h6v6" />
                </svg>
                <span>
                  МОДЕРНА
                  <br />
                  АРХИТЕКТУРА
                </span>
              </div>
              <div className="astraFeature">
                <svg viewBox="0 0 24 24">
                  <path d="M12 21V9" />
                  <path d="M7 13a5 5 0 1 1 10 0" />
                  <path d="M5 21h14" />
                </svg>
                <span>
                  ЗЕЛЕНИ ПЛОШТИ
                  <br />И СПОКОЈНА СРЕДА
                </span>
              </div>
              <div className="astraFeature">
                <svg viewBox="0 0 24 24">
                  <path d="M4 11.5 12 5l8 6.5" />
                  <path d="M6.5 10.5V20h11v-9.5" />
                  <path d="M9 14h6" />
                </svg>
                <span>
                  ФУНКЦИОНАЛНИ
                  <br />
                  РАСПРЕДЕЛБИ
                </span>
              </div>
              <div className="astraFeature">
                <svg viewBox="0 0 24 24">
                  <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" />
                  <path d="M9.5 12.5 11 14l3.5-4" />
                </svg>
                <span>
                  СИГУРНОСТ
                  <br />И КВАЛИТЕТ
                </span>
              </div>
            </div>

            <button
              className="astraPromoButton"
              onClick={() => navigate("/stanovi")}
            >
              ДОЗНАЈ ПОВЕЌЕ <span>→</span>
            </button>
          </div>
        </section>

        <section className="homeGallery">
          <div className="homeGalleryHeader homeGalleryHeaderOutside">
            <span>ЕВРОСТИЛ-М</span>
            <h2>ГАЛЕРИЈА</h2>
            <p>Избрани моменти од нашата работа, простори и детали.</p>
          </div>

          <div className="homeGalleryCarousel">
            <div className="homeGalleryHeader homeGalleryHeaderInside">
              <span>ЕВРОСТИЛ-М</span>
              <h2>ГАЛЕРИЈА</h2>
            </div>
            <button
              className="homeGalleryArrow homeGalleryArrowLeft"
              onClick={showPrevGalleryImage}
              type="button"
              aria-label="Previous gallery image"
            >
              ‹
            </button>
            {activeGalleryImage && (
              <img
                src={activeGalleryImage}
                alt="Евростил галерија"
                loading="lazy"
                decoding="async"
              />
            )}
            <button
              className="homeGalleryArrow homeGalleryArrowRight"
              onClick={showNextGalleryImage}
              type="button"
              aria-label="Next gallery image"
            >
              ›
            </button>
          </div>

          <div className="homeGalleryThumbs">
            {galleryImages.map((image, index) => (
              <button
                key={image}
                className={index === galleryIndex ? "active" : ""}
                onClick={() => setGalleryIndex(index)}
                type="button"
                aria-label={`Open gallery image ${index + 1}`}
              >
                <img src={image} alt="" loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
