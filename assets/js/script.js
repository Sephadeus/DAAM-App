// make API requests to pull back random recipe filtered by specific cuisine type and dietary restrictions

var spoonacularApiUrl= 'https://api.spoonacular.com/food/products/search?query=yogurt&apiKey=API-KEY'
var spoonacularBaseApiUrl = 'https://api.spoonacular.com/'
var spoonacularApiKey = "3a719d472e46434aa2f953f1f40adfd0"


var getRandomRecipe = function (cuisine, intolerance) {
  var apiCall = spoonacularBaseApiUrl + 'recipes/random?number=1&tags=' + cuisine + ',' + intolerance + '&apiKey=' + spoonacularApiKey;

  fetch(apiCall)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        console.log(response.json());
      } else {
        alert('Error: ' + response.statusText);
      }
    })
};

getRandomRecipe("french", "gluten")

// make API requests to pul back info fitlered by movie genre
var omdbBaseApiUrl = "http://www.omdbapi.com/?i=tt3896198&apikey=4710c654"
var omdbApiKey = "4710c654"