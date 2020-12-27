function binaryStringToInt(s) {
    let result = 0;

    for (let i = 0; i < s.length; i++) {
        result = 2 * result + parseInt(s.charAt(i));

    }

    return result;


}

function shuffleSelf(array, size) {
    var index = -1,
        length = array.length,
        lastIndex = length - 1;

    size = size === undefined ? length : size;
    while (++index < size) {
        // var rand = baseRandom(index, lastIndex),
        var rand = index + Math.floor( Math.random() * (lastIndex - index + 1))
        value = array[rand];

        array[rand] = array[index];

        array[index] = value;
    }
    array.length = size;
    return array;
}

function randomNum(minNum,maxNum){
    switch(arguments.length){
        case 1:
            return parseInt(Math.random()*minNum+1,10);
            break;
        case 2:
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
            break;
        default:
            return 0;
            break;
    }
}