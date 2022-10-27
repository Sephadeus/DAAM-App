//import { getRandomRecipe, getRecipeInfo } from './foodApi.js';

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

  const cuisine = formParams.get('cuisine').toLowerCase();
  console.log("Cuisine: " + cuisine);

  const intolerance = formParams.getAll('intolerance');
  console.log("Intolerane: " + intolerance);

  // use this data to make api calls (placeholder)
  getRandomRecipe(cuisine,intolerance); // inputs are cuisine, intolerances
  
  getRecipeInfo(649328); // input is the ID of the recipe, retrieved with getRandomRecipe()

  // call function to display info from API call in modal/pop-up box
  // placeholder
  //renderOutput();

};

// make API requests to pull back random recipe filtered by specific cuisine type and dietary restrictions

var spoonacularBaseApiUrl = 'https://api.spoonacular.com/'
var spoonacularApiKey = "3a719d472e46434aa2f953f1f40adfd0"

// TODO: return an object with the relevant info, including recipe ID
var getRandomRecipe = function (cuisine, intolerance) {
  let spoonacularComplexSearch = 'recipes/complexSearch?sort=random&number=1'
  let apiCall = spoonacularBaseApiUrl + spoonacularComplexSearch + '&intolerances=' + intolerance + '&cuisine=' + cuisine + '&apiKey=' + spoonacularApiKey;

  fetch(apiCall)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        alert('Error: ' + response.statusText);
      };
    })
    .then(function (data) {
      console.log('getRandomRecipe Response \n----------');
      console.log(data);
    })
};



var getRecipeInfo = function (id) {
  let apiCall = spoonacularBaseApiUrl + '/recipes/' + id + '/information?includeNutrition=false&apiKey=' + spoonacularApiKey

  fetch(apiCall)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      alert('Error: ' + response.statusText);
    };
  })
  .then(function (data) {
    console.log('getRecipeInfo Response \n----------');
    console.log(data);
  })
};


formEl.addEventListener('submit', formSubmitHandler);