mainEl = document.querySelector('main')

var favorites = localStorage.getItem('list');

var favoritesObj = JSON.parse(favorites);

var renderFavorites = function(favoritesList){

  for (let i = 0; i < favoritesList.length; i++) {

    var recipe = favoritesList[i].recipe
    var movie = favoritesList[i].movie
  
    // split summary by '. ' (full stop and space) but retain . character
    var recipeSummarySplitArray = recipe.summary.split(/(?<=\. )/)
    // select first 4 items from array
    var recipeTruncatedSummary = recipeSummarySplitArray.slice(0,3)
    // join on spaces into single string
    var recipeFormattedSummary = recipeTruncatedSummary.join(' ');

    var recipeTimeTaken = "Total Time: " + recipe.timeToMake + " minutes"

    // add spaces to cuisineList
    var cuisineListWithSpaces = recipe.cuisineList.join(', ');
    var cuisineListItem = "Cuisines: " + cuisineListWithSpaces;

    var movieScoreContent = "Vote Average: " + movie.score;
    var releaseDateContent = "Released: " + movie.releaseDate;

    var imdbURLRef = 'https://www.imdb.com/title/' +  movie.imdbID + '/?ref_=nv_sr_srsg_0';

    var favoriteContainer = document.createElement('div');
    favoriteContainer.setAttribute('class', 'container');
    favoriteContainer.setAttribute('id', "favorite-item-" + (i + 1));
    mainEl.appendChild(favoriteContainer);

    favoriteContainer.innerHTML = `
    <div class="p-2 fs-4" id="favorite${i + 1}">Favorite ${i + 1}</div>
    <div class="row d-flex p-4 bg-secondary border border-light border-2 rounded-4 align-items-center justify-content-center">
      <!-- Card 1 -->
      <div class="card bg-secondary col-sm-12 col-md-6 border-0" id="movie-card${i + 1}" >
        <div class="row g-0">
          <div class="col-md-4 mt-4">
            <img src="${movie.poster}" class="img-fluid rounded mx-auto d-block" alt="moive poster" id ="movie-image${i + 1}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h3 class="card-title" id="movie-title${i + 1}">${movie.title}</h3>
              <p class="card-text" id="movie-overview${i + 1}">${movie.overview}</p>
              <p class="card-text m-0" id="movie-score${i + 1}">
                <small>${movieScoreContent}</small>
              </p>
              <p class="card-text m-0" id="movie-release-date${i + 1}">
                <small>${releaseDateContent}</small>
              </p>
            </div>
            <div class="card-body">
              <!-- target="_blank" needed so that link opens in new tab (not same page)-->
              <a href="${imdbURLRef}" target="_blank" class="btn btn-primary" id="movie-link">Read More</a>
            </div>
          </div>
        </div>
      </div>
      <!-- Card 2 -->
      <div class="card bg-secondary col-sm-12 col-md-6 border-0" id="recipe-card${i + 1}" >
        <div class="row g-0">
          <div class="col-md-4 mt-4">
            <img src="${recipe.imageUrl}" class="img-fluid rounded mx-auto d-block" alt="image of meal" id="recipe-image${i + 1}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h3 class="card-title" id="recipe-title${i + 1}">${recipe.title}</h3>
              <p class="card-text" id="recipe-summary${i + 1}">${recipeFormattedSummary}</p>
              <p class="card-text m-0" id="recipe-time${i + 1}">
                <small>${recipeTimeTaken}</small>
              </p>
              <p class="card-text m-0" id="recipe-cuisines${i + 1}">
                <small>${cuisineListItem}</small>
              </p>
            </div>
            <div class="card-body">
              <!-- target="_blank" needed so that link opens in new tab (not same page)-->
              <a href="${recipe.sourceUrl}" target="_blank" class="btn btn-primary" id="recipe-link">Read More</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;

    // favoriteContainer.innerHTML = `
    // <div class="p-2 fs-4" id="favorite${i + 1}">Favorite ${i + 1}</div>
    // <div class="row d-flex p-4 border border-light border-3 rounded-4 align-items-center justify-content-center">
    //   <div class="card-group">
    //     <!-- Card 1 -->
    //     <div class="card" id="movie-card${i + 1}">
    //       <img src="${movie.poster}" class="card-img-top img-fluid" alt="moive poster" id="movie-image${i + 1}">
    //       <div class="card-body">
    //         <h5 class="card-title"id="movie-title${i + 1}">${movie.title}</h5>
    //         <p class="card-text"id="movie-overview${i + 1}">${movie.overview}</p>
    //         <p class="card-text m-0" id="movie-score${i + 1}">
    //           <small>${movieScoreContent}</small>
    //         </p>
    //         <p class="card-text m-0" id="movie-release-date${i + 1}">
    //           <small>${releaseDateContent}</small>
    //         </p>
    //       </div>
    //       <div class="card-footer">
    //         <a href="${imdbURLRef}" target="_blank" class="btn btn-primary" id="movie-link">Read More</a>
    //       </div>
    //     </div>
    //     <!-- Card 2 -->
    //     <div class="card" id="recipe-card${i + 1}">
    //       <img src="${recipe.imageUrl}" class="card-img-top img-fluid" alt="moive poster" id="recipe-image${i + 1}">
    //       <div class="card-body">
    //         <h5 class="card-title"id="recipe-title${i + 1}">${recipe.title}</h5>
    //         <p class="card-text"id="recipe-summary${i + 1}">${recipeFormattedSummary}</p>
    //         <p class="card-text m-0" id="recipe-time${i + 1}">
    //           <small>${recipeTimeTaken}</small>
    //         </p>
    //         <p class="card-text m-0" id="recipe-release-cuisine${i + 1}">
    //           <small>${cuisineListItem}</small>
    //         </p>
    //       </div>
    //       <div class="card-footer">
    //         <a href="${recipe.sourceUrl}" target="_blank" class="btn btn-primary" id="movie-link">Read More</a>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    // `;
  };
}

renderFavorites(favoritesObj);

function clearFavorites() {
  localStorage.clear();
  location.reload();
}



















