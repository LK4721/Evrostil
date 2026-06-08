import React from 'react';
import './Carousel.css';

function Carousel({images, interval= 10000}) {
    const slideImages = Array.isArray(images) ? images : [];
    const animationDuration = `${(slideImages.length || 1) * (interval / 1000)}s`;

    return (
        <div className="slider">
            {slideImages.map((img, index) => (
                <img
                    key={index}
                    src={img}
                    alt={`Slide ${index + 1}`}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={index === 0 ? "high" : "auto"}
                    style={{
                        animationDuration,
                        animationDelay: `${index * (interval / 1000)}s`
                    }}
                />
            ))}
        </div>
    );
}

export default Carousel;
