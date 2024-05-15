document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("header__search__input");
    const searchButton = document.getElementById("header__search__button");
    searchButton.addEventListener("click", () => {
      const searchTerm = searchInput.value.trim();
      if (searchTerm !== "") {
        searchGIF(searchTerm);
      }
    });
  });
  function searchGIF(searchTerm) {
    const API_KEY = "AFBVUrIVL3we3Ry7nnLQqziNLbtuDMc3";
    const limit = 9;
    const endpoint = `https://api.giphy.com/v1/gifs/search?${API_KEY}&q=${searchTerm}&${limit}=9&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
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
    const gifContainer = document.getElementsByClassName("body"); 
    gifContainer.innerHTML = "";
    gifsData.forEach((gif) => {
      const div = document.createElement("div");
      const img = document.createElement("img");
      const div2 = document.createElement("div");
      img.src = gif.images.downsized.url;
      img.alt = gif.title;
      div2.textContent = gif.title;
      div.appendChild(img);
      div.appendChild(div2);
      gifContainer.appendChild(div);
    });
  }