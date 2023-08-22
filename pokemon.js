    const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100';

    // Function to fetch Pokemon data from the API
    async function fetchPokemonData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    }

    // Function to display the list of Pokemon
    function displayPokemonList(pokemonList) {
    const pokemonListDiv = document.getElementById('pokemonList');
    pokemonListDiv.innerHTML = '';

    pokemonList.forEach((pokemon, index) => {
        const listItem = document.createElement('div');
        listItem.innerHTML = `
        <p>${index + 1}. ${pokemon.name}</p>
        <button onclick="showDetails(${index})">View Details</button>
        <button onclick="downloadImage('${pokemon.url}')">Download Image</button>
        `;
        pokemonListDiv.appendChild(listItem);
    });
    }

    // Function to display the details modal for a specific Pokemon
    async function showDetails(index) {
    const pokemonList = await fetchPokemonData();
    const pokemon = pokemonList[index];
    const detailsModal = document.getElementById('detailsModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDetails = document.getElementById('modalDetails');

    modalTitle.textContent = `Details for ${pokemon.name}`;

    try {
        const response = await fetch(pokemon.url);
        const data = await response.json();
        const { sprites, height, weight } = data;

        modalImage.src = sprites.front_default;
        modalDetails.textContent = `Height: ${height / 10} m | Weight: ${weight / 10} kg`;
        detailsModal.style.display = 'block';
    } catch (error) {
        console.error('Error fetching Pokemon details:', error);
    }
    }

    // Function to download the image of a specific Pokemon
    async function downloadImage(url) {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const urlObject = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = urlObject;
        link.download = 'pokemon.png';
        link.click();
        URL.revokeObjectURL(urlObject);
    } catch (error) {
        console.error('Error downloading image:', error);
    }
    }

    // Initial function to load the Pokemon list when the page is loaded
    (async function () {
    const pokemonList = await fetchPokemonData();
    displayPokemonList(pokemonList);
    })();
