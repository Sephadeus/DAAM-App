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
  console.log("Query String: " + queryString);

  const formParams = new URLSearchParams(queryString);
  console.log(formParams.toString());

  const genre = formParams.get('genre');
  console.log("Genre: " + genre);

  const cuisine = formParams.get('cuisine');
  console.log("Cuisine: " + cuisine);

  const intolerance = formParams.getAll('intolerance');
  console.log("Intolerane: " + intolerance);

  // use this data to make api calls (placeholder)
  getRandomRecipe('french','gluten,dairy'); // inputs are cuisine, intolerances
  getRecipeInfo(649328); // input is the ID of the recipe, retrieved with getRandomRecipe()

  // call function to display info from API call in modal/pop-up box
  // placeholder
  //renderOutput();

};

formEl.addEventListener('submit', formSubmitHandler);