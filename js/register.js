const age = $("#ageInput");
const firstName = $("#firstNameInput");
const lastName = $("#lastNameInput");
const email = $("#emailInput");
const password = $("#password");
const submitBtn = $("#submit");

async function storeAccount() {
  if (
    validFirstName() &&
    validLastName() &&
    validEmail() &&
    validPassword() &&
    validAge()
  ) {
    const account = {
      first_name: firstName.val(),
      last_name: lastName.val(),
      email: email.val(),
      password: password.val(),
      age: age.val(),
    };
    try {
      const response = await fetch(`https://movies-api.routemisr.com/signup`, {
        method: "post",
        body: JSON.stringify(account),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log(result);
      if (result.message === "success") {
        $(window).attr("location", "./login_page.html");
      } else {
        $("#register_page .form .msg").text(result.errors.email.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

function validFirstName() {
  const firstName_val = firstName.val();
  let regex = /^[A-Za-z]{3,10}$/;

  if (regex.test(firstName_val.toLowerCase())) {
    firstName.addClass("is-valid");
    firstName.removeClass("is-invalid");
    return true;
  }
  firstName.addClass("is-invalid");
  firstName.removeClass("is-valid");
  return false;
}

function validLastName() {
  const lastName_val = lastName.val();
  let regex = /^[A-Za-z0-9_]{3,29}$/;

  if (regex.test(lastName_val.toLowerCase())) {
    lastName.addClass("is-valid");
    lastName.removeClass("is-invalid");
    return true;
  }
  lastName.addClass("is-invalid");
  lastName.removeClass("is-valid");
  return false;
}

function validEmail() {
  const email_val = email.val();
  let regex =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  if (regex.test(email_val.toLowerCase())) {
    email.addClass("is-valid");
    email.removeClass("is-invalid");
    return true;
  }
  email.addClass("is-invalid");
  email.removeClass("is-valid");
  return false;
}

function validPassword() {
  const password_val = password.val();
  let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (regex.test(password_val)) {
    password.addClass("is-valid");
    password.removeClass("is-invalid");
    return true;
  }
  password.addClass("is-invalid");
  password.removeClass("is-valid");
  return false;
}

function validAge() {
  const age_val = age.val();
  let regex = /^([1-7][0-9]|80)$/;
  if (regex.test(age_val.toLowerCase())) {
    age.addClass("is-valid");
    age.removeClass("is-invalid");
    return true;
  }
  age.addClass("is-invalid");
  age.removeClass("is-valid");
  return false;
}

firstName.on("input", validFirstName);
lastName.on("input", validLastName);
email.on("input", validEmail);
password.on("input", validPassword);
age.on("input", validAge);
submitBtn.on("click", (e) => {
  e.preventDefault();
  storeAccount();
});
