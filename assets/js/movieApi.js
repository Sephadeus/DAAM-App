// make API requests to pull back random recipe filtered by specific cuisine type and dietary restrictions

var tmdbBaseApiUrl = 'https://api.themoviedb.org/';
var tmdbApiKey = "6c357998608fdf506e7cd3aa5432c664"

// TODO: return an object with the relevant info
var getRandomMovie = function (genre) {

    let apiCall = 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + tmdbApiKey + '&language=en-US';

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

getRandomMovie();