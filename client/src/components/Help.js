import "./Help.css";

function Help(props) {

    console.log(props.text.split("\n"));

    return(
        <div className="help-container">
            {props.text.split("\n").map(t => {
                if (t.charAt(0) == "#") {
                    return (<h1 className="help-subtitle">{t.substring(1, t.length)}</h1>);
                }
                else {
                    return (<p className="help-subtext">{t}</p>);
                }
            })}
        </div>
    );
}

export default Help;