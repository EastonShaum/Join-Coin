var trendingEl = document.getElementById("trending");
var searchedEl = document.getElementById("searched");

var searchedCoins = [];
var tempSearchedCoins = [];
var nytApiKey = "LCyA6VYEUWEMBexw7HmmAlPdPJopvG9G";
var keyWord = "";



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

var bitcoinPrice = function() {
    // Info on a specific coin and date
    var apiUrl = "https://api.coingecko.com/api/v3/coins/bitcoin"

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

var coinInfo = function(coinName) {
    // Info on a specific coin and date
    var apiUrl = "https://api.coingecko.com/api/v3/coins/" + coinName

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

var displayChoosenData = function(name, price = 0, marketCap = 0, volume = 0, logo = 0) {
    // create elements for the variables
    var infoEl = document.createElement("li");
    var nameEl = document.createElement("p");
    var priceEl = document.createElement("p");
    var marketCapEl = document.createElement("p");
    var volumeEl = document.createElement("p");
    var logoEl = document.createElement("img");

    if (price > 0.001) {
        price = price.toFixed(2);
    } else {
        price = price.toFixed(8);
    }

    marketCap = marketCap.toFixed(2);
    volume = volume.toFixed(2);

    price = numberWithCommas(price);
    marketCap = numberWithCommas(marketCap);
    volume = numberWithCommas(volume);

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
        price = numberWithCommas(price);
    } else {
        price = price.toFixed(8);
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

var numberWithCommas = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

coinInfo("bitcoin")

bitcoinPrice();
//trendingCoins();








var renderNews = function() {
    getSavedCoins();

    var searchCoinName = document.querySelector("#submit-search");
    searchCoinName.addEventListener("click", function(event) {
        event.preventDefault();

        location.href = "#quick-look"

        var inputText = document.querySelector("#coinName");
        var coinName = inputText.value;

        saveCoinName(coinName);
        fetchNYT(coinName);
        coinInfo(coinName);

        inputText.value = "";
    });
};


var saveCoinName = function(coinName) {
    searchedCoins = tempSearchedCoins;
    if (searchedCoins.length >= 1) {
        if (searchedCoins.includes(coinName)) {
            return;
        } else {
            console.log("add element to array");
            searchedCoins.push(coinName);
        }
        if (searchedCoins.length > 5) {
            searchedCoins.shift();
        }
    } else {
        searchedCoins.push(coinName);
    }

    console.log("add to localStorage");
    localStorage.setItem("searchedCoins", JSON.stringify(searchedCoins));
};

var getSavedCoins = function() {
    console.log("start getSavedCoins");
    var tempSearchedCoins = JSON.parse(localStorage.getItem("searchedCoins"));

    console.log("tempSearchedCoins:", tempSearchedCoins);

    if (tempSearchedCoins) {
        var randomSearch = tempSearchedCoins[Math.floor(Math.random() * tempSearchedCoins.length)];
        fetchNYT(randomSearch);

        var listEl = document.querySelector("#recent-searches");

        for (var i = 0; i < tempSearchedCoins.length; i++) {
            var listItem = document.createElement("li");

            var listButton = document.createElement("button");
            listButton.className = "btn btn-outline-success my-2 my-sm-0";
            listButton.setAttribute("type", "submit");
            listButton.setAttribute("id", "coin-" + [i]);
            listButton.textContent = tempSearchedCoins[i];

            listItem.append(listButton);
            listEl.append(listItem);
        }

        var index = tempSearchedCoins.length - 1;
        coinInfo(tempSearchedCoins[index]);
    } else {
        var listItem = document.createElement("li");
        listItem.textContent = "No recently saved searches."
        console.log("listItem", listItem);

        var listEl = document.getElementById("recent-searches");
        listEl.appendChild(listItem);
        console.log("listEl", listEl);

        return;
    }

    var coin1 = document.getElementById("coin-0");
    var coin2 = document.getElementById("coin-1");
    var coin3 = document.getElementById("coin-2");
    var coin4 = document.getElementById("coin-3");
    var coin5 = document.getElementById("coin-4");

    if (coin1) {
        coin1.addEventListener("click", function(event) {
            event.preventDefault();
            coinInfo(coin1.textContent);
        });
    }
    if (coin2) {
        coin2.addEventListener("click", function(event) {
            event.preventDefault();
            coinInfo(coin2.textContent);
        });
    }
    if (coin3) {
        coin3.addEventListener("click", function(event) {
            event.preventDefault();
            coinInfo(coin3.textContent);
        });
    }
    if (coin4) {
        coin4.addEventListener("click", function(event) {
            event.preventDefault();
            coinInfo(coin4.textContent);
        });
    }
    if (coin5) {
        coin5.addEventListener("click", function(event) {
            event.preventDefault();
            coinInfo(coin5textContent);
        });
    }

};


var displayNytArticles = function(article) {
    var articles = document.querySelector("#news");


    for (var i = 0; i < 5; i++) {
        var articleLink = document.createElement("li");
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
};

var fetchNYT = function(coinName) {
    var nytApiKey = "LCyA6VYEUWEMBexw7HmmAlPdPJopvG9G";
    var apiUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + keyWord + "&api-key=" + nytApiKey;

    fetch(apiUrl).then(function(response) {
        return response.json();
    }).then(function(article) {
        var articles = document.querySelector("#news");
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