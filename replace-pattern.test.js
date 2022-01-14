const { expect } = require('@jest/globals');
const replacePattern = require('./replace-pattern')

test('Sample of the exercise', () => {
    var array =  {
        "key1":"value1",
        "key2":"${key1}value2"
    };

    var arrayExpected =  {
        "key1":"value1",
        "key2":"value1value2"
    };

    expect(replacePattern(array)).toStrictEqual(arrayExpected)
});

test('No changes', () => {
    var array =  {
        "key1":"value1",
        "key2":"value2"
    };

    var arrayExpected =  {
        "key1":"value1",
        "key2":"value2"
    };

    expect(replacePattern(array)).toStrictEqual(arrayExpected)
});

test('Refence to non existent property or empty propety', () => {
    var array =  {
        "key1":"value1${key3}",
        "key2":"value2${}"
    };

    var arrayExpected =  {
        "key1":"value1${key3}",
        "key2":"value2${}"
    };

    expect(replacePattern(array)).toStrictEqual(arrayExpected)
});

test('Auto reference (I supose to omit the auto reference)', () => {
    var array =  {
        "key1":"value1${key1}",
        "key2":"value2"
    };

    var arrayExpected =  {
        "key1":"value1${key1}",
        "key2":"value2"
    };

    expect(replacePattern(array)).toStrictEqual(arrayExpected)
});

test('Auto reference with other reference', () => {
    var array =  {
        "key1":"value1${key1}${key2}",
        "key2":"value2"
    };

    var arrayExpected =  {
        "key1":"value1${key1}value2",
        "key2":"value2"
    };

    expect(replacePattern(array)).toStrictEqual(arrayExpected)
});

test('Bidirectional refence (I supose to first get the first value)', () => {
    var array =  {
        "key1":"value1${key2}",
        "key2":"value2${key1}"
    };

    var arrayExpected =  {
        "key1":"value1value2${key1}",
        "key2":"value2value1value2${key1}"
    };

    expect(replacePattern(array)).toStrictEqual(arrayExpected)
});

test('Three properties', () => {
    var array =  {
        "key1":"value1${key2}${key3}",
        "key2":"value2",
        "key3":"value3",
    };

    var arrayExpected =  {
        "key1":"value1value2value3",
        "key2":"value2",
        "key3":"value3",
    };

    expect(replacePattern(array)).toStrictEqual(arrayExpected)
});

test('No $, no { and no } included', () => {
    var array =  {
        "key1":"value1{key2}",
        "key2":"value2$key2}",
        "key3":"value3${key2",
    };

    var arrayExpected =  {
        "key1":"value1{key2}",
        "key2":"value2$key2}",
        "key3":"value3${key2",
    };

    expect(replacePattern(array)).toStrictEqual(arrayExpected)
});

test('Repeated ${ or repeated }', () => {
    var array =  {
        "key1":"${key2}}value1${${key2}",
        "key2":"value2",
    };

    var arrayExpected =  {
        "key1":"value2}value1${value2",
        "key2":"value2",
    };

    expect(replacePattern(array)).toStrictEqual(arrayExpected)
});

test('Other type of values', () => {
    expect(replacePattern(12345)).toBe(12345)
    expect(replacePattern("aAa")).toStrictEqual("aAa")
});
