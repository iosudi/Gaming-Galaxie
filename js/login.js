const email = $("#emailInput");
const password = $("#password");
const submitBtn = $("#submit");

async function getAccount() {
  if (validEmail() && validPassword()) {
    const account = {
      email: email.val(),
      password: password.val(),
    };
    try {
      const response = await fetch(`https://movies-api.routemisr.com/signin`, {
        method: "post",
        body: JSON.stringify(account),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log(result);
      if (result.message === "success") {
        localStorage.setItem("token", JSON.stringify(result.token));
        localStorage.setItem(
          "username",
          JSON.stringify(result.user.first_name)
        );
        localStorage.setItem("lastName", JSON.stringify(result.user.last_name));
        $(window).attr("location", "./index.html");
      } else {
        $("#login_page .form .msg").text(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
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

email.on("input", validEmail);
password.on("input", validPassword);
submitBtn.on("click", (e) => {
  e.preventDefault();
  getAccount();
});

if (localStorage.getItem("theme") != null) {
  const themeData = localStorage.getItem("theme");

  $("html").attr("data-theme", themeData);
}
