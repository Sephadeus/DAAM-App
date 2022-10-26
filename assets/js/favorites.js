


function generateFavorite(){
    var movieTitle = localStorage.getItem('movie');
    var mealTitle = localStorage.getItem('meal');
    var movieImg = localStorage.getItem ('movieImg');
    var mealImg = localStorage.getItem ('mealImg');

    document.getElementById('movie-title').value = movieTitle;
    document.getElementById ('meal-title').value = mealTitle;
    document.getElementById ('movie-img').value = movieImg;
    document.getElementById('meal-img').value = mealImg;
   
}
generateFavorite();



// document.getElementById('card-text').textContent = "Movie: " + value;
// document.getElementById ('meal-title1').textContent = "what's for dinner";

// var favorites = {
//     movie: "happy gilmore",
//     meal: "chicken parm",
// }

// var favoriteText = document.querySelector('.card-text');
// var moviePoster = document.querySelector('.bd-placeholder-img');


// window.localStorage.setItem('favorites', JSON.stringify(favorites));
// window.localStorage.getItem('favorites');
// JSON.parse(window.localStorage.getItem('favorites'));