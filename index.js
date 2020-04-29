"use strict";

const apiKey = "4VbgYq9AdJ0dy9UxCGuhVgRNwewdosWLDcRHWVDh";
const searchURL = "https://www.developer.nps.gov/api/v1/parks";

function formatQueryParams(params) {
  const queryItems = Object.keys(params).map((key) => `${key}=${params[key]}`);
  return queryItems.join("&");
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $("#results-list").empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.items.length; i++) {
    // for each video object in the items
    //array, add a list item to the results
    //list with the video title, description,
    //and thumbnail
    $("#results-list").append(
      `<li><h3>${responseJson.fullName[i]}</h3>
      <p>${responseJson.items[i].snippet.description}</p>
      <img src='${responseJson.items[i].snippet.thumbnails.default.url}'> 
      </li>`
    );
  }
  //display the results section
  $("#results").removeClass("hidden");
}

function getParks(searchTerm, maxResults = 10) {
  const headers = {
    "x-api-key": apiKey,
  };
  const params = {
    q: searchTerm,
    //api_key: apiKey,
    limit: maxResults,
  };
  const queryString = formatQueryParams(params);
  const url = searchURL + "?" + queryString;

  console.log(url);

  fetch(url, headers)
    .then((response) => {
      if (response.ok) {
        /*THIS IS WHERE IT BREAKS, response is not ok?*/
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((responseJson) => displayResults(responseJson))
    .catch((err) => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $("form").submit((event) => {
    event.preventDefault();
    const searchTerm = $("#js-search-term").val();
    const maxResults = $("#js-max-results").val();
    getParks(searchTerm, maxResults);
  });
}

$(watchForm);
