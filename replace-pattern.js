function replacePattern(myArray) {
    // Preparing the returning array
    let returnArray = myArray;

    // Iteration of the different properties in the array
    for (nameProperty in myArray) {
        // String of the property value
        let stringSplit = myArray[nameProperty];
        // Check if the value contain a clause to replace
        if (stringSplit.includes("${") && stringSplit.includes("}")) {
            let firstSplit = stringSplit.split("${");
            console.log(firstSplit);
            for (let i = 0; i < firstSplit.length; i++) {
                if (firstSplit[i].includes("}")) {
                    // Separation of the name of the value to replace
                    let secondSplit = firstSplit[i].split("}");
                    let replaceString = secondSplit[0];
                    console.log(firstSplit[i]);
                    console.log(replaceString);
                    // Check if the array has this value and replace it
                    if(typeof myArray[replaceString] !== 'undefined' && replaceString != nameProperty) returnArray[nameProperty] = returnArray[nameProperty].replace("${"+replaceString+"}",returnArray[replaceString]);     
                }
            }
        }
    }
    return returnArray;
}

// Export of the function for testing
module.exports = replacePattern