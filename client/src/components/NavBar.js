import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Contact from "./Contact.js"; // delete this component?
import MoreInfo from "./MoreInfo.js"
import "./NavBar.css";
import burgerMenu from "../images/burger.png";
import questionMark from "../images/question-icon.jpg";
import settings from "../images/settings-gear-icon.webp";

function NavBar() {

    const [isMoreInfoClicked, setMoreInfoClicked] = useState(false);
    const handleInfoClicked = () => { setMoreInfoClicked(prevState => !prevState); }
    const navigate = useNavigate();

    return (
        <div>
            <nav>
                <div className="more-info">
                    <img src={burgerMenu} alt="More Info" onClick={handleInfoClicked} className="burger-menu"/>
                </div>
                <h1 className="yourdle-title" onClick={() => navigate("/")}>YOURDLE</h1>
                {/* <div className="options">
                    <img src={questionMark} alt="Help" className="question-mark"/>
                    <img src={settings} alt="Settings" className="settings"/>
                </div> */}
            </nav>
            {isMoreInfoClicked ? <div className="more-info-container"><MoreInfo /></div> : <></>}
        </div>



    );
}

export default NavBar;