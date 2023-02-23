import { useState } from "react";
import NavBar from "../components/NavBar";
import Answers from "../components/Answers";
import raw from "../utils/help-create.txt";

function CreateYourdle() {

    const [helpText, setHelpText] = useState("");

    fetch(raw)
        .then(r => r.text())
        .then(text => {
            setHelpText(text);
        })

    return (
        <div>
            <NavBar 
                moreInfo={false}
                helpText={helpText}    
            />
            <Answers />
        </div>

    );
}

export default CreateYourdle;