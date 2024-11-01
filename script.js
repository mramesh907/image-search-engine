const key = "7Ge3mjePdk_MiQWp11Ej-2DJFZyeKxP4XP5PEuLAREw";
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resultsContainer = document.getElementById("search-result");
const showMore = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchInput.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${key}&per_page=12`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const results = data.results;
        if(page===1){
            resultsContainer.innerHTML = "";
        }
        // Display each image
        results.forEach((result) => {
            const image = document.createElement("img");
            image.src = result.urls.small;
            image.alt = result.alt_description || "Image";

            const imgLink = document.createElement("a");
            imgLink.href = result.links.html;
            imgLink.target = "_blank";
            imgLink.appendChild(image);

            resultsContainer.appendChild(imgLink);
        });
        showMore.style.display = "block";
    } catch (error) {
        console.error("Error fetching images:", error);
        resultsContainer.innerHTML = "<p>Could not load images. Try again later.</p>";
    }
}

// Event listener for the show more button
showMore.addEventListener("click", () => {
    page++;
    searchImages();
});
// Event listener for the search button
searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    page = 1; // Reset to first page on new search
    searchImages();
});
// Event listener for the enter key
searchInput.addEventListener("keypress", (event) => {
    if(event.key === "Enter"){
    event.preventDefault();
    page = 1; // Reset to first page on new search
    searchImages();
    }
});

