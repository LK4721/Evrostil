import React, { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import './Carousel.css';

function Carousel({images, interval= 10000}) {
    const slideImages = Array.isArray(images) ? images : [];
    const [activeIndex, setActiveIndex] = useState(0);
    const [mobileEmblaRef, mobileEmblaApi] = useEmblaCarousel({
        loop: true,
        align: 'center',
        containScroll: false,
    });

    useEffect(() => {
        if (slideImages.length < 2) {
            return undefined;
        }

        const timer = setInterval(() => {
            setActiveIndex((index) => (index + 1) % slideImages.length);
        }, interval);

        return () => clearInterval(timer);
    }, [interval, slideImages.length]);

    useEffect(() => {
        if (!mobileEmblaApi || slideImages.length < 2 || typeof window === 'undefined') {
            return undefined;
        }

        const mobileQuery = window.matchMedia('(max-width: 1200px)');
        let timer;

        const startAutoplay = () => {
            if (timer) {
                clearInterval(timer);
                timer = undefined;
            }

            if (mobileQuery.matches) {
                timer = setInterval(() => {
                    mobileEmblaApi.scrollNext();
                }, interval);
            }
        };

        startAutoplay();
        mobileQuery.addEventListener('change', startAutoplay);

        return () => {
            if (timer) {
                clearInterval(timer);
            }
            mobileQuery.removeEventListener('change', startAutoplay);
        };
    }, [interval, mobileEmblaApi, slideImages.length]);

    const activeImage = slideImages[activeIndex] || slideImages[0];

    return (
        <div className="slider">
            {activeImage && (
                <img
                    className="sliderDesktopImage"
                    key={activeImage}
                    src={activeImage}
                    alt={`Slide ${activeIndex + 1}`}
                    loading={activeIndex === 0 ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={activeIndex === 0 ? "high" : "auto"}
                />
            )}
            <div className="mobileEmbla" ref={mobileEmblaRef}>
                <div className="mobileEmblaContainer">
                    {slideImages.map((image, index) => (
                        <div className="mobileEmblaSlide" key={image}>
                            <img
                                src={image}
                                alt={`Slide ${index + 1}`}
                                loading={index === 0 ? "eager" : "lazy"}
                                decoding="async"
                                fetchPriority={index === 0 ? "high" : "auto"}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Carousel;
