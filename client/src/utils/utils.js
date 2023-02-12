function removeEmpty(arr) {
    let newArr = [];
    arr.forEach(element => {
        if (element != "") newArr.push(element);
    });
    return newArr;
}

function preprocessLink(link) {
    const homeLinkRegex = /^[a-zA-Z:/.0-9]*\/yourdle\//
    const codeRegex = /[a-zA-Z]*$/

    console.log(link.match(homeLinkRegex));
    
    return {link: link.match(homeLinkRegex)[0], code: link.match(codeRegex)[0]};
}

export { removeEmpty, preprocessLink }

