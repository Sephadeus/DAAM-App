//import { getRandomRecipe, getRecipeInfo } from './foodApi.js';

const formEl = document.getElementById('user-choice-form');
const submitBtnEl = document.getElementById('submit-button');
var cuisineTypeEl = document.getElementById('cuisine-type');
var movieGenreEl = document.getElementById('movie-genre');



// Object.entries(intoleranceState).forEach(entry => {
//   const [key, value] = entry;
//   var intoleranceList = []
//   if (value) {
//     intoleranceList.push[key]
//   }
// })

function intoleranceLister (state){
  // for (let i = 0; i < state.length; i++) {
  //   const element = state[i];
    
  // }
  // for (let i in state){
  //   if
  // }
  var intoleranceList = []

  Object.entries(state).forEach(entry => {
    const [key, value] = entry;
    console.log(key, value)
    if (value == true) {
      intoleranceList.push(key)
    };
  });
  return intoleranceList
};


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

// make API requests to pull back random recipe filtered by specific cuisine type and dietary restrictions

var spoonacularBaseApiUrl = 'https://api.spoonacular.com/'
var spoonacularApiKey = "3a719d472e46434aa2f953f1f40adfd0"

// TODO: return an object with the relevant info, including recipe ID
function getRandomRecipe (cuisine, intolerance) {
  let spoonacularComplexSearch = 'recipes/complexSearch?sort=random&number=1'
  let apiCall = spoonacularBaseApiUrl + spoonacularComplexSearch + '&intolerances=' + intolerance + '&cuisine=' + cuisine + '&apiKey=' + spoonacularApiKey;
  console.log("getRandomRecipe API Call: " + apiCall)
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
      var recipeId = ''
      return recipeId
    })
};



function getRecipeInfo (id) {
  let apiCall = spoonacularBaseApiUrl + '/recipes/' + id + '/information?includeNutrition=false&apiKey=' + spoonacularApiKey
  console.log("getRecipeInfo API Call: " + apiCall)
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


function formSubmitHandler (){
  var soyIntolerance = document.getElementById('soy').checked
  var glutenIntolerance = document.getElementById('gluten').checked
  var peanutIntolerance = document.getElementById('peanut').checked
  var dairyIntolerance = document.getElementById('dairy').checked

  // object with true or false status of intolerance state for each option
  var intoleranceState = {
    soy: soyIntolerance,
    gluten: glutenIntolerance,
    peanut: peanutIntolerance,
    dairy: dairyIntolerance
  };
  //event.preventDefault();
  // handle the form data
  // collect the info from the form (query params from URL)
  // var queryString = document.location.search;
  // console.log("Query String: " + queryString);

  // var formParams = new URLSearchParams(queryString);
  // console.log(formParams.toString());

  // var genre = formParams.get('genre');
  // console.log("Genre: " + genre);

  // var cuisine = formParams.get('cuisine');
  // console.log("Cuisine: " + cuisine);

  // var intolerance = formParams.getAll('intolerance');
  // console.log("Intolerance: " + intolerance);

  var cuisine = cuisineTypeEl.value;
  var movieGenre = movieGenreEl.value;

  var intoleranceList = intoleranceLister(intoleranceState);
  console.log("intoleranceList type: " + typeof intoleranceList);

  console.log('cuisine: ' + cuisine)
  console.log('genre: ' + movieGenre)
  console.log('intolerances: ' + intoleranceList)
  // use this data to make api calls (placeholder)
  getRandomRecipe(cuisine, intoleranceList); // inputs are cuisine, intolerances
  getRecipeInfo(649328); // input is the ID of the recipe, retrieved with getRandomRecipe()

  // call function to display info from API call in modal/pop-up box
  // placeholder
  //renderOutput();

};


//formEl.addEventListener('click', formSubmitHandler);
submitBtnEl.addEventListener('click', formSubmitHandler);