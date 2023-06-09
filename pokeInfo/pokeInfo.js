const pokemonContainer = document.querySelector(".pokemon-container-wide");
const spinner = document.querySelector("#spinner");

async function fetchPokemon(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
  const data = await res.json()
  return data
}

async function showPokemonData(id) {
  const data = await fetchPokemon(id)
  console.log(data)
  createPokemon(data);
}

async function createPokemon(pokemon) {
  const flipCard = document.createElement("div");
  flipCard.classList.add("card", "pokemon-card");
  flipCard.dataset.name = pokemon.name.toLowerCase()

  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");

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

  const infoDiv1 = document.createElement("div");

  await Promise.all(pokemon.abilities.map(async (ability) => {
    const res = await fetch(ability.ability.url);
    const data = await res.json()
    ability.data = data
  }))

  console.log(pokemon.abilities[0].ability.name)

  for (let i = 0; i < pokemon.abilities.length; i++) {
    const ability = document.createElement("p");
    ability.classList.add("ability");
    ability.textContent = pokemon.abilities[i].ability.name;
    infoDiv1.append(ability)
  }

  cardContainer.appendChild(infoDiv1)

  
  const infoDiv2 = document.createElement("div");

  const types = document.createElement("div")

  if(pokemon.types.length === 2){
    types.innerHTML = pokemon.types.reduce((type1, type2) => type1.type.name + " - " + type2.type.name)
    console.log(2)
  } else{
    types.innerHTML = pokemon.types[0].type.name
    console.log(1)
  }

  infoDiv2.append(types)

  infoDiv2.appendChild(progressBars(pokemon.stats));


  cardContainer.appendChild(infoDiv2)

  flipCard.appendChild(cardContainer);

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


const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const pokemon = urlParams.get('pokemon_id')


showPokemonData(pokemon)

