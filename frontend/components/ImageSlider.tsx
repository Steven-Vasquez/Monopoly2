import "../stylesheets/ImageSlider.css";
import { useEffect, useRef, createRef, useState, useCallback } from "react";
import { CaretLeft, CaretRight, DotOutline } from "@phosphor-icons/react";
import { timeEnd } from "console";

const ImageSlider = ({ slides }: any) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slidesRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    const slideTime = 5000;
    // const [startTime, setStartTime] = useState(Date.now());
    // const [elapsedTime, setElapsedTime] = useState(0);
    // const [endTime, setEndTime] = useState(Date.now() + slideTime);

    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
        const timeNow = Date.now();

        // setStartTime(timeNow);
        // setElapsedTime(0);
        // setEndTime(timeNow + slideTime)
        // console.log("RESET", (elapsedTime - startTime), (endTime - startTime))
    }, [currentIndex, slides.length]);

    useEffect(() => {
        // Clear timer if it exists
        if (progressRef.current != null) {
            progressRef.current?.classList.remove("progress-animating")
            void progressRef.current?.offsetWidth;
            progressRef.current?.classList.add("progress-animating")
        }
        // console.log(progressRef.current);
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        // // Set timer to go to next image after 5 seconds
        const timeout = setTimeout(() => {
            goNext();
        }, 5000);
        timerRef.current = timeout;
        // // Clear timer when component unmounts (when user clicks next arrow)
        return () => clearTimeout(timerRef.current as NodeJS.Timeout);
    }, [currentIndex]);

    useEffect(() => {
        if (slidesRef != null) {
            let elem = slidesRef.current?.children.namedItem(`slide-${currentIndex}`) as HTMLElement
            slidesRef.current?.scrollTo({
                top: window.scrollY,
                left: elem.offsetLeft,
                behavior: 'smooth'
            })
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
                    <div className="slide-progress" ref={progressRef}></div>
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