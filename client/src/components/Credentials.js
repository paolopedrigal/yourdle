import { useRef } from "react";
import "./Credentials.css";

function Credentials() {

    const usernameRef = useRef(null);
    const invalidCredentialsRef = useRef(null);
    const codeRef = useRef(null);
    const MAXLENGTH_USERNAME = 10; // 10 characters maximum for username
    const MAXLENGTH_CODE = 5; // 5 characters maximum length for code
    const ONE_SECOND = 1000; // 1 second;
    const TWO_SECONDS = 2000; // 2 seconds;

    const createYourdle = () => {
        checkInvalidCredentials();
    }

    function checkInvalidCredentials() { 
        if(!(codeRef.current.value)) {
            codeRef.current.classList.add("animate__animated", "animate__shakeY");
            setTimeout(() => {
                codeRef.current.classList.remove("animate__animated", "animate__shakeY");
            }, ONE_SECOND);
        }
        if(!(usernameRef.current.value)) {
            usernameRef.current.classList.add("animate__animated", "animate__shakeY");
            invalidCredentialsRef.current.classList.add("show"); 
            setTimeout(() => {
                usernameRef.current.classList.remove("animate__animated", "animate__shakeY");
            }, ONE_SECOND);
        }
        invalidCredentialsRef.current.classList.add("show"); 
        setTimeout(() => {
            invalidCredentialsRef.current.classList.remove("show"); 
        }, TWO_SECONDS);

    }

    return(
        <form className="form-container">
            <div className="input-container">
                <label>USERNAME</label>
                <input type="text" maxLength={`${MAXLENGTH_USERNAME}`} placeholder="Enter username" ref={usernameRef}></input>  
            </div>
            <div className="input-container">
                <label>CODE</label>
                <input type="password" maxLength={`${MAXLENGTH_CODE}`} placeholder={`${MAXLENGTH_CODE}-character code`} ref={codeRef}></input>
            </div>
            <button type="button" className="button-create-wordle" onClick={createYourdle}>Create YOURDLE!</button>
            <small>(YOURDLE = YOUR + WORDLE)</small>
            <p className="invalid-credentials" ref={invalidCredentialsRef}>Please type a valid username/code.</p>
        </form>
    );
}

export default Credentials;