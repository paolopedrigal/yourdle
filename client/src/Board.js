
import "./Board.css";

function Board () {

    const row1 = Array.from("     ")
    const row2 = Array.from("     ")
    const row3 = Array.from("     ")
    const row4 = Array.from("     ")
    const row5 = Array.from("     ")
    const row6 = Array.from("     ")


    return (
        <div>
            <div className="row">
                {row1.map((tile) => <div className="tile">{tile}</div>)}
            </div>
            <div className="row">
                {row2.map((tile) => <div className="tile">{tile}</div>)}
            </div>
            <div className="row">
                {row2.map((tile) => <div className="tile">{tile}</div>)}
            </div>
            <div className="row">
                {row3.map((tile) => <div className="tile">{tile}</div>)}
            </div>
            <div className="row">
                {row4.map((tile) => <div className="tile">{tile}</div>)}
            </div>
            <div className="row">
                {row5.map((tile) => <div className="tile">{tile}</div>)}
            </div>
        </div>

    );
}

export { Board };

/*
<ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
            </ul>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
            </ul>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
            </ul>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
            </ul>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
            </ul>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
            </ul>
*/