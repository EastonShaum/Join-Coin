var trendingEl = document.getElementById("trending");
var searchedEl = document.getElementById("searched");

var searchedCoins = [];
var tempSearchedCoins = [];



var listOfCoins = function() {
    // List of all coins
    var apiUrl = "https://api.coingecko.com/api/v3/coins/list?include_platform=true";

    fetch(apiUrl).then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data[1].name);
                // Loop through all coins
                for (i = 0; i < data.length; i++) {
                    var coinName = data[i].name

                    displayData(coinName);

                };
            });
        }
    });
};


var trendingCoins = function(bitcoinPrice) {
    // List of the top 7 trending coins
    var apiUrl = "https://api.coingecko.com/api/v3/search/trending";

    fetch(apiUrl).then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                // Loop through the seven trending coins
                for (i = 0; i < 7; i++) {
                    var coinName = data.coins[i].item.name
                    var coinPrice = data.coins[i].item.price_btc
                    var largePng = data.coins[i].item.large
                    

                    
                    console.log(bitcoinPrice);
                    
                    
                    coinPrice = coinPrice * bitcoinPrice;
                    //console.log(coinName)
                    //console.log(coinPrice)

                    //console.log(largePng)

                    displayTrendingData(coinName, coinPrice, largePng);

                };
            });
        }
    });
};

var bitcoinPrice = function(date = moment().format('DD-MM-YYYY')) {
    // Info on a specific coin and date
    var apiUrl = "https://api.coingecko.com/api/v3/coins/bitcoin/history?date=" + date + "&localization=false"

    fetch(apiUrl).then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
                //console.log(data);

                var bitcoin = data.market_data.current_price.usd
                //console.log(date);
                //console.log(bitcoin);
                trendingCoins(bitcoin);

            });
        }
    });
};

var coinInfo = function(coinName, date = moment().format('DD-MM-YYYY')) {
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


                displayChoosenData(coinName, coinPrice, coinMarketCap, coinVolume, pngLogo);


            });
        }
    });
};

var displayChoosenData = function(name, price = 0, marketCap = 0, volume = 0, logo = 0, date = moment().format('MMMM Do YYYY, h:mm:ss a')) {
    // create elements for the variables
    var infoEl = document.createElement("li");
    var nameEl = document.createElement("p");
    var priceEl = document.createElement("p");
    var marketCapEl = document.createElement("p");
    var volumeEl = document.createElement("p");
    var dateEl = document.createElement("p");
    var logoEl = document.createElement("img");

    if (price > 0.001) {
        price = price.toFixed(2);
    } else  {
        price = price.toFixed(8);
    }

    // assign the values
    nameEl.textContent = name;
    priceEl.textContent = price;
    marketCapEl.textContent = marketCap;
    volumeEl.textContent = volume;
    logoEl.value = logo;

    // assign classes
    nameEl.classList = ("coinList");
    priceEl.classList = ("coinList");
    logoEl.classList = ("coinList");
    marketCapEl.classList = ("coinList");
    volumeEl.classList = ("coinList");
    dateEl.classList = ("coinList");
    logoEl.height = 50;

    // make them the right sizes
    // nameEl.classList("col-5");
    // priceEl.classList("col-5");
    // logoEl.classList("col-2");

    infoEl.appendChild(logoEl);
    infoEl.appendChild(nameEl);
    infoEl.appendChild(priceEl);
    infoEl.appendChild(marketCapEl);
    infoEl.appendChild(volumeEl);
    infoEl.appendChild(dateEl);

    


    searchedEl.appendChild(infoEl);


};

var displayTrendingData = function(name, price = 0, logo = 0) {
    // create elements for the functions
    var coinEl = document.createElement("li");
    var nameEl = document.createElement("p");
    var priceEl = document.createElement("p");
    var logoEl = document.createElement("img");

    if (price > 0.001) {
        price = price.toFixed(2);
    }
    

    // assign the values
    nameEl.textContent = name;
    priceEl.textContent = price;
    logoEl.src = logo;

    // assign classes
    nameEl.classList = ("coinList");
    priceEl.classList = ("coinList");
    logoEl.classList = ("coinList");
    logoEl.height = 25;

    // make them the right sizes
    // nameEl.classList("col-5");
    // priceEl.classList("col-5");
    // logoEl.classList("col-2");

    coinEl.appendChild(logoEl);
    coinEl.appendChild(nameEl);
    coinEl.appendChild(priceEl);

    trendingEl.appendChild(coinEl);
    //console.log(coinEl)

};

bitcoinPrice();
//trendingCoins();





var nytApiKey = "LCyA6VYEUWEMBexw7HmmAlPdPJopvG9G";
var keyWord = "";


var renderNews = function() {
    var keywordSearchForm = document.createElement("form");
    keywordSearchForm.setAttribute("id", "input-form");

    var inputLabel = document.createElement("label");
    inputLabel.setAttribute("for", "keyword-text");

    var inputText = document.createElement("input");
    inputText.setAttribute("id", "keyword-text");
    inputText.setAttribute("type", "text");
    inputText.setAttribute("name", "keyword-text");
    inputText.setAttribute("placeholder", "Enter individual keywords, i.e. 'bitcoin' ");
    inputText.setAttribute("style", "padding-left: 25px;")

    var inputSubmit = document.createElement("input");
    inputSubmit.setAttribute("id", "submit-keyword");
    inputSubmit.setAttribute("type", "submit");
    inputSubmit.setAttribute("value", "submit");

    keywordSearchForm.append(inputLabel, inputText, inputSubmit);

    var mainFormDiv = document.querySelector("#form-row");
    mainFormDiv.append(keywordSearchForm);

    console.log("Rendered form.");

    var searchKeyword = document.querySelector("#submit-keyword");
    searchKeyword.addEventListener("click", function(event) {
        event.preventDefault();
        keyWord = document.getElementById("keyword-text").value;
        console.log("keyword: ", keyWord);
        fetchNYT();
    });
};


var fetchNYT = function() {

    var nytApiKey = "LCyA6VYEUWEMBexw7HmmAlPdPJopvG9G";
    var apiUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + keyWord + "&api-key=" + nytApiKey;

    console.log("keyword in fetchNYT function: ", keyWord);
    console.log("apiUrl search value: ", apiUrl);
    fetch(apiUrl).then(function(response) {
        console.log(response);

        return response.json();
    }).then(function(article) {
        console.log(article);
        var articles = document.querySelector("#article-row");
        articles.className = "col-6 bg-ligh text-dark align-right";
        for (var i = 0; i < 5; i++) {
            var articleLink = document.createElement("h6");
            var articleHeadline = document.createElement("a");
            if (article.response.docs[i].headline.print_headline) {
                articleHeadline.setAttribute("href", article.response.docs[i].web_url);
                articleHeadline.textContent = article.response.docs[i].headline.print_headline;
            } else if (article.response.docs[i].snippet) {
                articleHeadline.setAttribute("href", article.response.docs[i].web_url);
                articleHeadline.textContent = article.response.docs[i].snippet;
            } else {
                return;
            }

            articleLink.append(articleHeadline);
            articles.append(articleLink);
        }
    })
};

renderNews();