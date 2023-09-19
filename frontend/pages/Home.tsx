import { Link } from "react-router-dom";
import { Button } from "../components/Button.tsx";
//import ImageSlider from "../components/ImageSlider.tsx"
import { AnimatedLogo } from "../components/AnimatedLogo.tsx";
import "../stylesheets/Home.css";

function Home(props: any) {
    const { loggedIn } = props;

    // Content for slides (To be replaced with screenshots from website and corresponding descriptions)
    const slides = [
        { url: "frontend/assets/featuresImageSlider/monopoly_board_sample.png", description: "Monopoly game board" },
        { url: "frontend/assets/featuresImageSlider/image-1.jpg", description: "beach" },
        { url: "frontend/assets/featuresImageSlider/image-2.jpg", description: "boat" },
        { url: "frontend/assets/featuresImageSlider/image-3.jpg", description: "forest" },
        { url: "frontend/assets/featuresImageSlider/image-4.jpg", description: "city" },
        { url: "frontend/assets/featuresImageSlider/image-5.jpg", description: "town" }
    ];

    return (
        <div id="page-container">
            {/* <h1 id="site-title">Monopoly</h1> */}
            <div>
                <div id="title-section" className="sections">
                    <AnimatedLogo></AnimatedLogo>
                    <h1 id="tagline">Hippity hoppity, your hotels are now my property</h1>
                    <div className="action-links">
                        <>
                            {loggedIn ? (
                                <Link className="button-link" to={"/hub"}>
                                    <Button label="Play Now!"></Button>
                                </Link>
                            ) : (
                                <Link className="button-link" to={"/login"}>
                                    <Button label="Get Started"></Button>
                                </Link>
                            )}
                        </>
                    </div>
                </div>
                <div id="about-section" className="sections">
                    <h2 className="headers">About Monopoly</h2>
                    <p>The classic board game Monopoly is now available online for multiplayer! Compete with friends and strangers from all over the world in this fast-paced and strategic game.
                        <br></br>
                        <br></br>
                        Choose your game room, customize your character, and start playing today!</p>
                </div>
                <div id="features-section" className="sections">
                    <h2 className="headers">Features</h2>
                    <div id="slideshow-container">
                        <ImageSlider slides={slides}></ImageSlider>
                    </div>
                </div>
                <div id="about-section" className="sections">
                    <h2 className="headers">More About Monopoly</h2>
                    <p>Monopoly is a classic board game that brings together the thrill of business and property management. Players roll dice to move around the game board, buying and trading properties, and developing them with houses and hotels. The game is won by bankrupting the other players. In our online version, you can enjoy the same strategic gameplay with friends or players from around the world, right from the comfort of your home.
                        <br></br>
                        <br></br>
                        Get ready to experience the highs and lows of real estate with Monopoly online!</p>
                </div>

            </div>
        </div >
    )
}

export default Home;
