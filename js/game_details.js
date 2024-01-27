const searchParam = window.location.search;
const param = new URLSearchParams(searchParam);
const id = param.get("id");

async function getMoreGames() {
  $(".loading").removeClass("d-none");

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "f11a8a6738mshc814f0864a493d1p1baf61jsn7feadfc6f8e3",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
      options
    );
    const result = await response.json();
    showMoreGames(result);
    console.log(result);
    $(".loading").addClass("d-none");
  } catch (error) {
    console.error(error);
  }
}

function showMoreGames(gamesObject) {
  let cards = [];

  cards = `   <div class="col-md-12">
          <h2 class="name">${gamesObject.title} </h2>
        </div>
        <div class="col-md-12 thumbnail-col w-75">
          <div class="row">
            <div class="col-md-12">
              <div
                class="img_thumbnail main-img"
                style="background: url('${gamesObject.screenshots[0].image}'); background-size: cover"
              ></div>
            </div>
            <div class="row g-2 gap-4 justify-content-center">
              <div
                class="col-md-4 img_thumbnail small_img"
                style="background: url('${gamesObject.screenshots[0].image}'); background-size: cover"
                onclick="hello(${gamesObject.screenshots[0].image})"
              ></div>
              <div
                class="col-md-4 img_thumbnail small_img"
                style="background: url('${gamesObject.screenshots[1].image}'); background-size: cover"
                onclick="hello(${gamesObject.screenshots[1].image})"

              ></div>
              <div
                class="col-md-4 img_thumbnail small_img"
                style="background: url('${gamesObject.screenshots[2].image}'); background-size: cover"
                onclick="hello(${gamesObject.screenshots[2].image})"

              ></div>
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="game_description">
           ${gamesObject.description} 
          </div>
        </div>
        <div class="col-md-12">
          <div class="genres px-4">
            <h6>Genres</h6>
            <p>${gamesObject.genre} </p>
          </div>
        </div>
        <div class="col-md-12">
          <div class="min_req py-5 px-5 d-flex flex-column gap-3">
            <h2>Minimum requirements</h2>
            <div class="os">
              <p class="fw-bold">OS</p>
              <p>${gamesObject.minimum_system_requirements.os} </p>
            </div>
            <div class="cpu">
              <p class="fw-bold">Processor</p>
              <p>${gamesObject.minimum_system_requirements.processor}</p>
            </div>
            <div class="gpu">
              <p class="fw-bold">Graphics</p>
              <p>${gamesObject.minimum_system_requirements.graphics}</p>
            </div>
            <div class="ram">
              <p class="fw-bold">Memory</p>
              <p>${gamesObject.minimum_system_requirements.memory}</p>
            </div>
            <div class="storage">
              <p class="fw-bold">Storage</p>
              <p>${gamesObject.minimum_system_requirements.storage}</p>
            </div>
          </div>
        </div>`;

  $(".container .gameDetails").html(cards);
  $("#details-bg").css(
    "background",
    ` linear-gradient(var(--opacity-color), var(--opacity-color)), url("${gamesObject.thumbnail}")`
  );
  $("#details-bg").css("background-size", "cover");
  let smallImage = Array.from($(".container .small_img"));
  const mainImg = $(".container .main-img");

  smallImage.forEach((thumbnail) => {
    $(thumbnail).on("click", (e) => {
      const image = $(e.target).css("background-image");
      mainImg.css("background", `${image} `);
      mainImg.css("background-size", "cover");
    });
  });
}

// image focus

getMoreGames();

if (localStorage.getItem("theme") != null) {
  const themeData = localStorage.getItem("theme");

  $("html").attr("data-theme", themeData);
}
