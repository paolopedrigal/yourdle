import "./NavBar.css";

function NavBar() {

    return (
        <nav>
            <div className="more-info">
                <img href="" alt="More Info"/>
            </div>
            <h1 className="wordle-title">WORDLE</h1>
            <ul className="options">
                <li>
                    <img href="" alt="Help"/>
                </li>
                <li>
                    <img href="" alt="Statistics"/>
                </li>   
                <li>
                    <img href="" alt="Settings"/>
                </li>
            </ul>
        </nav>
    );
}

export { NavBar };