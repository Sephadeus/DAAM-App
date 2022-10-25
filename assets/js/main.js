import { getRandomRecipe, getRecipeInfo } from './foodApi.js';

const formEl = document.getElementById('user-choice-form');

// const chosenGenreEl = document.getElementById('movie-genre');
// var chosenGenre = String;

// const intolerances = document.querySelectorAll('')
// const rollDiceEl = document.getElementById("rollTheDice");
// rollDiceEl.addEventListener("click", submitInput);


// function submitInput(event) {
//     event.preventDefault();
//     chosenGenre = chosenGenreEl.value;
//     intolerances = intoleranceEl.value;
//     searchMovies(chosenGenre);
//     searchRecipes();
//     window.location.assign();
// }

// function searchMovies(genre) {
//     var moviesAPI;
//     fetch(response)
// }

function formSubmitHandler (event){
  event.preventDefault();
  // handle the form data
  // collect the info from the form (query params from URL)
  const queryString = document.location.search;
  const formParams = new URLSearchParams(queryString);
  console.log(formParams);
  const genre = formParams.get('genre');
  const cuisine = formParams.get('cuisine');
  const intolerance = formParams.getAll('intolerance');

  // use this data to make api calls (placeholder)
  getRandomRecipe(); // inputs are cuisine, intolerances
  getRecipeInfo(); // input is the ID of the recipe, retrieved with getRandomRecipe()

  // call function to display info from API call in model/pop-up box
  // placeholder
  renderOutput();

};

formEl.addEventListener('submit', formSubmitHandler);