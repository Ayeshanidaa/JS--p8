const API_KEY = "beeeefa952ac48969db4a361e5c1a315"; // Replace with your NewsAPI key
const BASE_URL = "https://newsapi.org/v2/top-headlines";

const categorySelect = document.getElementById("category");
const newsContainer = document.getElementById("news-container");

// Fetch news when the category changes
categorySelect.addEventListener("change", fetchNews);

// Fetch news on initial page load with the default category
window.addEventListener("load", () => {
    fetchNews();
});

async function fetchNews() {
    const category = categorySelect.value;
    const url = `${BASE_URL}?category=${category}&country=us&apiKey=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error("Error fetching news:", error);
        newsContainer.innerHTML = "<p>Failed to fetch news. Please try again later.</p>";
    }
}

function displayNews(articles) {
    newsContainer.innerHTML = ""; // Clear previous news
    articles.forEach(article => {
        if (!article.urlToImage || article.urlToImage === "null") {
            return; // Skip articles without a valid image
        }

        const newsCard = document.createElement("div");
        newsCard.className = "news-card";

        newsCard.innerHTML = `
            <img src="${article.urlToImage}" alt="News Image" onerror="this.src='https://via.placeholder.com/300';">
            <h2>${article.title}</h2>
            <p>${article.description || "No description available."}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;

        newsContainer.appendChild(newsCard);
    });
}
