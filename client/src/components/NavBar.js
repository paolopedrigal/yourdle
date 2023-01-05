import "./NavBar.css";
import burgerMenu from "../images/burger.png";
import questionMark from "../images/question-icon.jpg";
import settings from "../images/settings-gear-icon.webp";

function NavBar() {

    return (
        <nav>
            <div className="more-info">
                <img src={burgerMenu} alt="More Info" className="burger-menu"/>
            </div>
            <h1 className="yourdle-title">YOURDLE</h1>
            <div className="options">
                <img src={questionMark} alt="Help" className="question-mark"/>
                <img src={settings} alt="Settings" className="settings"/>
            </div>
        </nav>
    );
}

export default NavBar;