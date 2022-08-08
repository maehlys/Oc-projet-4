function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const form = document.querySelector("form");
const formData = document.querySelectorAll(".formData");
const tournamentLbl = document.querySelector(".text-label");
const closeBtn = document.querySelector(".close");
const submitBtn = document.querySelector(".btn-submit");
const thankMsg = document.querySelector(".modal-thank");

// Form Elements
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const tournament = document.querySelector(`input[name="location"]`);
const cge = document.querySelector("#checkbox1");

//Ajout temporaire
//
const inputs = document.getElementById("reserve").elements;
const inputByIndex = inputs[0];
const inputFirstName = inputs["first"];
//
//Ajout temporaire

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal event
closeBtn.addEventListener("click", closeModal);
// close modal form
function closeModal() {
  modalbg.style.display = "none";
  form.reset();
  form.style.visibility = "visible";
  thankMsg.style.visibility = "hidden";
  submitBtn.setAttribute("value", "C'est parti");
}

// Regex
const emailRegExp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))+$/;
const nameRegExp = /[^0-9<>()\[\]\\.,;:\s@"][A-Za-z]{1,}/;
const birthdateRegExp =
  /[^A-Za-z<>()\[\]\\.,;:\s@"][0-9]{2}|[^A-Za-z<>()\[\]\\.,;:\s@"][0-9]{2}|[^A-Za-z<>()\[\]\\.,;:\s@"][0-9]{4}/;
const numberRegExp = /[^A-Za-z<>()\[\]\\.,;:\s@"][0-9]{0,}/;

// message succes & error
function messageSucces(field) {
  field.setAttribute("data-error-visible", "false");
  field.setAttribute("data-error", "");

  return true;
}

function messageError(field, message) {
  field.setAttribute("data-error-visible", "true");
  field.setAttribute("data-error", message);

  return false;
}

// verify firstname
formData[0].addEventListener("focusout", firstNameIsValid); // verify entry on type
function firstNameIsValid() {
  // console.log(inputFirstName.value);
  // console.log(inputFirstName.value.match(nameRegExp));
  if (firstName.value.match(nameRegExp)) {
    return messageSucces(formData[0]);
  }

  return messageError(formData[0], "Entrez un prénom valide.");
}

// verify firstname
// formData[0].addEventListener("focusout", firstNameIsValid); // verify entry on type
// function firstNameIsValid() {
//   // console.log(inputFirstName.value);
//   // console.log(inputFirstName.value.match(nameRegExp));
//   if (firstName.value.match(nameRegExp)) {
//     return messageSucces(formData[0]);
//   }

//   return messageError(formData[0], "Entrez un prénom valide.");
// }

// verify lastname
formData[1].addEventListener("focusout", lastNameIsValid); // verify entry on type
function lastNameIsValid() {
  if (lastName.value.match(nameRegExp)) {
    return messageSucces(formData[1]);
  }

  return messageError(formData[1], "Entrez un nom valide.");
}

// verify email
formData[2].addEventListener("focusout", emailIsValid); // verify entry on type
function emailIsValid() {
  if (email.value.match(emailRegExp)) {
    return messageSucces(formData[2]);
  }

  return messageError(formData[2], "Entrez un email valide.");
}

// verify birthdate
formData[3].addEventListener("focusout", birthdateIsValid); // verify entry on type
function birthdateIsValid() {
  // verify age limite from user input entry birthdate
  const today = new Date();
  const birthdateValue = new Date(birthdate.value);
  const todayYear = today.getFullYear();
  const userBirthYear = birthdateValue.getFullYear();
  const validDate = todayYear - 18;
  const birthDateisValid = validDate <= userBirthYear;
  if (birthdate.value.match(birthdateRegExp) || birthDateisValid) {
    return messageSucces(formData[3]);
  }

  return messageError(formData[3], "Entrez une date de naissance valide.");
}

// verify quantity
formData[4].addEventListener("focusout", quantityIsValid); // verify entry on type
function quantityIsValid() {
  if (quantity.value.match(numberRegExp)) {
    return messageSucces(formData[4]);
  }

  return messageError(formData[4], "Renseignez un nombre de tournoi.");
}

// verify checked radio button
formData[5].addEventListener("focusout", tournamentIsValid); // verify entry on type
function tournamentIsValid() {
  if (document.querySelector('input[name="location"]:checked') !== null) {
    return messageSucces(formData[5]);
  }

  return messageError(formData[5], "Sélectionnez une option.");
}

// verify checked cge checkbox
formData[6].addEventListener("focusout", cgeIsValid); // verify entry on check
function cgeIsValid() {
  if (cge.checked) {
    return messageSucces(formData[6]);
  }

  return messageError(
    formData[6],
    "Veuillez lire et accepter les conditions.."
  );
}

// validate modal form
submitBtn.addEventListener("click", validate);

// validate tournament selection
function validate(e) {
  // prevent closing modal & erasing user input data
  e.preventDefault();
  if (
    firstNameIsValid() &&
    lastNameIsValid() &&
    emailIsValid() &&
    birthdateIsValid() &&
    quantityIsValid() &&
    tournamentIsValid() &&
    cgeIsValid()
  ) {
    function thanksModal() {
      form.style.visibility = "hidden";
      submitBtn.setAttribute("value", "Fermer");
      submitBtn.style.visibility = "visible";
      thankMsg.style.visibility = "visible";
      submitBtn.addEventListener("click", closeModal);
    }
    thanksModal();
  } else {
    firstNameIsValid(),
      lastNameIsValid(),
      emailIsValid(),
      birthdateIsValid(),
      quantityIsValid(),
      tournamentIsValid(),
      cgeIsValid();
  }
}
