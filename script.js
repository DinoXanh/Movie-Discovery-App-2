const movieList = document.getElementById("movieList");
const genreList = document.getElementById("genreList");
const search = document.getElementById("search");
const dark = document.getElementById("darkMode");

const modal = document.getElementById("modal");
const modalPoster = document.getElementById("modalPoster");
const modalTitle = document.getElementById("modalTitle");
const modalYear = document.getElementById("modalYear");
const modalDirector = document.getElementById("modalDirector");
const modalActors = document.getElementById("modalActors");
const modalDescription = document.getElementById("modalDescription");
const close = document.getElementById("close");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    dark.checked = true;
}

dark.addEventListener("change", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});

function showMovies(list) {

    movieList.innerHTML = "";

    if (list.length === 0) {

        movieList.innerHTML = `
            <div class="empty">
                Không tìm thấy phim.
            </div>
        `;

        return;
    }

    list.forEach(movie => {

        const card = document.createElement("div");

        card.className = "movie-card";

        card.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}">
            <div class="info">
                <h3>${movie.title}</h3>
                <p>${movie.year}</p>
            </div>
        `;

        card.addEventListener("click", () => openModal(movie));

        movieList.appendChild(card);

    });

}

const genres = [...new Set(movies.flatMap(movie => movie.genre))];

genres.forEach(g => {

    genreList.innerHTML += `
        <label>
            <input type="checkbox" value="${g}">
            ${g}
        </label>
    `;

});

function filterMovies() {

    const keyword = search.value.toLowerCase();

    const checked = [
        ...document.querySelectorAll("#genreList input:checked")
    ].map(cb => cb.value);

    const result = movies.filter(movie => {

        const matchName =
            movie.title.toLowerCase().includes(keyword);

        const matchGenre =
            checked.length === 0 ||
            checked.some(g => movie.genre.includes(g));

        return matchName && matchGenre;

    });

    showMovies(result);

}

search.addEventListener("input", filterMovies);

genreList.addEventListener("change", filterMovies);

function openModal(movie) {

    modalPoster.src = movie.poster;
    modalTitle.textContent = movie.title;
    modalYear.textContent = movie.year;
    modalDirector.textContent = movie.director;
    modalActors.textContent = movie.actors;
    modalDescription.textContent = movie.description;

    modal.style.display = "flex";

}

close.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (e) {

    if (e.target === modal) {

        modal.style.display = "none";

    }

}

showMovies(movies);
