
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const cards = document.querySelectorAll("#articlesContainer .card");

function filterArticles() {
    const searchText = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value.toLowerCase();

    cards.forEach(card => {

        const title = card.querySelector("h3").innerText.toLowerCase();
        const category = card.dataset.category.toLowerCase();

        const matchSearch = title.includes(searchText);
        const matchCategory = selectedCategory === "all" || category === selectedCategory;

        card.style.display = (matchSearch && matchCategory) ? "flex" : "none";
    });
}

searchInput.addEventListener(
"keyup",
filterArticles
);

categoryFilter.addEventListener(
"change",
filterArticles
);

function changePage(page){

    const articles = [
        [
            "Best Foods for a Healthy Pet",
            "Nutrition"
        ],
        [
            "Vaccinations: Why They Matter",
            "Health"
        ],
        [
            "Basic Training Tips for Puppies",
            "Training"
        ]
    ];

    alert(
    "Page "+page+
    " clicked. Add more articles for full pagination."
    );

}