// HTML ELEMENTS

const form = document.querySelector('form');
const height = document.querySelector('#height');
const weight = document.querySelector('#weight');
const height_units = document.querySelector('#height-units');
const weight_units = document.querySelector('#weight-units');
const result = document.querySelector('#result');
const result_message = document.querySelector('#result-message');

// REGEX
// only numbers and one decimal point
const filterInputs = (input) => {
    const value = input.value;
    if (value[value.length - 1] === '.' && value.slice(0,-1).includes('.')) return input.value = value.slice(0,-1);
    const regex = /[^0-9.]/g;
    input.value = value.replace(regex, '')
}

// HEIGHT CONVERSION to cm
const convertHeightToMetric = () => {
    const unit = height_units.value;
    const value = height.value;
    if (unit === 'in') return value * 2.54;
    if (unit === 'ft') return value * 30.48;
    if (unit === 'm') return value * 100;
    return value;
}

// WEIGHT CONVERSION to kg
const convertWeightToMetric = () => {
    const unit = weight_units.value;
    const value = weight.value;
    if (unit === 'lb') return value * 0.453592;
    if (unit === 'g') return value * 0.001;
    return value;
}

// CALCULATE BMI (metric)
const calculateBMI = () => {
    const height = convertHeightToMetric();
    const weight = convertWeightToMetric();
    return (weight / (height * height) * 10000);
}

// DISPLAY RESULT
const getBMIMessage = (bmi) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
    // the assignment says over 30 is overweight, but I think it's supposed to say obese
}

// EVENT LISTENERS

// input
height.addEventListener('input', () => filterInputs(height));
weight.addEventListener('input', () => filterInputs(weight));

// submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const bmi = calculateBMI();
    // if not a number, input was invalid
    if (!bmi) {
        result.textContent = '';
        result_message.innerHTML = 'Invalid input';
        alert('Invalid input');
        return;
    };
    result.textContent = bmi.toFixed(2);
    result_message.textContent = getBMIMessage(bmi);
    alert(`Your BMI is ${bmi.toFixed(2)} \n you are ${getBMIMessage(bmi)}`);
    return;
})