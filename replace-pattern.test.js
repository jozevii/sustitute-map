const { expect } = require('@jest/globals');
const replacePattern = require('./replace-pattern')

test('Sample of the exercise', () => {
    let array =  {
        "key1":"value1",
        "key2":"${key1}value2"
    };

    let arrayExpected =  {
        "key1":"value1",
        "key2":"value1value2"
    };

    expect(replacePattern(array, false)).toStrictEqual(arrayExpected)
});

test('No changes', () => {
    let array =  {
        "key1":"value1",
        "key2":"value2"
    };

    let arrayExpected =  {
        "key1":"value1",
        "key2":"value2"
    };

    expect(replacePattern(array, false)).toStrictEqual(arrayExpected)
});

test('Refence to non existent property or empty propety (I have decided to omit the auto reference)', () => {
    let array =  {
        "key1":"value1${key3}",
        "key2":"value2${}"
    };

    let arrayExpected =  {
        "key1":"value1${key3}",
        "key2":"value2${}"
    };

    expect(replacePattern(array, false)).toStrictEqual(arrayExpected)
});

test('Auto reference (I have decided to omit the auto reference)', () => {
    let array =  {
        "key1":"value1${key1}",
        "key2":"value2"
    };

    let arrayExpected =  {
        "key1":"value1${key1}",
        "key2":"value2"
    };

    expect(replacePattern(array, false)).toStrictEqual(arrayExpected)
});

test('Auto reference with other reference', () => {
    let array =  {
        "key1":"value1${key1}${key2}",
        "key2":"value2"
    };

    let arrayExpected =  {
        "key1":"value1${key1}value2",
        "key2":"value2"
    };

    expect(replacePattern(array, false)).toStrictEqual(arrayExpected)
});

test('Bidirectional refence (I have decided to return a string)', () => {
    let array =  {
        "key1":"value1${key2}",
        "key2":"value2${key1}"
    };
    expect(replacePattern(array, false)).toBe("Bidirectional calls are not allowed")
});

test('Three properties', () => {
    let array =  {
        "key1":"value1${key2}${key3}",
        "key2":"value2",
        "key3":"value3",
    };

    let arrayExpected =  {
        "key1":"value1value2value3",
        "key2":"value2",
        "key3":"value3",
    };

    expect(replacePattern(array, false)).toStrictEqual(arrayExpected)
});

test('Recursive references', () => {
    let array =  {
        "key1":"value1${key2}",
        "key2":"value2${key3}",
        "key3":"value3",
    };

    let arrayExpected =  {
        "key1":"value1value2value3",
        "key2":"value2value3",
        "key3":"value3",
    };

    expect(replacePattern(array, false)).toStrictEqual(arrayExpected)
});

test('No $, no { and no } included', () => {
    let array =  {
        "key1":"value1{key2}",
        "key2":"value2$key2}",
        "key3":"value3${key2",
    };

    let arrayExpected =  {
        "key1":"value1{key2}",
        "key2":"value2$key2}",
        "key3":"value3${key2",
    };

    expect(replacePattern(array, false)).toStrictEqual(arrayExpected)
});

test('Repeated ${ or repeated }', () => {
    let array =  {
        "key1":"${key2}}value1${${key2}",
        "key2":"value2",
    };

    let arrayExpected =  {
        "key1":"value2}value1${value2",
        "key2":"value2",
    };

    expect(replacePattern(array, false)).toStrictEqual(arrayExpected)
});

test('Other type of values', () => {
    expect(replacePattern(12345, false)).toBe(12345)
    expect(replacePattern("aAa", false)).toStrictEqual("aAa")
});
