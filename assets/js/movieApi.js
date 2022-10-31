// make API requests to pull back a random movie from the highest rated movies of the genre chosen by the user
var favoriteBtnEl = document.getElementById('save-to-favorites')
// TODO: return an object with the relevant info
const getRandomMovie = function (genre) {
  // console.log(genre);

  const movieImgEl = document.getElementById("movie-image");
  const movieTitleEl = document.getElementById("movie-title");
  const movieOverviewEl = document.getElementById("movie-overview");
  const movieScoreEl = document.getElementById("movie-score");
  const movieReleaseEl = document.getElementById("movie-release-date");
  const movieLinkEl = document.getElementById("movie-link");

  const tmdbApiKey = "6c357998608fdf506e7cd3aa5432c664";

  const apiCall =
    "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
    tmdbApiKey +
    "&language=en-US";

  const baseImgURL = "https://image.tmdb.org/t/p/w500";
 

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
      // console.log(data);
      var genreLibrary = data.genres;
      // console.log(genreLibrary);
      console.log(genreLibrary);
      for (let i = 0; i < genreLibrary.length; i++) {
        //console.log(genreLibrary[i]);

        if (genreLibrary[i].name == genre) {
          chosenGenreID = genreLibrary[i].id;
          // console.log(chosenGenreID);
          return chosenGenreID;
        } else {
          i++;
        }
      }
      return chosenGenreID;
    })
    .then(function (genreID) {
      let tmdbSearchURL =
        "https://api.themoviedb.org/3/discover/movie?api_key=" +
        tmdbApiKey +
        "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&&with_original_language=en&with_genres=" +
        genreID;

      // console.log(tmdbSearchURL);

      fetch(tmdbSearchURL)
        .then(function (response) {
          //console.log(response);
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          let resultsArr = data.results;
          // console.log(resultsArr);
          var possibleRecs = [];

          for (let i = 0; i < resultsArr.length; i++) {
            if (
              resultsArr[i].hasOwnProperty("genre_ids") &&
              resultsArr[i]["genre_ids"].includes(genreID) &&
              resultsArr[i]["vote_average"] >= 5
            ) {
              console.log(resultsArr[i].genre_ids);
              console.log(resultsArr[i]);
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

          console.log(resultsArr[theChosenMovieIndex])
          chosenMovieObj.title = resultsArr[theChosenMovieIndex].title;
          chosenMovieObj.overview = resultsArr[theChosenMovieIndex].overview;
          chosenMovieObj.id = resultsArr[theChosenMovieIndex].id;
          chosenMovieObj.poster =
            baseImgURL + resultsArr[theChosenMovieIndex].poster_path;
          chosenMovieObj.backdrop =
            baseImgURL + resultsArr[theChosenMovieIndex].backdrop_path;
          chosenMovieObj.releaseDate =
            resultsArr[theChosenMovieIndex].release_date;
          chosenMovieObj.vote_average =
            resultsArr[theChosenMovieIndex].vote_average;
          chosenMovieObj.genre_ids = resultsArr[theChosenMovieIndex].genre_ids;
          chosenMovieObj.id = resultsArr[theChosenMovieIndex].id;

          console.log(chosenMovieObj.poster);

          console.log(chosenMovieObj);

          return chosenMovieObj;
        })

        .then(function(obj){

        console.log(obj)

            let detailSearchURL = 'https://api.themoviedb.org/3/movie/' + obj.id + '?api_key=' + tmdbApiKey + '&language=en-US';
            
            fetch(detailSearchURL)
            .then(function(response) {
              return response.json();
            })
            .then(function(data) {
              console.log(data);

          let newMovieObject = {};
            newMovieObject.title =        data.title;
            newMovieObject.overview =     data.overview;
            newMovieObject.id =           data.id;
            newMovieObject.imdbID =       data.imdb_id;
            newMovieObject.score =        data.vote_average;
            newMovieObject.releaseDate =  data.release_date;
            newMovieObject.poster =       baseImgURL + data.poster_path;
            newMovieObject.backdrop =     baseImgURL + data.backdrop_path;
            newMovieObject.genre_ids =    data.genre_ids;

            console.log(newMovieObject);
            movieImgEl.setAttribute("src", "");
            movieImgEl.setAttribute("src", newMovieObject.poster);
            
            movieTitleEl.textContent = "";
            movieTitleEl.textContent = newMovieObject.title;
            
            movieOverviewEl.textContent = "";
            movieOverviewEl.textContent = newMovieObject.overview;

            movieScoreEl.textContent = "";
            var movieScoreContent = "Vote Average: " + newMovieObject.score;
            movieScoreEl.innerHTML = "<small>" + movieScoreContent + "</small>";

            movieReleaseEl.textContent = "";
            var releaseDateContent = "Released: " + newMovieObject.releaseDate;
            movieReleaseEl.innerHTML = "<small>" + releaseDateContent + "</small>";
          
            let imdbURLRef = 'https://www.imdb.com/title/' +  newMovieObject.imdbID + '/?ref_=nv_sr_srsg_0';
            movieLinkEl.setAttribute("href", "");
            movieLinkEl.setAttribute("href", imdbURLRef);

            favoriteBtnEl.addEventListener('click', function(event) {
              event.preventDefault();
              if (event.target.matches('#save-to-favorites')){
                localStorage.removeItem("movie")
                saveToStorage("movie", newMovieObject);
              } 
            },{once: true}); // remove event after run once
            
            })
          })

          
        });
      };
    
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

//console.log(chosenGenreID);

//getRandomMovie("Action");

export { getRandomMovie };
