//games slider

let carouselWidth = $(".carousel-inner")[0].scrollWidth; // Use [0] to access the native DOM element
let cardWidth = $(".game").width();

let scrollPosition = 0;

$(".carousel-control-next").click(() => {
  let carousel = $(".carousel-inner");
  if (scrollPosition < carouselWidth - cardWidth * 4) {
    scrollPosition = scrollPosition + cardWidth + 45;
    carousel.animate({ scrollLeft: scrollPosition }, 600);
  }
});

$(".carousel-control-prev").click(() => {
  let carousel = $(".carousel-inner");
  if (scrollPosition > 0) {
    scrollPosition = scrollPosition - cardWidth;
    carousel.animate({ scrollLeft: scrollPosition }, 400);
  }
});

//change background on click

const mainBackgroundImage = $("#main .main-bg");
const gameThumbnail = Array.from($("#main .games .game"));
const games = [
  {
    Thumbnail: "imgs/games/LOL.png",
    game_name: "league of legends",
    description:
      "League of Legends is a team-based strategy game where two teams of five powerful champions face off to destroy the other's base. Choose from over 140 champions to make epic plays, secure kills, and take down towers as you battle your way to victory.",
    price: "FREE",
  },
  {
    Thumbnail: "imgs/games/control.png",
    game_name: "control",
    description:
      "A corruptive presence has invaded the Federal Bureau of Control…Only you have the power to stop it. The world is now your weapon in an epic fight to annihilate an ominous enemy through deep and unpredictable environments. Containment has failed, humanity is at stake. Will you regain control?",
    price: "18.99$",
  },
  {
    Thumbnail: "imgs/games/gurdians.jpg",
    game_name: "Guardians of the Galaxy",
    description:
      "You are Star-Lord. The fate of the galaxy and the Guardians is in your hands. Time to show the universe what you’re made of. You got this. Probably.",
    price: "59.99$",
  },
  {
    Thumbnail: "imgs/games/finals.jpeg",
    game_name: "The Finals",
    description:
      "Viewers at home, here's the news you've been waiting to hear: THE FINALS is accepting new contestants, and that means YOU! That's right, soon the world could be watching YOU tear apart our newest dynamic arenas and seize everlasting fame!",
    price: "FREE",
  },
  {
    Thumbnail: "imgs/games/stray.jpg",
    game_name: "stray",
    description:
      "Lost, alone and separated from family, a stray cat must untangle an ancient mystery to escape a long-forgotten city.",
    price: "14.99$",
  },
  {
    Thumbnail: "imgs/games/hogwarts.jpg",
    game_name: "hogwarts legacy",
    description:
      "Hogwarts Legacy is an open-world action RPG set in the world first introduced in the Harry Potter books. Embark on a journey through familiar and new locations as you explore and discover magical beasts, customize your character and craft potions, master spell casting, upgrade talents and become the wizard you want to be",
    price: "59.99$",
  },
];

for (var i = 0; i < gameThumbnail.length; i++) {
  $(gameThumbnail[i]).on("click", (e) => {
    let indexOfElement = gameThumbnail.indexOf(e.target);
    slideGame(indexOfElement);
    console.log(indexOfElement);
  });
}

function slideGame(index) {
  $("#main .game_name ").text(games[index].game_name);
  $("#main .game_description ").text(games[index].description);
  $("#main .price ").text(games[index].price);
  mainBackgroundImage.css("background-image", `url(${games[index].Thumbnail})`);
}

let currentIndex = 0;
function autoSlide() {
  if (currentIndex >= games.length) {
    currentIndex = 0;
  }
  currentIndex++;
  slideGame(currentIndex);
}

setInterval(autoSlide, 7000);
slideGame(0);

// Get Games

const gamesFilterSelector = $("#games_ select");

gamesFilterSelector.on("change", () => {
  $("#games_ .categories_name").text(gamesFilterSelector.val());
  getGames();
});

async function getGames() {
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
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${gamesFilterSelector.val()} `,
      options
    );
    const result = await response.json();

    console.log(result);
    showGameCard(result);
    $(".loading").addClass("d-none");
  } catch (error) {
    console.log(error);
  }
}

function showGameCard(gamesObject) {
  let cards = [];

  for (let i = 0; i < 8; i++) {
    cards += `    <div class="col-md-3">
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

    $("#games_ .gamesData").html(cards);
  }
}
getGames();

//get category on click
const categoryContainer = Array.from($("#games_categories .category"));
categoryContainer.forEach((category) => {
  $(category).on("click", (e) => {
    const category_tag = $(e.target).attr("data-category");
    $(window).attr("location", `./more_games.html?tag=${category_tag}`);
  });
});

// handle more games button
const moreGamesBtn = $("#games_ .see_more");
moreGamesBtn.on("click", () => {
  let tag = gamesFilterSelector.val();
  $(window).attr("location", `./more_games.html?tag=${tag}`);
});

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
