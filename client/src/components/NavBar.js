import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MoreInfo from "./MoreInfo.js"
import Help from "./Help.js";
import "./NavBar.css";
import burgerMenu from "../images/burger.png";
import questionMark from "../images/question-icon.jpg";
// import settings from "../images/settings-gear-icon.webp";

function NavBar(props) {

    const [isMoreInfoClicked, setMoreInfoClicked] = useState(false);
    const [isHelpClicked, setHelpClicked] = useState(false);
    const handleInfoClicked = () => { setMoreInfoClicked(prevState => !prevState); }
    const handleHelpClicked = () => { setHelpClicked(prevState => !prevState); }
    const navigate = useNavigate();

    return (
        <div>
            <nav>
                <div className="more-info">
                    <img src={burgerMenu} alt="More Info" onClick={handleInfoClicked} className="burger-menu"/>
                </div> 
                <h1 className="yourdle-title" onClick={() => navigate("/")}>YOURDLE</h1>
                <div className="options">
                    <img src={questionMark} alt="Help" onClick={handleHelpClicked} className="question-mark"/>
                    {/* <img src={settings} alt="Settings" className="settings"/> */}
                </div>
            </nav>
            {isMoreInfoClicked ? <div className="more-info-container"><MoreInfo toShare={props.moreInfo}/></div> : <></>}
            {isHelpClicked ? <div className="help-info-container"><Help text={props.helpText} /></div> : <></>}
        </div>



    );
}

export default NavBar;