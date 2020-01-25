const numberEl = document.getElementById("numbers");
const sCharEl = document.getElementById("special");
const lCaseEl = document.getElementById("lowerCase");
const uCaseEl = document.getElementById("upperCase");
const genPwBtn = document.getElementById("generateBtn");
const passwordLengthSlider = document.getElementById("cRange");
const sliderLengthDisplay = document.getElementById("sAmount");
const passwordOutputField = document.getElementById("generatedPass");
sliderLengthDisplay.innerHTML = passwordLengthSlider.value;

//Listen for input changes on the slider and display back to user.
passwordLengthSlider.addEventListener('input', function () {
    sliderLengthDisplay.innerHTML = passwordLengthSlider.value;
});

function getSelectedPasswordOptions() {
    const generatePasswordOptions = [
        {
            checked: numberEl.checked,
            charOptions: "1234567890"
        },
        {
            checked: sCharEl.checked,
            charOptions: "!'(&)*+,-.%/:;<=>?@][$^_`{|#}~"
        },
        {
            checked: lCaseEl.checked,
            charOptions: "QWERTYUIOPASDFGHJKLZXCVBNM".toLowerCase()
        },
        {
            checked: uCaseEl.checked,
            charOptions: "QWERTYUIOPASDFGHJKLZXCVBNM"
        }
    ];

    return generatePasswordOptions
        //Filter out options that are not checked.
        .filter(function(option) {return option.checked})
        //Map only the character options back in response.
        .map(function(option) {return option.charOptions});
}

function generateRandomPasswordFromLength(passwordLength) {
    let result = "";
    //Get the password options based on user's selections and join them into one string of options for random generation.
    const characterOptions = getSelectedPasswordOptions().join('');

    //If there are no character options selected then display an error to the user.
    if(!characterOptions) {
        alert('Please select at least one option to generate a random password.');
        return;
    }

    //Loop through length of password building a result string of randomly chosen characters based on user's input.
    for ( let z = 0; z < passwordLength; z++ ) {
        result += characterOptions.charAt(Math.floor(Math.random() * characterOptions.length));
    }

    return result;
}

genPwBtn.addEventListener("click", function(event) {
    //Prevents browser from refreshing
    event.preventDefault();
    //Get length of password
    const passwordLength = passwordLengthSlider.value;
    //Get the text area to output password into
    const passwordTextAreaOutput = passwordOutputField;
    //Generate password and put it into the HTML
    passwordTextAreaOutput.innerHTML = generateRandomPasswordFromLength(passwordLength);
});
