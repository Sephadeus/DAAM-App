// import functions
import { getRandomRecipe, getRecipeInfo} from './foodApi.js';
import { getRandomMovie} from './movieApi.js';

//const formEl = document.getElementById('user-choice-form');
const submitBtnEl = document.getElementById('submit-button');
var cuisineTypeEl = document.getElementById('cuisine-type');
var movieGenreEl = document.getElementById('movie-genre');

function intoleranceLister (state){

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


function formSubmitHandler (){
  var soyIntolerance = document.getElementById('soy').checked
  var glutenIntolerance = document.getElementById('gluten').checked
  var peanutIntolerance = document.getElementById('peanuts').checked
  var dairyIntolerance = document.getElementById('dairy').checked

  // object with true or false status of intolerance state for each option
  var intoleranceState = {
    soy: soyIntolerance,
    gluten: glutenIntolerance,
    peanut: peanutIntolerance,
    dairy: dairyIntolerance
  };


  var cuisine = cuisineTypeEl.value;
  var movieGenre = movieGenreEl.value;

  var intoleranceList = intoleranceLister(intoleranceState);
  console.log("intoleranceList type: " + typeof intoleranceList);

  console.log('cuisine: ' + cuisine)
  console.log('genre: ' + movieGenre)
  console.log('intolerances: ' + intoleranceList)
  // use this data to make api calls (placeholder)
  var randomRecipeId = getRandomRecipe(cuisine, intoleranceList); // inputs are cuisine, intolerances
  console.log("randomRecipeId: " + randomRecipeId)

  getRecipeInfo(randomRecipeId); // input is the ID of the recipe, retrieved with getRandomRecipe()
  console.log("movieGenre" + movieGenre)
  getRandomMovie(movieGenre);
  // call function to display info from API call in modal/pop-up box
  // placeholder
  //renderOutput();

};

submitBtnEl.addEventListener('click', formSubmitHandler);