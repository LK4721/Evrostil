import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Mebel.css";
import Footer from "../Components/footer.js";

const CATEGORIES = [
  {
    title: "Кујни",
    photos: [
      "/Kujni/render3.webp",
      "/Kujni/render2.webp",
      "/Kujni/render1.webp",
      "/Kujni/render4.webp",
      "/Kujni/render5.webp",
      "/Kujni/render6.webp",
      "/Kujni/render7.webp",
      "/Kujni/render8.webp",
    ],
  },
  {
    title: "Спални соби",
    photos: [
      "/Spalni sobi/slika1render.webp",
      "/Spalni sobi/slika2render.webp",
      "/Spalni sobi/slika3render.webp",
      "/Spalni sobi/slika4render.webp",
    ],
  },
  {
    title: "Детски соби",
    photos: [
      "/Detski Sobi/detski1render.webp",
      "/Detski Sobi/detski4render.webp",
      "/Detski Sobi/detski2render.webp",
      "/Detski Sobi/detski3render.webp",
    ],
  },
  {
    title: "Плакари",
    photos: [
      "/Plakari/plakar4render.webp",
      "/Plakari/plakar5render.webp",
      "/Plakari/plakar2 render.webp",
      "/Plakari/plaka1render.webp",
      "/Plakari/plakar3render.webp",
    ],
  },
  {
    title: "Комоди",
    photos: [
      "/Komodi/komoda2render.webp",
      "/Komodi/komoda3render.webp",
      "/Komodi/komoda4render.webp",
      "/Komodi/komoda5render.webp",
      "/Komodi/komoda1render.webp",
    ],
  },
  {
    title: "Останато",
    photos: [
      "/Ostanato/slika1render.webp",
      "/Ostanato/slika2render.webp",
      "/Ostanato/slika3render.webp",
      "/Ostanato/slika4render.webp",
      "/Ostanato/slika5render.webp",
      "/Ostanato/slika6render.webp",
    ],
  },
];

const HERO_IMAGE = "/Uslugi/mebelHeroPage.webp";

const preloadImageLinks = (urls) => {
  if (typeof document === "undefined") {
    return () => {};
  }

  const links = urls.filter(Boolean).map((href) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = href;
    document.head.appendChild(link);
    return link;
  });

  return () => links.forEach((link) => link.parentNode?.removeChild(link));
};

const getVisiblePhotoCount = () => {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth <= 560) return 1;
  if (window.innerWidth <= 950) return 2;
  return 3;
};

export default function Mebel() {
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(0);
  const [fullscreenIndex, setFullscreenIndex] = useState(null);
  const [carouselStart, setCarouselStart] = useState(0);
  const [visiblePhotoCount, setVisiblePhotoCount] = useState(getVisiblePhotoCount);

  const activeCategory = useMemo(() => CATEGORIES[activeIndex], [activeIndex]);
  const activePhotos = activeCategory.photos;

  const visiblePhotos = useMemo(() => {
    if (!activePhotos.length) return [];

    return Array.from(
      { length: Math.min(visiblePhotoCount, activePhotos.length) },
      (_, offset) => {
        const index = (carouselStart + offset) % activePhotos.length;

        return {
          src: activePhotos[index],
          index,
        };
      },
    );
  }, [activePhotos, carouselStart, visiblePhotoCount]);

  useEffect(() => {
    const cleanup = preloadImageLinks([
      HERO_IMAGE,
      ...activePhotos.slice(0, visiblePhotoCount),
    ]);
    return cleanup;
  }, [activePhotos, visiblePhotoCount]);

  useEffect(() => {
    const handleResize = () => {
      setVisiblePhotoCount(getVisiblePhotoCount());
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fullscreenImage =
    fullscreenIndex === null ? null : activePhotos[fullscreenIndex];

  const selectCategory = (index) => {
    setActiveIndex(index);
    setFullscreenIndex(null);
    setCarouselStart(0);
  };

  const openFullscreen = (index) => {
    setFullscreenIndex(index);
  };

  const closeFullscreen = () => {
    setFullscreenIndex(null);
  };

  const showPrevCarousel = () => {
    if (activePhotos.length <= visiblePhotoCount) {
      setCarouselStart(0);
      return;
    }

    setCarouselStart((current) =>
      current === 0 ? activePhotos.length - 1 : current - 1,
    );
  };

  const showNextCarousel = () => {
    if (activePhotos.length <= visiblePhotoCount) {
      setCarouselStart(0);
      return;
    }

    setCarouselStart((current) => (current + 1) % activePhotos.length);
  };

  const showPrevFullscreen = (event) => {
    event?.stopPropagation();

    setFullscreenIndex((current) =>
      current === 0 ? activePhotos.length - 1 : current - 1,
    );
  };

  const showNextFullscreen = (event) => {
    event?.stopPropagation();

    setFullscreenIndex((current) =>
      current === activePhotos.length - 1 ? 0 : current + 1,
    );
  };

  useEffect(() => {
    if (fullscreenIndex === null) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setFullscreenIndex(null);
      }

      if (event.key === "ArrowLeft") {
        setFullscreenIndex((current) =>
          current === 0 ? activePhotos.length - 1 : current - 1,
        );
      }

      if (event.key === "ArrowRight") {
        setFullscreenIndex((current) =>
          current === activePhotos.length - 1 ? 0 : current + 1,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [fullscreenIndex, activePhotos.length]);

  return (
    <>
      <div className="MebelWrapper">
        <section className="MebelHero">
          <div
            className="MebelHeroImageWrap"
            style={{
              backgroundImage: "url('/Uslugi/mebelHeroPage.webp')",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div className="MebelHeroOverlay" />

          <div className="MebelHeroText">
            <span className="MebelHeroEyebrow">ЕВРОСТИЛ-М</span>
            <h1 className="MebelHeroTitle">МЕБЕЛ</h1>
            <p>Квалитетен мебел за секој дом.</p>
          </div>
        </section>

        <div className="MebelCategoryBar">
          {CATEGORIES.map((cat, index) => (
            <button
              key={cat.title}
              className={`MebelCategoryBtn${
                index === activeIndex ? " active" : ""
              }`}
              type="button"
              onClick={() => selectCategory(index)}
            >
              {cat.title}
            </button>
          ))}
        </div>

        <section className="MebelContent">
          <div className="MebelCarouselShell">
            <button
              className="MebelSideArrow left"
              type="button"
              onClick={showPrevCarousel}
              aria-label="Previous"
            >
              ‹
            </button>

            <div className="MebelCarouselGrid">
              {visiblePhotos.map(({ src, index }) => (
                <button
                  className="MebelProjectCard"
                  key={`${src}-${index}`}
                  type="button"
                  onClick={() => openFullscreen(index)}
                >
                  <img
                    src={src}
                    alt={`${activeCategory.title} ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ))}
            </div>

            <button
              className="MebelSideArrow right"
              type="button"
              onClick={showNextCarousel}
              aria-label="Next"
            >
              ›
            </button>
          </div>

          <div className="MebelConsultBox">
            <span>Бесплатна консултација</span>
            <h3>Имате идеја за мебел?</h3>
            <p>
              Испратете димензии или скица од просторот и ќе ви предложиме
              решение.
            </p>
            <button type="button" onClick={() => navigate("/kontakt")}>
              Закажете консултација
            </button>
          </div>
        </section>

        {fullscreenImage && (
          <div className="MebelLightbox" onClick={closeFullscreen}>
            <button
              className="MebelLightboxClose"
              type="button"
              aria-label="Close"
            >
              ×
            </button>

            <button
              className="MebelLightboxArrow prev"
              type="button"
              onClick={showPrevFullscreen}
              aria-label="Previous"
            >
              ‹
            </button>

            <img
              src={fullscreenImage}
              alt="Мебел преглед"
              onClick={(event) => event.stopPropagation()}
            />

            <button
              className="MebelLightboxArrow next"
              type="button"
              onClick={showNextFullscreen}
              aria-label="Next"
            >
              ›
            </button>

            <div className="MebelLightboxCounter">
              {fullscreenIndex + 1} / {activePhotos.length}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
