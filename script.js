// When search button is clicked, get user input, store it in a variable
document.getElementById("my_form").addEventListener("submit", handleSubmit);


function handleSubmit(e) {
    e.preventDefault();
    const searchInput = e.target.query.value; // access form's child elements using the name "query" and saving its value
    // console.log(searchInput);

    e.target.query.value = "";  // resetting the value so the previous value gets cleared
    getGifs(searchInput);   // delegating to below function to get gifs
}

function getGifs(userInput) {
    // build url using api key and limit to 12 results
    const apiKey = "HnjTa3OFMAQ4fU1Ee82yCcyU4I6NsKwl";
    const URL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${userInput}&limit=12`; // using apiKey and user input to create the url
    // console.log(URL);

    // use the created URL to make GET request to get data from API and store that data in a variable
    fetch(URL)
        .then((response) => response.json())
        .then((gifs) => {
            const giphies = gifs.data;
            // console.log(giphies);
            document.getElementById("container").innerHTML = ""; // setting the container to blank so it will load the content in slow networks
            showGifs(giphies);  // delegating below to show gifs in container
        })
        .catch((err) => console.log(err));
}

function showGifs(gifs) {
    for (const gif of gifs) {
        const title = gif.title;
        const imageUrl = gif.images.fixed_height_small.url;

        const card = document.createElement("div");
        card.classList.add("card");
        card.style.width = "18rem";

        card.innerHTML = `
            <img src=${imageUrl} class="card-img-top" alt=${title}>
            <div class="card-body">
            <p class="card-text">
            ${title}</p>
            </div>
            `;
        document.getElementById("container").appendChild(card);
    }
}






