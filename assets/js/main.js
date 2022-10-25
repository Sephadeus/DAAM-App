const chosenGenreEl = document.getElementById("movGenre");
var chosenGenre = String;

const intolerances = document.querySelectorAll("")
const rollDiceEl = document.getElementById("rollTheDice");
rollDiceEl.addEventListener("click", submitInput);


function submitInput(event) {
    event.preventDefault();
    chosenGenre = chosenGenreEl.value;
    intolerances = intoleranceEl.value;
    searchMovies(chosenGenre);
    searchRecipes();
    window.location.assign();
}

function searchMovies(genre) {
    var moviesAPI;
    fetch(response)
}
