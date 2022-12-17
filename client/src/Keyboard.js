import "./Keyboard.css";


function Keyboard() {

    const keys1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']
    const keys2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']
    const keys3 = ["Enter", 'z', 'x', 'c', 'v', 'b', 'n', 'm', '⌫']

    return(
        <div className="keyboard-container">
            <div className="keyboard">
                <div className="keyboard-row">
                    {keys1.map((key) => <p className="keyboard-button">{key}</p>)}
                </div>
                <div className="keyboard-row">
                    {keys2.map((key) => <p className="keyboard-button">{key}</p>)}
                </div>
                <div className="keyboard-row">
                    {keys3.map((key) => <p className="keyboard-button" id={key}>{key}</p>)}
                </div>
            </div>
        </div>


    );
}

export { Keyboard };