fetch("movies.json")
    .then(response => response.json())
    .then(movies => {
        const trendingList = document.querySelector("#trending-list");
        const youMayLikeThisList = document.querySelector("#you-may-like-this-list");

        const trendingMovies = movies.filter(
            movie => movie.group === "trending"
        );
        const youMayLikeThisMovies = movies.filter(
            movie => movie.group === "youMayLikeThis"
        );

        function createMovieCard(movie) {
            return `
                <article class="movie-card">
                    <img class="movie-card__image" src="${movie.image}" alt="${movie.title}">
                    <h3 class="movie-card__title">${movie.title}</h3>
                    <div class="movie-card__info">
                        <span class="movie-card__year">${movie.year}</span>
                        <span class="movie-card__duration">${movie.duration}</span>
                    </div>
                </article>
            `;
        }

        trendingMovies.forEach(movie => {
            trendingList.innerHTML += createMovieCard(movie);
        });

        youMayLikeThisMovies.forEach(movie => {
            youMayLikeThisList.innerHTML += createMovieCard(movie);
        });
    })
    .catch(error => console.error("Ошибка загрузки movies.json:", error));


const scrollTopButton = document.querySelector(".scroll-top");

function toggleScrollTop() {
    const show = window.scrollY > 850;
    scrollTopButton.style.opacity = show ? "1" : "0";
    scrollTopButton.style.visibility = show ? "visible" : "hidden";
    scrollTopButton.style.transform = show ? "translateY(0)" : "translateY(10px)";
}

window.addEventListener("scroll", toggleScrollTop);
toggleScrollTop();

scrollTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelectorAll(".carousel").forEach(carousel => {
    const track = carousel.querySelector(".movie-grid");
    const prev = carousel.querySelector(".carousel__btn--prev");
    const next = carousel.querySelector(".carousel__btn--next");

    function updateButtons() {
        prev.disabled = track.scrollLeft <= 1;
        next.disabled =
            track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
    }

    function scrollByPage(direction) {
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        track.scrollBy({
            left: direction * (track.clientWidth + gap),
            behavior: "smooth"
        });
    }

    prev.addEventListener("click", () => scrollByPage(-1));
    next.addEventListener("click", () => scrollByPage(1));

    track.addEventListener("scroll", updateButtons);
    window.addEventListener("resize", updateButtons);

    new MutationObserver(updateButtons).observe(track, { childList: true });

    updateButtons();
});