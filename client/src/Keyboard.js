
function Keyboard() {


    const keys1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']
    const keys2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']
    const keys3 = ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '⌫']

    const array1 = [1, 4, 9, 16];


    return(
        <div>
            <div>
                {keys1.map((key) => <p>{key}</p>)}
            </div>
            <div>
                {keys2.map((key) => <p>{key}</p>)}
            </div>
            <div>
                {keys3.map((key) => <p>{key}</p>)}
            </div>
        </div>

    );
}

export { Keyboard };