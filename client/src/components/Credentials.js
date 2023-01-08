import { useRef, useContext } from "react";
import { HomeContext } from "../contexts/HomeContext.js";
import "./Credentials.css";

function Credentials() {

    const nameRef = useRef(null);
    const invalidCredentialsRef = useRef(null);
    const {create, setCreate} = useContext(HomeContext);
    const codeRef = useRef(null);
    const MAXLENGTH_NAME = 10; // 10 characters maximum for username
    const MAXLENGTH_CODE = 5; // 5 characters maximum length for code
    const ONE_SECOND = 1000; // 1 second;

    const submit = () => { 
        console.log("username:", nameRef.current.value);
        console.log("code:", codeRef.current.value);
        checkInvalidCredentials();
    }

    const toggleForm = () => {
        console.log("toggle form clicked");
        setCreate(prevState => !prevState);
    }

    function checkInvalidCredentials() { 
        if(!(codeRef.current.value)) {
            codeRef.current.classList.add("animate__animated", "animate__shakeY");
            setTimeout(() => {
                codeRef.current.classList.remove("animate__animated", "animate__shakeY");
            }, ONE_SECOND);
        }
        if(!(nameRef.current.value)) {
            nameRef.current.classList.add("animate__animated", "animate__shakeY");
            invalidCredentialsRef.current.classList.add("show"); 
            setTimeout(() => {
                nameRef.current.classList.remove("animate__animated", "animate__shakeY");
            }, ONE_SECOND);
        }
        invalidCredentialsRef.current.classList.add("show"); 
        setTimeout(() => {
            invalidCredentialsRef.current.classList.remove("show"); 
        }, ONE_SECOND * 4);

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
            <p className="invalid-credentials" ref={invalidCredentialsRef}>Please type a valid username/code.</p>
            <p className="toggle-form" onClick={toggleForm}>{create ? "View Yourdle →" : "Create Yourdle →"}</p>
        </form>
    );
}

export default Credentials;