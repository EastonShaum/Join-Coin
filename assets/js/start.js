// List of all coins
var apiUrl = "https://api.coingecko.com/api/v3/coins/list";

// List of the top 7 trending coins
var apiUrl = "https://api.coingecko.com/api/v3/search/trending";

// search for a specific coins data
var apiUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=" + coinName

// Search for historical data (name, price, market, stats) at a given date for a coin
var apiUrl = "https://api.coingecko.com/api/v3/coins/" + coinName + "/history?date=" + date + "&localization=false"

//

fetch(apiUrl).then(function(response) {
    // request was successful
    if (response.ok) {
      response.json().then(function(data) {
        console.log(data);
        
      });
    } 
  });