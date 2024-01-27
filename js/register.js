const age = $("#ageInput");
const firstName = $("#firstNameInput");
const lastName = $("#lastNameInput");
const email = $("#emailInput");
const password = $("#password");
const submitBtn = $("#submit");

async function storeAccount() {
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

function validateInputs() {
  if (!isValidFirstName()) {
    firstName.addClass("is-invalid");
    firstName.removeClass("is-valid");
  } else {
    firstName.removeClass("is-invalid");
    firstName.addClass("is-valid");
  }

  if (!isValidLastName()) {
    lastName.addClass("is-invalid");
    lastName.removeClass("is-valid");
  } else {
    lastName.removeClass("is-invalid");
    lastName.addClass("is-valid");
  }

  if (!isValidEmail()) {
    email.addClass("is-invalid");
    email.removeClass("is-valid");
  } else {
    email.removeClass("is-invalid");
    email.addClass("is-valid");
  }

  if (!isValidPassword()) {
    password.addClass("is-invalid");
    password.removeClass("is-valid");
  } else {
    password.removeClass("is-invalid");
    password.addClass("is-valid");
  }

  if (!isValidAge()) {
    age.addClass("is-invalid");
    age.removeClass("is-valid");
  } else {
    age.removeClass("is-invalid");
    age.addClass("is-valid");
  }

  if (
    isValidFirstName() &&
    isValidLastName() &&
    isValidEmail() &&
    isValidPassword() &&
    isValidAge()
  ) {
    storeAccount();
  }
}

function isValidFirstName() {
  return /^[A-Za-z]{3,10}$/.test(firstName.val().toLowerCase());
}

function isValidLastName() {
  return /^[A-Za-z]{3,10}$/.test(lastName.val().toLowerCase());
}

function isValidEmail() {
  return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
    email.val().toLowerCase()
  );
}

function isValidPassword() {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password.val());
}

function isValidAge() {
  return /^([1-7][0-9]|80)$/.test(age.val());
}

submitBtn.on("click", (e) => {
  e.preventDefault();
  validateInputs();
});

if (localStorage.getItem("theme") != null) {
  const themeData = localStorage.getItem("theme");

  $("html").attr("data-theme", themeData);
}
