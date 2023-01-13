export default function removeEmpty(arr) {
    let newArr = [];
    arr.forEach(element => {
        if (element != "") newArr.push(element);
    });
    return newArr;
}