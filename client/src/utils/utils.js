function removeEmpty(arr) {
    let newArr = [];
    arr.forEach(element => {
        if (element != "") newArr.push(element);
    });
    return newArr;
}

function getCodeFromLink(link) {
    const codeRegex = /[a-zA-Z]*$/
    return link.match(codeRegex)[0];
}

export { removeEmpty, getCodeFromLink }

