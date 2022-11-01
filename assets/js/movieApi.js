// make API requests to pull back a random movie from the highest rated movies of the genre chosen by the user
var favoriteBtnEl = document.getElementById('save-to-favorites')
// TODO: return an object with the relevant info
const getRandomMovie = function (genre) {
  // console.log(genre);
  let genreLibrary;


  const movieImgEl = document.getElementById("movie-image");
  const movieTitleEl = document.getElementById("movie-title");
  const movieOverviewEl = document.getElementById("movie-overview");
  const movieGenreEl = document.getElementById("movie-genre");
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
      console.log(data);
      let dataVar = data;
      console.log(dataVar)
     // var genreLibrary = dataVar.slice(0, data.length - 1);
     genreLibrary = dataVar.genres;
      console.log(genreLibrary)
     // console.log("Genre Library " + genreLibrary);

      for (let i = 0; i < data.genres.length; i++) {
        console.log("i: " + i)
        console.log(data.genres[i]);

        if (data.genres[i].name == genre) {
          console.log("Name of genre at given index: " + data.genres[i].name)
          chosenGenreID = data.genres[i].id;
          console.log("The matching genre ID: " + chosenGenreID);
          return chosenGenreID;
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
          var resultsArr = data.results;
          console.log("Array of returned results: " + resultsArr);
          var possibleRecs = [];

          for (let i = 0; i < resultsArr.length; i++) {
            if (
              resultsArr[i].hasOwnProperty("genre_ids") &&
              resultsArr[i]["genre_ids"].includes(genreID) &&
              resultsArr[i]["vote_average"] >= 5
            ) {
              console.log("Genre ID's of particular movie iterated: " + resultsArr[i].genre_ids);
              console.log("All data about movie from the API:" + resultsArr[i]);
              possibleRecs.push(i);
            }
          }
          var randomMod = 0;
          randomMod = Math.floor(Math.random() * possibleRecs.length);
          console.log("Array of possible recommendations: " + possibleRecs)
          console.log("Random modifier variable, which generates a random number within the range to use as : " + randomMod);
          console.log("Pick a random movie from the array of possible recommendations: " + possibleRecs[randomMod]);
          var theChosenMovieIndex = possibleRecs[randomMod];

          console.log(resultsArr)
          var chosenMovieObj = {};

          console.log("Returns the chosen movie's data: " + resultsArr[theChosenMovieIndex])
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

          console.log("Movie Poster URL" +chosenMovieObj.poster);

          console.log("Chosen movie object" + chosenMovieObj);

          return chosenMovieObj;
        })

        .then(function(obj){

        console.log("Object passed in as parameter" + obj)

            let detailSearchURL = 'https://api.themoviedb.org/3/movie/' + obj.id + '?api_key=' + tmdbApiKey + '&language=en-US';
            
            fetch(detailSearchURL)
            .then(function(response) {
              console.log(response)
              return response.json();
            })
            .then(function(data) {
              console.log("Data returned from API: " +data);

          let newMovieObject = {};
            newMovieObject.title =        data.title;
            newMovieObject.overview =     data.overview;
            newMovieObject.id =           data.id;
            newMovieObject.imdbID =       data.imdb_id;
            newMovieObject.score =        data.vote_average;
            newMovieObject.releaseDate =  data.release_date;
            newMovieObject.poster =       baseImgURL + data.poster_path;
            newMovieObject.backdrop =     baseImgURL + data.backdrop_path;
            newMovieObject.genre_ids =    obj.genre_ids;
            
            console.log(newMovieObject.genre_ids)
            console.log("New Movie Object: " + newMovieObject);
            
            movieImgEl.setAttribute("src", "");
            movieImgEl.setAttribute("src", newMovieObject.poster);
            
            movieTitleEl.textContent = "";
            movieTitleEl.textContent = newMovieObject.title;
            
            movieOverviewEl.textContent = "";
            movieOverviewEl.textContent = newMovieObject.overview;

            movieGenreEl.textContent = "";
              console.log(newMovieObject.genre_ids.length)
              console.log(genreLibrary);
              let objGenresIds = newMovieObject.genre_ids; 
              let genreNames = [];

            for (let i = 0; i < objGenresIds.length; i++){

              for (let j = 0; j < genreLibrary.length; j++){

                if (objGenresIds[i] == genreLibrary[j].id) {
                  genreNames.push(genreLibrary[j].name)
                  j = 0;
                  console.log(genreNames)
                  i++;
                } else {
                  j++;
                }
            }

            console.log(genreNames);
            return genreNames;
          }

            movieGenreEl.textContent = "";
            movieGenreContent = "Genre: " + genreNames;
            movieGenreEl.innerHTML = "<small>" + movieGenreContent + "</small>";

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
};

//console.log(chosenGenreID);

//getRandomMovie("Action");

export { getRandomMovie };
