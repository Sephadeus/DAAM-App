// make API requests to pull back random recipe filtered by specific cuisine type and dietary restrictions

var spoonacularBaseApiUrl = 'https://api.spoonacular.com/'
var spoonacularApiKey = "3a719d472e46434aa2f953f1f40adfd0"

// TODO: return an object with the relevant info, including recipe ID
var getRandomRecipe = function (cuisine, intolerance) {
  let spoonacularComplexSearch = 'recipes/complexSearch?sort=random&number=1'
  let apiCall = spoonacularBaseApiUrl + spoonacularComplexSearch + '&intolerances=' + intolerance + '&cuisine=' + cuisine + '&apiKey=' + spoonacularApiKey;
  //console.log("getRandomRecipe API Call: " + apiCall)
  fetch(apiCall)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      alert('Error: ' + response.statusText);
    };
  })
  .then(async function (data) {
    console.log('getRandomRecipe Response \n----------');
    console.log(data);
    if(data.totalResults !== 0){
      var randomRecipeResults = data.results;
      var recipeId = randomRecipeResults[0].id;
      //console.log("Value of recipeId from getRandomRecipe: " + recipeId);
      await getRecipeInfo(recipeId);
    } else {
      console.log("Recipe with specified criteria not found.")
    }
  });
};


var getRecipeInfo = async function (id) {
  let apiCall = spoonacularBaseApiUrl + '/recipes/' + id + '/information?includeNutrition=false&apiKey=' + spoonacularApiKey
  console.log("getRecipeInfo API Call: " + apiCall)
  await fetch(apiCall)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      alert('Error: ' + response.statusText);
    };
  })
  .then(function (data) {
    console.log('getRecipeInfo Response \n----------');
    var recipeObject = {
      title:        data.title,
      imageUrl:     data.image,
      sourceUrl:    data.sourceUrl,
      timeToMake:   data.readyInMinutes,
      summary:      data.summary,
      cuisineList:  data.cuisines,
      dietList:     data.diets
    };
    console.log(recipeObject);
    return recipeObject;
  })
};


export { getRandomRecipe };