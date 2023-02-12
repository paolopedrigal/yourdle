import "./MoreInfo.css";
import { preprocessLink } from "../utils/utils.js";

function MoreInfo() {

    const shareLink = "Link: " + preprocessLink(window.location.href).link 
        + "\nCode: " + preprocessLink(window.location.href).code.toUpperCase();

    return (
        <div className="more-info-info">
            <p>Share to your friends!</p>
            <div className="copy-link">
                <textarea readOnly="true" value={shareLink}></textarea>
                <button type="button"><span class="material-icons">content_copy</span></button>
            </div>
            <p>Meet the <span style={{textDecoration: "underline"}}>
                <a href="http://paolopedrigal.github.io/my-website" target="_blank">
                    creator
                </a>
            </span>!</p>
        </div>
    );

}

export default MoreInfo;