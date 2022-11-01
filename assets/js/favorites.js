
document.body.onload = generateFavoriteCard;
function generateFavoriteCard(){
 /*   var placeholderText = document.getElementById("placeholder-text");
        console.log("placeholder text: " + placeholderText);
        console.log("Parent Node of placeholder: " + placeholderText.parentNode());
        placeholderText.parentNode.removeChild(placeholderText); */
let pairList = JSON.parse(localStorage.getItem("list"));

for (let i = 0; i < pairList.length; i++) {
console.log(pairList)
    var movie = document.createElement('p');
    document.getElementById("movie-title").appendChild(movie);
        // localStorage.setItem('movie', 'legally blonde');
            document.getElementById("movie-title").innerHTML = 
               // "Movie: " + localStorage.getItem('movie');
               "Movie: " + pairList[i].movie.title;


    var meal = document.createElement("p");
    document.getElementById("meal-title").appendChild(meal);
        // localStorage.setItem('meal','chicken parm');
            document.getElementById('meal-title').innerHTML = 
               // "Meal: " + localStorage.getItem('meal');
               "Meal: " + pairList[i].recipe.title;



     var movieImage = document.createElement('img');
    //  image.src = 
     movieImage.setAttribute("src", pairList[i].movie.poster);
     document.getElementById("favorites").appendChild(movieImage);

     var mealImage = document.createElement('img');
     mealImage.setAttribute("src", pairList[i].recipe.imageURL);
     document.getElementById("favorites").appendChild(mealImage);
}
      
};






















