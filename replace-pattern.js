function replacePattern(myArray, checkMode) {
    try {
        // Preparing the returning array
        let returnArray = myArray;

        // Iteration of the different properties in the array
        for (nameProperty in myArray) {
            // String of the property value
            let stringSplit = myArray[nameProperty];
            // Check if the value contain a clause to replace
            if (stringSplit.includes("${") && stringSplit.includes("}")) {
                let firstSplit = stringSplit.split("${");
                for (let i = 0; i < firstSplit.length; i++) {
                    if (firstSplit[i].includes("}")) {
                        // Separation of the name of the value to replace
                        let secondSplit = firstSplit[i].split("}");
                        let replaceString = secondSplit[0];
                        // Check if the array has this value and replace it
                        if(typeof myArray[replaceString] !== 'undefined' && replaceString != nameProperty){
                            if (checkMode) {
                                // If check mode is active check if exist some clause to replace
                                return true;
                            } else {
                                // If check mode is not active replace it
                                returnArray[nameProperty] = returnArray[nameProperty].replace("${"+replaceString+"}",returnArray[replaceString]); 
                            }
                        } 
                    }
                }
            }
        }
        if (checkMode) {
            // If check mode is active and don't find any clause to replace return false
            return false;
        } else {
            // If check mode is not active check before return the final array
            if(replacePattern(returnArray, true)) returnArray = replacePattern(returnArray, false);
            return returnArray;
        }
    } catch (e) {
        // Catching error of Bidirectional calls
        if (e instanceof RangeError) {
            return "Bidirectional calls are not allowed";
        }
    }
    
}

// Export of the function for testing
module.exports = replacePattern