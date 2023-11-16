import { getBehaviorValueElement, decimalToBinary, binaryToDecimal } from '../utils/translator.js'

let behaviorConfig = {};
let currentBinaryString = "0";

fetch("config/config.json")
.then(response => response.json())
.then(response => {
    behaviorConfig = response;
    console.log(response);
    processData();
    currentBinaryString = decimalToBinary(Number(document.getElementById('inputData').value), Object.keys(behaviorConfig).length);
});

function processData() {    
    let inputData = Number(document.getElementById('inputData').value);
    let outputSlot = document.getElementById('outputData')

    //clear state
    outputSlot.innerHTML = null;

    // Create table header
    const headerRow = outputSlot.insertRow(0);
    const keyHeader = headerRow.insertCell(0);
    keyHeader.textContent = 'Key';
    const valueHeader = headerRow.insertCell(1);
    valueHeader.textContent = 'Value';

    // Iterate through behaviorConfig
    let rowIndex = 1; // Start from the next row after the header
    for (const key in behaviorConfig) {
        if (behaviorConfig.hasOwnProperty(key)) {

            const isEnabled = getBehaviorValueElement(inputData, behaviorConfig[key]);

            // Insert a new row for each key-value pair
            const newRow = outputSlot.insertRow(rowIndex);

            // Insert cells for key and value
            const keyCell = newRow.insertCell(0);
            keyCell.textContent = key;

            const valueCell = newRow.insertCell(1);
            valueCell.textContent = isEnabled;

            newRow.classList.add(isEnabled ? 'enabled-behavior' : 'disabled-behavior');
            newRow.classList.add('behavior-row-element');

            newRow["rowIndexCustomValue"] = rowIndex;
            newRow.onpointerup = updateInputAccordingToSelection;

            rowIndex++;
        }
    }

}

function updateInputAccordingToSelection(event) {
    var inputTextArea = document.getElementById('inputData');
    var rowIndexBackwards = currentBinaryString.length - event.currentTarget.rowIndexCustomValue;
    console.log("Clicked on value with rowIndex: " + event.currentTarget.rowIndexCustomValue);

    currentBinaryString = currentBinaryString.replaceAt(rowIndexBackwards, currentBinaryString[rowIndexBackwards] === "0" ? "1" : "0");
    inputTextArea.value = binaryToDecimal(currentBinaryString);
    processData();
}

//input callbacks
function validateInput() {
    var inputTextArea = document.getElementById('inputData');
    inputTextArea.value = inputTextArea.value.replace(/[^0-9]/g, '').substring(0, 10);
}

function appendToInput(value) {
    var inputTextArea = document.getElementById('inputData');
    inputTextArea.value += value;
    onChange();
}

function clearInput() {
    document.getElementById('inputData').value = '';
    onChange();
}

function removeLastDigit() {
    var inputTextArea = document.getElementById('inputData');
    inputTextArea.value = inputTextArea.value.slice(0, -1);
    onChange();
}

function onChange() {
    validateInput();
    processData();
    currentBinaryString = decimalToBinary(Number(document.getElementById('inputData').value), Object.keys(behaviorConfig).length);
    console.log("Current binary string is set to: " + currentBinaryString);
}

window["appendToInput"] = appendToInput;
window["clearInput"] = clearInput;
window["removeLastDigit"] = removeLastDigit;
window["onChange"] = onChange;

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}