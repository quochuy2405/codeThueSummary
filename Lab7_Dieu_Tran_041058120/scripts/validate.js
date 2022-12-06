//validate module


function validateProfile(e){

    e.preventDefault();

    var valid=true;
// Section A – HTML Form - Use form.html
// 1) Please do not change the name attribute on the form elements
// example <input type=”text” name=”firstName”>


// 2) Use the corresponding span tag to display a warning message if the firstName element is
// empty when the form is submitted.

if(profile.firstName.value === ""){
    document.querySelector('#fNameError').innerHTML="*Please enter a First Name*";
        valid = false;
    }

// 3) Use the corresponding span tag to display a warning message if the lasttName element is
// empty when the form is submitted.
if(profile.lastName.value == ""){
    document.querySelector('#lnameError').innerHTML="*Please enter a Last Name*";
    valid=false;
}

// 4) Use the corresponding span tag to display a warning message if the address1 element is
// empty when the form is submitted.

if(profile.address1.value == ""){
    document.querySelector('#address1Error').innerHTML="*Please enter a Address *";
    valid=false;
}
// 5) Use the corresponding span tag to display a warning message if the city element is empty
// when the form is submitted.

if(profile.city.value == ""){
    document.querySelector('#cityError').innerHTML="*Please enter a city *";
    valid=false;
}

// 6) Use the corresponding span tag to display a warning message if a province has not been
// selected when the form is submitted.

if(profile.province.value == ""){
    document.querySelector('#provinceError').innerHTML="*Please choose a province*";
    valid=false;
}

// 7) Use the corresponding span tag to display a warning message if a country has not been
// selected when the form is submitted.
if(profile.country.value == ""){
    document.querySelector('#countryError').innerHTML="*Please choose a country*";
    valid=false;
}
//h. execute alert(“Thank you”) when the form is valid and return true.
if(valid){
    alert("Thank you!");
}
   return valid;
};
// 8) Feel free to be creative and add additional styles to the HTML page. Add your styles to scripts/
// val.css


function ClearAllData(e){
    fNameError.innerHTML="";
    lnameError.innerHTML="";
    address1Error.innerHTML="";
    address2Error.innerHTML="";
    provinceError.innerHTML="";
    countryError.innerHTML="";
}


