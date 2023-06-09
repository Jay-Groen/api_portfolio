const pokemonContainer = document.querySelector(".pokemon-container-multiple");
const spinner = document.querySelector("#spinner");

async function fetchAllPokemon() {
  spinner.style.display = "block";
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=1300`)
  const data = await res.json();


  await Promise.all(data.results.map(async (pokemon) => {
    const res = await fetch(pokemon.url)
    const data = await res.json()
    pokemon.data = data
  }))

  spinner.style.display = "none";
  return data
}

window.onload = async () => {
  const pokemons = await fetchAllPokemon()
  pokemons.results.forEach(async (pokemon) => {
    createPokemon(pokemon.data)
  })

  const input = document.querySelector("#search-pokemon-input")
  input.addEventListener("input", () => {

    document.querySelectorAll(".pokemon-card").forEach((pokemonCard) => {
      if (
        input.value.toLowerCase().split(" ").every((value) => pokemonCard.dataset.name.includes(value))
        || input.value == ""
      ) pokemonCard.classList.remove("hidden")
      else pokemonCard.classList.add("hidden")
    })
  })
}

function createPokemon(pokemon) {
  const flipCard = document.createElement("div");
  flipCard.classList.add("card", "pokemon-card");
  flipCard.dataset.name = pokemon.name.toLowerCase()

  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");

  flipCard.appendChild(cardContainer);

  const card = document.createElement("div");
  card.classList.add("pokemon-block");

  const spriteContainer = document.createElement("div");
  spriteContainer.classList.add("img-container");

  const sprite = document.createElement("img");
  sprite.src = pokemon.sprites.front_default;

  spriteContainer.appendChild(sprite);

  const number = document.createElement("p");
  number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

  const name = document.createElement("p");
  name.classList.add("name");
  name.textContent = pokemon.name;

  card.appendChild(spriteContainer);
  card.appendChild(number);
  card.appendChild(name);

  cardContainer.appendChild(card);

  flipCard.addEventListener("click", () => {
    window.location.href = `/pokeInfo/index.html?pokemon_id=${pokemon.id}`
  })

  pokemonContainer.appendChild(flipCard);
}

function progressBars(stats) {
  const statsContainer = document.createElement("div");
  statsContainer.classList.add("stats-container");

  for (let i = 0; i < 3; i++) {
    const stat = stats[i];

    const statPercent = stat.base_stat / 2 + "%";
    const statContainer = document.createElement("stat-container");
    statContainer.classList.add("stat-container");

    const statName = document.createElement("p");
    statName.textContent = stat.stat.name;

    const progress = document.createElement("div");
    progress.classList.add("progress");

    const progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");
    progressBar.setAttribute("aria-valuenow", stat.base_stat);
    progressBar.setAttribute("aria-valuemin", 0);
    progressBar.setAttribute("aria-valuemax", 200);
    progressBar.style.width = statPercent;

    progressBar.textContent = stat.base_stat;

    progress.appendChild(progressBar);
    statContainer.appendChild(statName);
    statContainer.appendChild(progress);

    statsContainer.appendChild(statContainer);
  }

  return statsContainer;
}

function typesPoku(types) {
  const typesContainer = document.createElement("div");
  typesContainer.classList.add("types-container");

  for (let i = 0; i < 3; i++) {
    const type = types[i];

    const typeContainer = document.createElement("type-container");
    typeContainer.classList.add("type-container");

    const typeName = document.createElement("p");
    typeName.textContent = type.types.name;

    typeContainer.appendChild(typeName);

    typesContainer.appendChild(typeContainer);
  }

  return typesContainer;
}

function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
