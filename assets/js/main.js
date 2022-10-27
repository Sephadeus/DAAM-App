const formEl = document.getElementById('user-choice-form');
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



submitBtnEl.addEventListener('click', formSubmitHandler);