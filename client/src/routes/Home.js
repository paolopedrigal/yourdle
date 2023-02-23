import { useState } from "react";
import NavBar from "../components/NavBar.js";
import Credentials from "../components/Credentials.js";
import { HomeContext }  from "../contexts/HomeContext.js"
import raw from "../utils/help-home.txt";

function Home() {

    const [create, setCreate] = useState(false);
    const [helpText, setHelpText] = useState("");

    fetch(raw)
        .then(r => r.text())
        .then(text => {
            setHelpText(text);
        })

    return (
        <HomeContext.Provider value={{create, setCreate}}>
            <NavBar 
                moreInfo={false}
                helpText={helpText}
            />
            <Credentials />
        </HomeContext.Provider>
    );
}

export default Home;