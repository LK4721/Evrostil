import React, { useEffect, useState } from 'react';
import './Carousel.css';

function Carousel({images, interval= 10000}) {
    const slideImages = Array.isArray(images) ? images : [];
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (slideImages.length < 2) {
            return undefined;
        }

        const timer = setInterval(() => {
            setActiveIndex((index) => (index + 1) % slideImages.length);
        }, interval);

        return () => clearInterval(timer);
    }, [interval, slideImages.length]);

    const activeImage = slideImages[activeIndex] || slideImages[0];

    return (
        <div className="slider">
            {activeImage && (
                <img
                    key={activeImage}
                    src={activeImage}
                    alt={`Slide ${activeIndex + 1}`}
                    loading={activeIndex === 0 ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={activeIndex === 0 ? "high" : "auto"}
                />
            )}
        </div>
    );
}

export default Carousel;
