import "../stylesheets/ImageSlider.css";
import { useEffect, useRef, createRef, useState, useCallback } from "react";
import { CaretLeft, CaretRight, DotOutline } from "@phosphor-icons/react";

const ImageSlider = ({ slides }: any) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slidesRef = useRef<HTMLDivElement>(null);

    const [currentTime, setCurrentTime] = useState(0);

    // const timerRef = useRef(null);

    // const getCurrentSlideImg: { backgroundImage: string } = {
    //     backgroundImage: slides[currentIndex].url,
    // };

    // const getCurrentSlideTxt = slides[currentIndex].description;
    

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
        // // Clear timer if it exists
        // if (timerRef.current) {
        //     clearTimeout(timerRef.current);
        // }
        // // Set timer to go to next image after 5 seconds
        // timerRef.current = setTimeout(() => {
        //     goNext();
        // }, 5000);
        // // Clear timer when component unmounts (when user clicks next arrow)
        // return () => clearTimeout(timerRef.current);
    }, [goNext]);

    useEffect(() => {
        if (slidesRef != null) {
            console.log(`slide-${currentIndex}`);
            console.log(slidesRef.current?.children[currentIndex]);
            // slidesRef.current?.scrollTo({
            //     top: window.scrollY,
            //     left: slidesRef.current?.children[currentIndex].getBoundingClientRect().x,
            //     behavior: 'smooth'
            // })
            slidesRef.current?.children[currentIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }
    }, [currentIndex])

    return (
        <>
        <div className="slideshow">
            <div id="left-slider-button" className="slider-button" onClick={goPrevious}>
                <CaretLeft size={24} weight="fill" />
            </div>
            <div className="slideshow-center">
                <div className="slides-container" ref={slidesRef}>
                    {slides.map((slide: {url: string, description: string}, index: Number) => (
                        <div className="slide" id={"slide-" + index.toString()}>
                            <img className="slide-image" src={slide.url} alt={index.toString()} />
                            <div className="slide-text">{slide.description}{index.toString()}</div>
                        </div>
                    ))}
                </div>
                <div className="slide-timer">
                    <div className="slide-progress"></div>
                </div>
            </div>
            {/* <img className="slide" src={getCurrentSlideImg.backgroundImage} alt={currentIndex.toString()} /> */}
            {/* <p className="slide-text">{getCurrentSlideTxt}</p> */}
            <div id="right-slider-button" className="slider-button" onClick={goNext}>
                <CaretRight size={24} weight="fill" />
            </div>
            <div className="dots">
                {slides.map((slide: {url: string, description: string}, slideIndex: any) => (
                    <div
                        key={slideIndex}
                        onClick={() => setCurrentIndex(slideIndex)}
                        className={"dot " + (slideIndex === currentIndex ? "active" : "")}
                        id={"dot " + slideIndex}
                    >
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};


export default ImageSlider;