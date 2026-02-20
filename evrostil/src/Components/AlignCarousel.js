import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import "./AlignCarousel.css";

export default function AlignCarousel({ slides }) {
    const [align, setAlign] = useState("center"); // "start" | "center" | "end"

    // Re-init Embla when align changes
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: false, align, containScroll: "trimSnaps" },
        []
    );

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.reInit({ loop: false, align, containScroll: "trimSnaps" });
    }, [emblaApi, align]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    return (
        <div className="embla">
            {/* Align controls */}
            <div className="embla__controls">
                <label className="embla__label">Align:</label>
                <select
                    className="embla__select"
                    value={align}
                    onChange={(e) => setAlign(e.target.value)}
                >
                    <option value="start">start</option>
                    <option value="center">center</option>
                    <option value="end">end</option>
                </select>

                <div className="embla__buttons">
                    <button className="embla__button" onClick={scrollPrev}>Prev</button>
                    <button className="embla__button" onClick={scrollNext}>Next</button>
                </div>
            </div>

            {/* Carousel */}
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {slides.map((src, i) => (
                        <div className="embla__slide" key={i}>
                            <div className="embla__slide__inner">
                                <img className="embla__slide__img" src={src} alt={`Slide ${i + 1}`} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
