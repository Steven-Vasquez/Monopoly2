import "../stylesheets/ImageSlider.css";
import { useState } from "react";

const ImageSlider = ({ slides }: any) => {
    const [currentIndex, setCurrent] = useState(0);

    const slideCurrentImage: {backgroundImage: string} = {
        backgroundImage: slides[currentIndex].url,
    };

    const goPrevious = () => {
        // Go to last image if current image is first image
        if (currentIndex === 0) {
            setCurrent(slides.length - 1);
        } else {
            setCurrent(currentIndex - 1);
        }
    };

    const goNext = () => {
        // Go to first image if current image is last image
        if (currentIndex === slides.length - 1) {
            setCurrent(0);
        } else {
            setCurrent(currentIndex + 1);
        }
    };

    return (
        <div className="slider-container">
            <div id="left-slider-button" className="slider-button" onClick={goPrevious}><p>◄</p></div>
            <div id="right-slider-button" className="slider-button" onClick={goNext}><p>►</p></div>
            <img className="slide" src={slideCurrentImage.backgroundImage} alt={currentIndex.toString()}/>
        </div>
    );
};


export default ImageSlider;