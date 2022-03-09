// entire html form element
const form = document.getElementById('signup-form');

// input elements
const userid_input = document.getElementById('userid-input');
const password_input = document.getElementById('password-input');
const name_input = document.getElementById('name-input');
const address_input = document.getElementById('address-input');
const zipcode_input = document.getElementById('zipcode-input');
const country_input = document.getElementById('country-input');
const language_input = document.getElementsByName('language');

const getSelectedLanguage = () => {
    for(let i = 0; i < language_input.length; i++){
        if(language_input[i].checked){
            return language_input[i].value;
        }
    }
}

const validateByLength = (value,min,max) => (value.length >= min && value.length <= max);

const validateByOnlyLetters = (value) => /^[a-zA-Z\s]*$/.test(value);

const validateByOnlyNumbers = (value) => /^[0-9]*$/.test(value);

// add event listener to submit button
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    // validate USERID
    if(!validateByLength(userid_input.value,5,12)){
        showErrors('userid');
        isValid = false;
    } else {
        hideErrors('userid');
    }
    // validate PASSWORD
    if(!validateByLength(password_input.value,7,12)){
        showErrors('password');
        isValid = false;
    } else {
        hideErrors('password');
    }
    // validate NAME
    if(!validateByLength(name_input.value,1,12) || !validateByOnlyLetters(name_input.value)){
        showErrors('name');
        isValid = false;
    } else {
        hideErrors('name'); 
    }
    // validate ZIPCODE
    if (!validateByOnlyNumbers(zipcode_input.value) || !validateByLength(zipcode_input.value,5,5)){
        showErrors('zipcode');
        isValid = false;
    } else {
        hideErrors('zipcode');
    }
    // validate COUNTRY
    if (country_input.value === '') {
        showErrors('country');
        isValid = false;
    } else {
        hideErrors('country');
    }
    // check if any errors occured
    isValid ? document.getElementById('success').style.display = 'block' : document.getElementById('success').style.display = 'none';
    // log the form data
    console.table([{'userid':userid_input.value, 'password':password_input.value, 'name':name_input.value, 'address':address_input.value, 'zipcode':zipcode_input.value, 'country':country_input.value, 'language':getSelectedLanguage()}]);
})


const showErrors = (id) => {
    document.getElementById(`${id}-error`).style.display = 'inline';
}

const hideErrors = (id) => {
    document.getElementById(`${id}-error`).style.display = 'none';
}