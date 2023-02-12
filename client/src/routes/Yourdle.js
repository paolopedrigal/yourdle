import NavBar from "../components/NavBar.js";
import Game from "../components/Game.js";

function Yourdle() {
    return (
        <div>
            <NavBar moreInfo={true}/>
            <Game />
        </div>
    );
}

export default Yourdle;