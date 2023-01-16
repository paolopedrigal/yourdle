import { useRef, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomeContext } from "../contexts/HomeContext.js";
import Fetch from "../apis/Fetch.js";
import "./Credentials.css";

function Credentials() {

    const nameRef = useRef(null);
    const invalidCredentialsRef = useRef(null);
    const {create, setCreate} = useContext(HomeContext);
    const toggleForm = () => { setCreate(prevState => !prevState); }
    const [takenCredentials, setTakenCredentials] = useState(false);
    const codeRef = useRef(null);
    const navigate = useNavigate();
    const MAXLENGTH_NAME = 10; // 10 characters maximum for username
    const MAXLENGTH_CODE = 8; // 5 characters maximum length for code
    const ONE_SECOND = 1000; // 1 second;

    const submit = () => { 

        const name = nameRef.current.value;
        const code = codeRef.current.value;
        const isInvalid = checkInvalidCredentials(); // Check if credentials are invalid (unfilled)

        // If valid credentials
        if (!isInvalid) {
            // If creating a yourdle
            if (create) {
                // Check if the user already exists with same username or code in the database
                getUserRequest(name, code).then((results) => { 
                    if (Object.keys(results.data.data).length >= 1) { // If a username/code is taken
                        displayInvalidMessage("The username or code is already taken.")
                    }
                    else { // Otherwise, create a new user
                        createUserRequest(name, code); 
                    }
                })
            }
            // Else, viewing a yourdle
            else {
                navigate("/yourdle/" + code);
            }
        }
        else {
            displayInvalidMessage("Please type a valid username/code.")
        }

    }

    async function getUserRequest(username, code) {
        try {
            // Send request to get users that have the username OR code
            const results = await Fetch.get("/get-user/", {
                params: {
                    username: username,
                    code: code
                }
            });
            return results;
        }
        catch(error) {
            console.log(error);
        }
    }

    async function createUserRequest(username, code) {
        try {
            // Send a request to create a new user in the USERS table in the database
            const results = await Fetch.post("/create-user/", {
                username: username,
                code: code
            })

            // Navigate page to create-yourdle page
            navigate("/create-yourdle/" + nameRef.current.value);
        }
        catch(error) {
            console.log(error);
        }
    }

    function displayInvalidMessage(message) {
        invalidCredentialsRef.current.innerText = message;
        invalidCredentialsRef.current.classList.add("show"); 
        setTimeout(() => {
            invalidCredentialsRef.current.classList.remove("show"); 
        }, ONE_SECOND * 4);
    }

    function checkInvalidCredentials() { 
        // Shake (user)name field if empty
        if(!(codeRef.current.value)) {
            codeRef.current.classList.add("animate__animated", "animate__shakeY");
            setTimeout(() => {
                codeRef.current.classList.remove("animate__animated", "animate__shakeY");
            }, ONE_SECOND);
        }
        // Shake code field if empty
        if(!(nameRef.current.value)) {
            nameRef.current.classList.add("animate__animated", "animate__shakeY");
            invalidCredentialsRef.current.classList.add("show"); 
            setTimeout(() => {
                nameRef.current.classList.remove("animate__animated", "animate__shakeY");
            }, ONE_SECOND);
        }
        return !(codeRef.current.value) || !(nameRef.current.value);
    }

    return(
        <form className="form-container">
            <div className="input-container">
                {create ? <label>USERNAME</label> : <label>NAME</label>}
                <input type="text" maxLength={`${MAXLENGTH_NAME}`} placeholder={create ? "Create username" : "Enter name"}ref={nameRef}></input>  
            </div>
            <div className="input-container">
                <label>CODE</label>
                <input type="password" maxLength={`${MAXLENGTH_CODE}`} placeholder={create ? "Create code" : "Enter code"} ref={codeRef}></input>
            </div>
            <button type="button" className="button-submit" onClick={submit}>{create ? "Create YOURDLE!" : "View YOURDLE!"}</button>
            <small>(YOURDLE = YOUR + WORDLE)</small>
            <p className="invalid-credentials" ref={invalidCredentialsRef}></p>
            <p className="toggle-form" onClick={toggleForm}>{create ? "View Yourdle →" : "Create Yourdle →"}</p>
        </form>
    );
}

export default Credentials;