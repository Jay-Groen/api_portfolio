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
  const flipcard = createElement('div', ['card', 'pokemon-card'])
  flipCard.dataset.name = pokemon.name.toLowerCase()


  const cardContainer = createElement('div', ['poke-info']);
  const card = createElement("div");
  const spriteContainer = createElement('div', ['img-container']); 

  const sprite = createElement("img");
  sprite.src = pokemon.sprites.front_default;

  spriteContainer.appendChild(sprite);

  const number = createElement("p", [], `#${pokemon.id.toString().padStart(3, 0)}`);

  const name = createElement("p", ["name"], pokemon.name);

  card.appendChild(spriteContainer);
  card.appendChild(number);
  card.appendChild(name);

  cardContainer.appendChild(card);

  const infoDiv1 = document.createElement("div");
  infoDiv1.classList.add("ability-container");

  await Promise.all(pokemon.abilities.map(async (ability) => {
    const res = await fetch(ability.ability.url);
    const data = await res.json()
    ability.data = data
  }))

  console.log(pokemon.abilities[0].ability.name)

  for (let i = 0; i < pokemon.abilities.length; i++) {
    const ability = document.createElement("p");
    ability.classList.add("ability");
    ability.textContent = `Ability ${i + 1}: ` + pokemon.abilities[i].ability.name;
    infoDiv1.append(ability)
  }

  cardContainer.appendChild(infoDiv1)

  
  const infoDiv2 = document.createElement("div");

  const types = document.createElement("div")
  types.innerHTML = pokemon.types.reduce((type1, type2) => type1.type.name + " - " + type2.type.name)
  
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

