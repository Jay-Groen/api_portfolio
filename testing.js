function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data.name)
        console.log(data.types)
    });
}

fetchPokemon(1);