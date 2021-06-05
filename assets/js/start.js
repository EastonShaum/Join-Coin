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

  var apiUrl = "https://api.coingecko.com/api/v3/coins/list?include_platform=true";
    
  fetch(apiUrl).then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
          console.log(data[1].name);
          
        });
      } 
    });

var listOfCoins = function() {
        // List of all coins
        var apiUrl = "https://api.coingecko.com/api/v3/coins/list?include_platform=true";
    
    fetch(apiUrl).then(function(response) {
      // request was successful
        if (response.ok) {
          response.json().then(function(data) {
            console.log(data[1].name);
            // Loop through all coins
            for (i = 0; i < data.length; i++){ 
                var coinName = data[i].name
                
                displayData(coinName);
                
            };
          });
        } 
    });          
};


var trendingCoins = function() {
    // List of the top 7 trending coins
    var apiUrl = "https://api.coingecko.com/api/v3/search/trending";
    
    fetch(apiUrl).then(function(response) {
        // request was successful
        if (response.ok) {
          response.json().then(function(data) {
            console.log(data);
            // Loop through the seven trending coins
            for (i = 0; i < 7; i++){ 
                var coinName = data.coins[i].name
                var coinPrice = data.coins[i].price_btc
                var largePng = data.coins[i].large
                
                displayData(coinName, coinPrice, largePng);
                
            };
          });
        } 
      });
};

var coinInfo = function(coinName, date = moment().format('DD-MM-YYYY') ) {
    // Info on a specific coin and date
    var apiUrl = "https://api.coingecko.com/api/v3/coins/" + coinName + "/history?date=" + date + "&localization=false"

    fetch(apiUrl).then(function(response) {
        // request was successful
        if (response.ok) {
          response.json().then(function(data) {
            console.log(data);
            
            var coinName = data.name
            var coinPrice = data.market_data.current_price.usd
            var coinMarketCap = data.market_data.market_cap.usd
            var coinVolume = data.market_data.total_volume.usd
            var pngLogo = data.image.small
            

            displayData(coinName, coinPrice, coinMarketCap, coinVolume, pngLogo, date, );
                
            
          });
        } 
      });
};

var displayData = function(name, price = 0, marketCap = 0, volume = 0, logo = 0, date = moment().format('MMMM Do YYYY, h:mm:ss a')) {

    if (price != 0) {

    };
    if (logo != 0) {

    };
    


};