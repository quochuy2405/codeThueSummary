//form element events

// Section C – Events
// Create the following Event Handlers using scripts/event.js
// 1) Add an event to clear the warning message when the firstName is entered
document.querySelector("#fName").addEventListener("blur", function () {
  if (this.value !== "") {
    fNameError.innerHTML = "";
  }
});

// 2) Add an event to clear the warning message when the lastName is entered
document.querySelector("#lName").addEventListener("blur", function () {
  if (this.value !== "") {
    lNameError.innerHTML = "";
  }
});
// 3) Add an event to clear the warning message when the address1 is entered
document.querySelector("#address1").addEventListener("blur", function () {
  if (this.value !== "") {
    address1Error.innerHTML = "";
  }
});
// 4) Add an event to clear the warning message when the city is entered
document.querySelector("#city").addEventListener("blur", function () {
  if (this.value !== "") {
    cityError.innerHTML = "";
  }
});
// 5) Add an event to clear the warning message when the province is selected
document.querySelector('#province').addEventListener("click", function(){
    if(profile.province.options.selectedIndex !== -1){
        provinceError.innerHTML = "";
    }
});
// 6) Add an event to clear the warning message when the country is selected
document.querySelector('#country').addEventListener("click", function(){
    if(profile.country.options.selectedIndex !== -1){
        countryError.innerHTML = "";
    }
});
// Section D – Form Submit
// 1) Add a submit event to the form to invoke the validateProfile() method when the form is
// submitted
//Add a submit events
document.profile.addEventListener("submit", validateProfile);
document.profile.addEventListener("reset", ClearAllData);
