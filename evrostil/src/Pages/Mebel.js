import React, { useMemo, useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import "./Mebel.css";

const cx = (...c) => c.filter(Boolean).join(" ");

// ✅ Photos from /public (NO imports)
const CATEGORIES = [
    {
      title: "КУЈНИ",
      photos: [
        "/Kujni/render1.png",
        "/Kujni/render2.png",
        "/Kujni/render3.png",
        "/Kujni/render4.png",
        "/Kujni/render5.png",
        "/Kujni/render6.png",
        "/Kujni/render7.png",
        "/Kujni/render8.png",
        "/Kujni/render9.png",
      ],
    },
    {
        title: "СПАЛНИ СОБИ",
        photos: [
            "/Spalni sobi/slika1render.png",
            "/Spalni sobi/slika2render.png",
            "/Spalni sobi/slika3render.png",
            "/Spalni sobi/slika4render.png",
        ],
    },
    {
        title: "ДЕТСКИ СОБИ",
        photos: [
            "/Detski Sobi/detski1render.png",
            "/Detski Sobi/detski4render.png",
            "/Detski Sobi/detski2render.png",
            "/Detski Sobi/detski3render.png",

        ],
    },
    {
        title: "ПЛАКАРИ",
        photos: [
            "/Plakari/plakar4render.png",
            "/Plakari/plakar5render.png",
            "/Plakari/plakar2 render.png",
            "/Plakari/plaka1render.png",
            "/Plakari/plakar3render.png",
        ],
    },
    {
        title: "КОМОДИ",
        photos: [
            "/Komodi/komoda2render.png",
            "/Komodi/komoda3render.png",
            "/Komodi/komoda4render.png",
            "/Komodi/komoda5render.png",
            "/Komodi/komoda1render.png",
        ],
    },
    {
        title: "ОСТАНАТО",
        photos: [
            "/Ostanato/slika1render.png",
            "/Ostanato/slika2render.png",
            "/Ostanato/slika3render.png",
            "/Ostanato/slika4render.png",
            "/Ostanato/slika5render.png",
            "/Ostanato/slika6render.png",
            "/Ostanato/slika7render.png",
        ],
    },
];


export default function Mebel() {
    const [activeIndex, setActiveIndex] = useState(null);
    const [align, setAlign] = useState("start"); // start | center | end
    const [isFullscreen, SetFullscreen] = useState(false);

    const toggleFullscreen = () => {
        SetFullscreen((prev) => !prev);
    };

    const isOpen = activeIndex !== null;

    const activeCategory = useMemo(() => {
        if (activeIndex === null) return null;
        return CATEGORIES[activeIndex] ?? null;
    }, [activeIndex]);

    // Embla
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align,
        containScroll: "trimSnaps",
    });

    const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    const handleClick = useCallback(
        (index) => {
            setActiveIndex((prevIdx) => (prevIdx === index ? null :index));
        },
        []
    );

    // When category changes, jump to slide 0
    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.scrollTo(0, true);
    }, [emblaApi, activeIndex]);

    return (
        <div className="MebelWrapper">
            <div className="MebelLayout">
                {/* LEFT: MENU */}
                <div className={cx("Mebel", isOpen && "shiftLeft", isFullscreen && "isFullscreen")}>
                    <ul className="MebelList">
                        {CATEGORIES.map((cat, index) => (
                            <li
                                key={cat.title}
                                className={cx("MebelLi", activeIndex === index && "active")}
                                onClick={() => handleClick(index)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === " ") handleClick(index);
                                }}
                            >
                                {cat.title}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* RIGHT: CAROUSEL */}
                <div className={cx("MebelCarouselPanel",isOpen && "show",  isFullscreen && "isFullscreen")}>
                    {activeCategory && (
                        <>
                            <button className="fullscreen" onClick={toggleFullscreen}>
                                {isFullscreen ? "✕" : "⛶"}
                            </button>

                            <div className="EmblaHeader">
                                <div className="EmblaBtns">
                                    <button type="button" onClick={prev}>Prev</button>
                                    <button type="button" onClick={next}>Next</button>
                                </div>
                            </div>

                            <div className={`embla ${isFullscreen ? "isFullscreen" : ""}`}>
                                <div className="embla__viewport" ref={emblaRef}>
                                    <div className="embla__container ">
                                        {activeCategory.photos.map((src, i) => (
                                            <div className="embla__slide" key={`${src}-${i}`}>
                                                <img className="embla__img" src={src} alt="" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

            </div>
        </div>
    );
}
