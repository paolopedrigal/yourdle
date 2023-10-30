import "./MoreInfo.css";
import { useRef } from "react";
import { getCodeFromLink } from "../utils/utils.js";

function MoreInfo(props) {
  //   const textAreaRef = useRef(null);
  //   const HOME_LINK = "http://localhost:3000/";
  //   const shareLink =
  //     "Check out this Yourdle!\n" +
  //     HOME_LINK +
  //     "\n\nCode: " +
  //     getCodeFromLink(window.location.href);

  //   const copyClipboard = () => {
  //     navigator.clipboard.writeText(shareLink);
  //     textAreaRef.current.value = "Copied to clipboard!";
  //   };

  return (
    <div className="more-info-info">
      {/* {props.toShare ? (
        <div>
          <p>Share to your friends!</p>
          <div className="copy-link">
            <textarea
              readOnly="true"
              value={shareLink}
              ref={textAreaRef}
            ></textarea>
            <button type="button" onClick={copyClipboard}>
              <span class="material-icons">content_copy</span>
            </button>
          </div>
        </div>
      ) : (
        <></>
      )} */}
      <p>
        Meet the{" "}
        <span style={{ textDecoration: "underline" }}>
          <a href="http://paolopedrigal.github.io/" target="_blank">
            creator
          </a>
        </span>
        !
      </p>
    </div>
  );
}

export default MoreInfo;
