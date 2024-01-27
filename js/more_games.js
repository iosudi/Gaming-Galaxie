const searchParam = window.location.search;
const param = new URLSearchParams(searchParam);
const tag = param.get("tag");

async function getMoreGames() {
  $(".loading").removeClass("d-none");

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "761b8a3226msh868f0d927cb6ea4p117ef0jsn46d63d281712",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };
  try {
    const response = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${tag} `,
      options
    );
    const result = await response.json();

    showMoreGames(result);
    $(".loading").addClass("d-none");
  } catch (error) {
    console.log(error);
  }
}

function showMoreGames(gamesObject) {
  let cards = [];

  for (let i = 0; i < gamesObject.length; i++) {
    cards += `    <div class="col-md-4">
                <div class="games_cards">
                  <div class="card" onclick="showDetails(${gamesObject[i].id})">
                    <img
                      src="${gamesObject[i].thumbnail} "
                      class="card-img-top"
                      alt="..."
                    />
                    <div class="card-body">
                      <h5 class="card-title">${gamesObject[i].title} </h5>
                      <p class="card-text">
                        ${gamesObject[i].short_description}
                      </p>
                      <div class="spans d-flex justify-content-between border-top pt-3">
                        <span>${gamesObject[i].genre} </span>
                        <span>${gamesObject[i].platform}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`;

    $(".container .gamesData").html(cards);
  }
}

//handle games details page
function showDetails(ID) {
  $(window).attr("location", `./game_details.html?id=${ID}`);
}
//handle login icon
const loginIcon = $("nav .user_controls .profile_section .user");
const profileSection = $("nav .user_controls .profile_section");

loginIcon.click(() => {
  window.location.href = "./login_page.html";
});

if (localStorage.getItem("token")) {
  let username = JSON.parse(localStorage.getItem("username"));
  let lastName = JSON.parse(localStorage.getItem("lastName"));
  profileSection.html(`
    <i class="fa-solid fa-circle-user user"></i>
    <p class="mb-0">
      <span class="username_info fw-bold">${username} ${lastName}</span>
      | <span class="logoutBtn">Logout</span>
    </p>
  `);
  const logoutBtn = $(".logoutBtn");
  logoutBtn.on("click", () => {
    localStorage.removeItem("token");
    window.location.reload();
  });
} else {
  profileSection.html(`
    <i class="fa-solid fa-circle-user user"></i>
  `);

  $(".profile_section .user").click(() => {
    window.location.href = "./login_page.html";
  });
}
getMoreGames();

//handle dark/light theme

const themeIcon = $("nav .user_controls .fa-circle-half-stroke");

themeIcon.on("click", (e) => {
  if (themeIcon.hasClass("dark")) {
    $("html").attr("data-theme", "light");
    themeIcon.toggleClass("dark light");
    localStorage.setItem("theme", "light");
  } else if (themeIcon.hasClass("light")) {
    $("html").attr("data-theme", "dark");
    themeIcon.toggleClass("light dark");
    localStorage.setItem("theme", "dark");
  }
});

if (localStorage.getItem("theme") != null) {
  const themeData = localStorage.getItem("theme");

  if (themeData == "light") {
    themeIcon.toggleClass("light dark");
  } else {
    themeIcon.toggleClass("dark light");
  }
  $("html").attr("data-theme", themeData);
}
