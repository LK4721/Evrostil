import React,{useState, useEffect} from 'react';
import './Carousel.css';

function Carousel({images, interval= 10000}) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => prevIndex === images.length - 1 ? 0 : prevIndex + 1);
            }, interval);

            return () => clearInterval(timer);
        }, [images.length, interval]);

    return (
        <div className="slider">
            {images.map((img, index) => (
                <img
                    key={index}
                    src={img}
                    alt={`Slide ${index + 1}`}
                    style={{
                        animationDelay: `${index * (interval / 1000)}s`
                    }}
                />
            ))}
        </div>
    );
}

export default Carousel;