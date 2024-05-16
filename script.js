document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("header__search__input");
    console.log(searchInput);
    const searchButton = document.getElementById("header__search__button");
    console.log(searchButton);
    searchButton.addEventListener("click", () => {
      const searchTerm = searchInput.value.trim();
      if (searchTerm !== "") {
        searchGIF(searchTerm);
      }
    });
    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            const searchTerm = searchInput.value.trim();
            if (searchTerm !== "") {
              searchGIF(searchTerm);
            }
        }
    });
  });
  function searchGIF(searchTerm) {
    const API_KEY = "AFBVUrIVL3we3Ry7nnLQqziNLbtuDMc3";
    const limit = 9;
    const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=${limit}&offset=0`;
    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error("!ok");
        }
        return response.json();
      })
      .then((data) => {
        displayGIFs(data.data);
      })
      .catch((error) => {
        console.error(
          "!Fetching",
          error
        );
      });
  }
  function displayGIFs(gifsData) {
    const gifContainer = document.getElementById("main_section"); 
    gifContainer.innerHTML = "";
    gifsData.forEach((gif) => {
      const div = document.createElement("div");
      const img = document.createElement("img");
      const h2 = document.createElement("h2");
      img.src = gif.images.downsized.url;
      img.alt = gif.title;
      h2.textContent = gif.title;
      div.appendChild(img);
      div.appendChild(h2);
      gifContainer.appendChild(div);
    });
  }