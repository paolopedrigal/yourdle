import { useState } from "react";
import NavBar from "../components/NavBar.js";
import Credentials from "../components/Credentials.js";
import { HomeContext }  from "../contexts/HomeContext.js"

function Home() {

    const [create, setCreate] = useState(true);

    return (
        <HomeContext.Provider value={{create, setCreate}}>
            <NavBar moreInfo={false}/>
            <Credentials />
        </HomeContext.Provider>
    );
}

export default Home;