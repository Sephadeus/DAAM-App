
git document.body.onload = generateFavoriteCard;
function generateFavoriteCard(){
    var placeholderText = document.getElementById("placeholder-text");
        placeholderText.parentNode.removeChild(placeholderText);

    var movie = document.createElement('p');
    document.getElementById("movie-title").appendChild(movie);
        // localStorage.setItem('movie', 'legally blonde');
            document.getElementById("movie-title").innerHTML = 
                "Movie: " + localStorage.getItem('movie');


    var meal = document.createElement("p");
    document.getElementById("meal-title").appendChild(meal);
        // localStorage.setItem('meal','chicken parm');
            document.getElementById('meal-title').innerHTML = 
                "Meal: " + localStorage.getItem('meal');


     var movieImage = document.createElement('img');
    //  image.src = 
     movieImage.setAttribute("src", chosenMovieObj.poster);
     document.getElementById("favorites").appendChild(movieImage);

     var mealImage = document.createElement('img');
     //image.src = 
     document.getElementById("favorites").appendChild(mealImage);

      
};






















