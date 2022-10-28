// import functions
import { getRandomRecipe } from './foodApi.js';
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
 
  getRandomRecipe(cuisine, intoleranceList); // inputs are cuisine, intolerances

  getRandomMovie(movieGenre);
  // call function to display info from API call in modal/pop-up box
  // placeholder
  //renderOutput();

};

submitBtnEl.addEventListener('click', formSubmitHandler);