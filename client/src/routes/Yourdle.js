import { useState } from "react";
import NavBar from "../components/NavBar.js";
import Game from "../components/Game.js";
import raw from "../utils/help-yourdle.txt";

function Yourdle() {

    const [helpText, setHelpText] = useState("");

    fetch(raw)
        .then(r => r.text())
        .then(text => {
            setHelpText(text);
        })    

    return (
        <div>
            <NavBar 
                moreInfo={true}
                helpText={helpText}
            />
            <Game />
        </div>
    );
}

export default Yourdle;