import React, { useEffect, useRef, useState } from "react";
import "./Stanovi.css";
import Footer from "../Components/footer";
import kompleks1 from "../sliki/zgrada123.webp";
import kompleks2 from "../sliki/zgrada45.webp";
import astra from "../sliki/astra.webp";
import coverPhoto from "../logos/coverphot.webp";

import AstraFlipBook from "../Components/FlipBookCarousel.js";

function Stanovi() {
  const astraSlides = [
    { src: astra, alt: "ASTRA RESIDENCE cover" },
    { src: coverPhoto, alt: "ASTRA RESIDENCE" },
    ...Array.from({ length: 14 }, (_, index) => ({
      src: `/bosura/slika${index + 1}.webp`,
      alt: `Astra page ${index + 1}`,
    })),
  ];

  const [astraSlideIndex, setAstraSlideIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  const astraBookRef = useRef(null);
  const videoRef = useRef(null);

  const showPrevAstraSlide = () => {
    setAstraSlideIndex((current) =>
      current === 0 ? astraSlides.length - 1 : current - 1
    );
  };

  const showNextAstraSlide = () => {
    setAstraSlideIndex((current) =>
      current === astraSlides.length - 1 ? 0 : current + 1
    );
  };

  const playAstraVideo = () => {
    setShouldLoadVideo(true);
  };

  useEffect(() => {
    if (!shouldLoadVideo || !videoRef.current) return;

    videoRef.current.play();
    setIsVideoPlaying(true);
  }, [shouldLoadVideo]);

  return (
    <div className="StanoviWrapper">
      <div className="Stanovi">
        <div className="mainStanP">
          <div className="Astra">
            <section className="astraHero">
              <div className="astraHeroTop">
                <div className="astraHeroCopy">
                  <span>INTRODUCING</span>

                  <h1>
                    ASTRA
                    <br />
                    {" "}
                    RESIDENCE
                  </h1>

                  <p>
                    Современ станбен комплекс, создаден за семејства кои
                    вреднуваат квалитет, удобност и долгорочна вредност.
                  </p>

                  <div className="astraHeroCards">
                    <div className="astraHeroDiscount">
                      <div className="astraHeroIcon astraHeroIconDiscount">
                        <img src="/Icons/popust.webp" alt="Попуст икона" />
                      </div>

                      <div>
                        <strong>20% попуст на мебел</strong>
                        <p>за сите купувачи на станови</p>
                      </div>
                    </div>

                    <a href="#catalog" className="astraHeroCard">
                      <span>
                        <img src="/Icons/katalog.webp" alt="Каталог икона" />
                      </span>
                      Каталог
                    </a>

                    <button
                      type="button"
                      className="astraHeroCard"
                      onClick={playAstraVideo}
                    >
                      <span>
                        <img src="/Icons/play.webp" alt="Видео икона" />
                      </span>
                      Видео
                    </button>
                  </div>
                </div>

                <div className="astraHeroImage">
                  <video
                    ref={videoRef}
                    src={shouldLoadVideo ? "/Uslugi/astra-residence.mp4" : undefined}
                    controls
                    playsInline
                    preload="none"
                    poster="/Icons/astraVideo.webp"
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
                    onEnded={() => setIsVideoPlaying(false)}
                  />

                  {!isVideoPlaying && (
                    <button
                      type="button"
                      className="astraHeroPlay"
                      onClick={playAstraVideo}
                      aria-label="Погледни видео"
                    >
                      <span>▶</span>
                    </button>
                  )}
                </div>
              </div>
            </section>

            <div className="catalogHeading" id="catalog">
              <h2>Погледни каталог</h2>

              <div className="catalogHeadingDivider" aria-hidden="true">
                <span></span>
                <b>
                  <svg viewBox="0 0 24 24">
                    <path d="m7 8 5 5 5-5" />
                    <path d="m7 13 5 5 5-5" />
                  </svg>
                </b>
                <span></span>
              </div>
            </div>

            <div className="flipbook-container">
              <div className="astraFlipbookOnly">
                <button
                  className="astraBookArrow astraBookArrowPrev"
                  type="button"
                  onClick={() => astraBookRef.current?.prev()}
                  aria-label="Previous brochure page"
                >
                  ‹
                </button>

                <AstraFlipBook
                  ref={astraBookRef}
                  coverImg={astra}
                  pages={astraSlides.map((slide) => ({
                    type: "img",
                    ...slide,
                  }))}
                />

                <button
                  className="astraBookArrow astraBookArrowNext"
                  type="button"
                  onClick={() => astraBookRef.current?.next()}
                  aria-label="Next brochure page"
                >
                  ›
                </button>
              </div>

              <div className="astraMobileCarousel">
                <button
                  className="astraCarouselArrow prev"
                  type="button"
                  onClick={showPrevAstraSlide}
                  aria-label="Previous photo"
                >
                  ‹
                </button>

                <img
                  src={astraSlides[astraSlideIndex].src}
                  alt={astraSlides[astraSlideIndex].alt}
                  loading="lazy"
                  decoding="async"
                />

                <button
                  className="astraCarouselArrow next"
                  type="button"
                  onClick={showNextAstraSlide}
                  aria-label="Next photo"
                >
                  ›
                </button>

                <div className="astraCarouselCount">
                  {astraSlideIndex + 1} / {astraSlides.length}
                </div>
              </div>
            </div>

            <section className="catalogDiscountBanner">
              <span>Ексклузивна понуда</span>
              <h2>20% попуст на мебел</h2>
              <p>
                Со секој купен стан добивате специјална понуда за мебел
                изработен од нас.
              </p>
            </section>
          </div>

          <div className="DonePro" id="gotovi-proekti">
            <div className="projectsHeader">
              <span className="projectsEyebrow">
                Нашето искуство, вашата доверба
              </span>

              <div className="sectiontitle">Готови Проекти</div>

              <p>Досегашни станбени објекти реализирани од Евростил-М.</p>
            </div>

            <div className="projectWrap">
              <div className="project">
                <div className="projectImageBlock">
                  <img
                    src={kompleks1}
                    alt="Комплекс 1"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="projectTextBlock">

                  <div className="label">Комплекс 1</div>

                  <p className="projectDescription">
                    Првиот станбен комплекс на Евростил-М во населба Карпош,
                    Струмица, е составен од три станбени згради со практични
                    распореди, добра изолација и квалитетна изведба.
                  </p>

                  <div className="Sold">Продадено</div>
                </div>
              </div>

              <div className="project">
                <div className="projectImageBlock">
                  <img
                    src={kompleks2}
                    alt="Комплекс Делукс"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="projectTextBlock">

                  <div className="label">Комплекс Делукс</div>

                  <p className="projectDescription">
                    Современ станбено-деловен комплекс со функционални станови,
                    деловни простории, обезбеден паркинг и внимателно планирани
                    решенија за секојдневна удобност.
                  </p>

                  <div className="Sold">Продадено</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Stanovi;
