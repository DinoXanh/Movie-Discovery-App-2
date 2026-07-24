const movieList=document.getElementById("movieList");
const genreList=document.getElementById("genreList");
const search=document.getElementById("search");
const dark=document.getElementById("darkMode");

dark.addEventListener("change",()=>{
    document.body.classList.toggle("dark");
});

function showMovies(list){

movieList.innerHTML="";

list.forEach(movie=>{

movieList.innerHTML+=`

<div class="movie-card">

<img src="${movie.poster}">

<div class="info">

<h3>${movie.title}</h3>

<p>${movie.year}</p>

</div>

</div>

`;

});

}

const genres=[...new Set(movies.flatMap(movie=>movie.genre))];

genres.forEach(g=>{

genreList.innerHTML+=`

<label>

<input type="checkbox" value="${g}">

${g}

</label><br>

`;

});

function filterMovies(){

const keyword=search.value.toLowerCase();

const checked=[

...document.querySelectorAll("#genreList input:checked")

].map(cb=>cb.value);

const result=movies.filter(movie=>{

const matchName=movie.title.toLowerCase().includes(keyword);

const matchGenre=

checked.length===0||

checked.some(g=>movie.genre.includes(g));

return matchName&&matchGenre;

});

showMovies(result);

}

search.addEventListener("input",filterMovies);

genreList.addEventListener("change",filterMovies);

showMovies(movies);
