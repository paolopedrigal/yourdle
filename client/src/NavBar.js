import { useState } from "react";
import "./NavBar.css";
import burgerMenu from "./images/burger.png";
import questionMark from "./images/question-icon.jpg";
import settings from "./images/settings-gear-icon.webp";

function NavBar() {

    const [titleCentered, setTitleCentered] = useState(true);

    window.addEventListener("resize", () => {
        if (window.innerWidth <= 980) { // innerWidth of 980 or less is for mobile (iPhone)
            setTitleCentered(false);
        }
        else {
            setTitleCentered(true); // innerWidth of desktop is 980 or more
        }
    })

    return (
        <nav>
            <div className="more-info">
                <img src={burgerMenu} alt="More Info" className="burger-menu"/>
            </div>
            <h1 className={titleCentered ? "wordle-title" : "wordle-title left"}>WORDLE</h1>
            <div className="options">
                <img src={questionMark} alt="Help" className="question-mark"/>
                <img src={settings} alt="Settings" className="settings"/>
            </div>
        </nav>
    );
}

export { NavBar };