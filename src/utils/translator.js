function getBitmaskValue(number, position) {
    return !!((number >> (position)) & 1)
}

export var binaryToDecimal = (binaryString) => {
    // Convert binary string to decimal
    const decimalValue = parseInt(binaryString, 2);
    console.log(`Decimal: ${decimalValue} | Binary: ${binaryString}`);
    return decimalValue;
}

export var decimalToBinary = (decimalValue, configLength) => {
    // Ensure the input is a non-negative integer
    if (!Number.isInteger(decimalValue)) {
        throw new Error('Invalid input.');
    }

    // Convert decimal to binary string with leading zeros to ensure config length bits
    const binaryString = decimalValue.toString(2).padStart(configLength, '0');

    return binaryString;
}

export var getBehaviorValueElement = (input, position) => {
    return getBitmaskValue(input, position)
}