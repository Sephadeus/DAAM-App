// make API requests to pull back a random movie from the highest rated movies of the genre chosen by the user

// TODO: return an object with the relevant info
const getRandomMovie = function (genre) {
  console.log(genre);
  const tmdbApiKey = "6c357998608fdf506e7cd3aa5432c664";

  const apiCall =
    "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
    tmdbApiKey +
    "&language=en-US";

  var chosenGenreID;
 // var chosenMovies = [];

  fetch(apiCall)
    .then(function (response) {
      if (response.ok) {
        //console.log(response);
        return response.json();
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .then(function (data) {
      console.log(data);
      var genreLibrary = data.genres;
      console.log(genreLibrary);

      for (let i = 0; i < genreLibrary.length; i++) {
        //console.log(genreLibrary[i]);

        if (genreLibrary[i].name == genre) {
          chosenGenreID = genreLibrary[i].id;
          console.log(chosenGenreID);
          return chosenGenreID;
        } else {
          i++;
        }
      }
      return chosenGenreID;
    })
    .then(function(genreID) {
      
    let tmdbSearchURL =
    "https://api.themoviedb.org/3/discover/movie?api_key=" +
    tmdbApiKey +
    "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&&with_original_language=en&with_genres=" +
    genreID;
  
    console.log(tmdbSearchURL);

  fetch(tmdbSearchURL)
    .then(function (response) {
      //console.log(response);
      return response.json();
    })
    .then(function (data) {
      //console.log(data);
      let resultsArr = data.results;
      console.log(resultsArr);
    var possibleRecs = [];


      for (let i = 0; i < resultsArr.length; i++) {
        if (
          resultsArr[i].hasOwnProperty("genre_ids") &&
          resultsArr[i]["genre_ids"].includes(genreID) &&
          resultsArr[i]["vote_average"] >= 5
        ) {
          //console.log(resultsArr[i].genre_ids);
          //console.log(resultsArr[i]);
          possibleRecs.push(i);
        } 
      
      }
    
        let randomMod = Math.floor(Math.random() * possibleRecs.length);
        console.log(possibleRecs)
        console.log(randomMod);
        console.log(possibleRecs[randomMod]);
        let theChosenMovieIndex = possibleRecs[randomMod];

        console.log(resultsArr)
          var chosenMovieObj = {};
          chosenMovieObj.title = resultsArr[theChosenMovieIndex].title;
          chosenMovieObj.overview = resultsArr[theChosenMovieIndex].overview;
          chosenMovieObj.id = resultsArr[theChosenMovieIndex].id;
          chosenMovieObj.poster = resultsArr[theChosenMovieIndex].poster_path;
          chosenMovieObj.backdrop = resultsArr[theChosenMovieIndex].backdrop_path;
          chosenMovieObj.releaseDate = resultsArr[theChosenMovieIndex].release_date;
          chosenMovieObj.vote_average = resultsArr[theChosenMovieIndex].vote_average;
          chosenMovieObj.genre_ids = resultsArr[theChosenMovieIndex].genre_ids;
          chosenMovieObj.id = resultsArr[theChosenMovieIndex].id;
          

          console.log(chosenMovieObj);
          //chosenMovies.push(chosenMovieObj);
          //console.log(chosenMovies);
          /* localStorage.setItem(
            "Movie Recommendation",
            JSON.stringify(chosenMovieObj) */
            return chosenMovieObj;
          });
        })
      }
    
  //console.log(chosenGenreID);
  


//getRandomMovie("Action");

export { getRandomMovie};
