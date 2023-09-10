import "../stylesheets/ImageSlider.css";
import { useEffect, useRef, useState, useCallback } from "react";
import { CaretLeft, CaretRight, DotOutline } from "@phosphor-icons/react";

const ImageSlider = ({ slides }: any) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timerRef = useRef(null);

    const getCurrentSlideImg: { backgroundImage: string } = {
        backgroundImage: slides[currentIndex].url,
    };

    const getCurrentSlideTxt = slides[currentIndex].description;

    const goPrevious = () => {
        // Go to last image if current image is first image
        if (currentIndex === 0) {
            setCurrentIndex(slides.length - 1);
        } else {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const goNext = useCallback(() => {
        // Go to first image if current image is last image
        if (currentIndex === slides.length - 1) {
            setCurrentIndex(0);
        } else {
            setCurrentIndex(currentIndex + 1);
        }
    }, [currentIndex, slides.length]);

    useEffect(() => {
        // Clear timer if it exists
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        // Set timer to go to next image after 5 seconds
        timerRef.current = setTimeout(() => {
            goNext();
        }, 5000);
        // Clear timer when component unmounts (when user clicks next arrow)
        return () => clearTimeout(timerRef.current);
    }, [goNext]);

    return (
        <div className="slider-container">
            <div id="left-slider-button" className="slider-button" onClick={goPrevious}>
                <CaretLeft size={64} weight="fill" />
            </div>
            <div id="right-slider-button" className="slider-button" onClick={goNext}>
                <CaretRight size={64} weight="fill" />
            </div>
            <img className="slide" src={getCurrentSlideImg.backgroundImage} alt={currentIndex.toString()} />
            <p className="slide-text">{getCurrentSlideTxt}</p>
            <div className="dots-container">
                {slides.map((slide, slideIndex: any) => (
                    <div
                        key={slideIndex}
                        onClick={() => setCurrentIndex(slideIndex)}
                    ><DotOutline size={50} weight="fill" className={slideIndex === currentIndex ? "dot-active" : "dot"} />
                    </div>
                ))}
            </div>
        </div>
    );
};


export default ImageSlider;