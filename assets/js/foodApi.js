// make API requests to pull back random recipe filtered by specific cuisine type and dietary restrictions
var favoriteBtnEl = document.getElementById('save-to-favorites')
//var recipeCardEl = document.getElementById('recipe-card')
var recipeImageLinkEl = document.getElementById('recipe-image')
var recipeTitleEl = document.getElementById('recipe-title')
var recipeSummaryEl = document.getElementById('recipe-summary')
var recipeTimeEl = document.getElementById('recipe-time')
var recipeCusinesEl = document.getElementById('recipe-cuisines')
var recipeSourceLinkEl = document.getElementById('recipe-link')

var spoonacularBaseApiUrl = 'https://api.spoonacular.com/'
var spoonacularApiKey = "3a719d472e46434aa2f953f1f40adfd0"

// return an object with the relevant info, including recipe ID
var getRandomRecipe = function (cuisine, intolerance) {
  let spoonacularComplexSearch = 'recipes/complexSearch?sort=random&number=1'
  let apiCall = spoonacularBaseApiUrl + spoonacularComplexSearch + '&type=main+course' + '&intolerances=' + intolerance + '&cuisine=' + cuisine + '&apiKey=' + spoonacularApiKey;
  // console.log("getRandomRecipe API Call: " + apiCall)
  fetch(apiCall)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      alert('Error: ' + response.statusText);
    };
  })
  .then(async function (data) {
    // console.log('getRandomRecipe Response \n----------');
    // console.log(data);
    if(data.totalResults !== 0){
      var randomRecipeResults = data.results;
      var recipeId = randomRecipeResults[0].id;
      // console.log("Value of recipeId from getRandomRecipe: " + recipeId);
      await getRecipeInfo(recipeId);
    } else {
      // console.log("Recipe with specified criteria not found.")
    }
  });
};


var getRecipeInfo = async function (id) {
  let apiCall = spoonacularBaseApiUrl + '/recipes/' + id + '/information?includeNutrition=false&apiKey=' + spoonacularApiKey
  // console.log("getRecipeInfo API Call: " + apiCall)
  await fetch(apiCall)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      alert('Error: ' + response.statusText);
    };
  })
  .then(function (data) {
    // console.log('getRecipeInfo Response \n----------');
    var recipeObject = {
      title:        data.title,
      imageUrl:     data.image,
      sourceUrl:    data.sourceUrl,
      timeToMake:   data.readyInMinutes,
      summary:      data.summary,
      cuisineList:  data.cuisines,
      dietList:     data.diets
    };
    // console.log(recipeObject);
    return recipeObject;
  })
  .then(function(recipeObject){
    // console.log(recipeObject);
    renderRecipeCard(recipeObject);

    favoriteBtnEl.addEventListener('click', function(event) {
      event.preventDefault();
      if (event.target.matches('#save-to-favorites')){
        localStorage.removeItem("recipe")
        saveToStorage("recipe", recipeObject);
      } 
    },{once: true}); // remove event after run once
  });
};

var renderRecipeCard = function(apiObject){

  recipeImageLinkEl.setAttribute('src', apiObject.imageUrl);
  recipeTitleEl.innerText = apiObject.title;

  // split summary by '. ' (full stop and space) but retain . character
  var summarySplitArray = apiObject.summary.split(/(?<=\. )/)

  // select first 4 items from array
  var truncatedSummary = summarySplitArray.slice(0,3)
  // join on spaces into single string
  var formattedSummary = truncatedSummary.join(' ');
  recipeSummaryEl.innerHTML = formattedSummary;
  var timeTaken = "Total Time: " + apiObject.timeToMake + " minutes"
  recipeTimeEl.innerHTML = "<small>" + timeTaken + "</small>";

  // add spaces to cuisineList
  var listWithSpaces = apiObject.cuisineList.join(', ');
  recipeCusinesEl.innerHTML = "<small>" + "Cuisines: " + listWithSpaces + "</small>";

  recipeSourceLinkEl.setAttribute('href', apiObject.sourceUrl);
}

var saveToStorage = function(saveType, data){
  switch(saveType) {
    case "movie":
      localStorage.setItem("movie", JSON.stringify(data))
      break;
    case "recipe":
      localStorage.setItem("recipe", JSON.stringify(data))
      break;
  }
var storedMovie = JSON.parse(localStorage.getItem("movie"))
var storedRecipe = JSON.parse(localStorage.getItem("recipe"))

  if (storedMovie && storedRecipe) {
    var list = JSON.parse(localStorage.getItem("list")) || []
    list.push({
      "movie": storedMovie, "recipe": storedRecipe
    })
    localStorage.setItem("list", JSON.stringify(list))
  }
};

export { getRandomRecipe };