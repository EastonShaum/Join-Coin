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
    logoEl.src = logo;

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
    }   else  {
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





var nytApiKey = "LCyA6VYEUWEMBexw7HmmAlPdPJopvG9G";
var keyWord = "";

// console.log("call getSavedCoins");
// getSavedCoins();

var renderNews = function() {
    // var coinNameSearchForm = document.createElement("form");
    // coinNameSearchForm.setAttribute("id", "input-form");

    // var inputLabel = document.createElement("label");
    // inputLabel.setAttribute("for", "coinName-text");

    // var inputText = document.createElement("input");
    // inputText.setAttribute("id", "coinName-text");
    // inputText.setAttribute("type", "text");
    // inputText.setAttribute("name", "coinName-text");
    // inputText.setAttribute("placeholder", "Enter Coin Name");

    // var inputSubmit = document.createElement("input");
    // inputSubmit.setAttribute("id", "submit-coinName");
    // inputSubmit.setAttribute("type", "submit");
    // inputSubmit.setAttribute("value", "submit");

    // coinNameSearchForm.append(inputLabel, inputText, inputSubmit);

    // var mainFormDiv = document.querySelector("#form-row");
    // mainFormDiv.append(coinNameSearchForm);

    getSavedCoins();

    var searchCoinName = document.querySelector("#submit-search");
    searchCoinName.addEventListener("click", function(event) {
        event.preventDefault();
        location.href = "#quick-look"
        var inputText = document.querySelector("#coinName");
        var coinName = inputText.value;
        saveCoinName(coinName);
        fetchNYT(coinName);
        inputText.value = "";
    });
};


var saveCoinName = function(coinName) {
    if (tempSearchedCoins) {
        console.log("if portion of tempSearchedCoins expression");
        searchedCoins = tempSearchedCoins;
    } else {
        console.log("else portion of tempSearchedCoins expression");
        searchedCoins.push(coinName);
    }

    if (searchedCoins.includes(coinName)) {
        console.log("Search already an array element.");
        return;
    } else {
        console.log("add element to array");
        searchedCoins.push(coinName);
    }

    if (searchedCoins.length > 5) {
        searchedCoins.shift();
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
        console.log("randomSearch output", randomSearch);
        console.log("send to fetchNYT");
        fetchNYT(randomSearch);

        // var listCoins = document.getElementById("coins-list");

        // var listContainerEl = document.createElement("div");
        // listContainerEl.setAttribute("id", "list-div");
        // listContainerEl.className = "card";

        // var listContainerHeader = document.createElement("div");
        // listContainerHeader.className = "card-header";
        // listContainerHeader.textContent = "Recent Searches:"

        var listEl = document.querySelector("#searched");
        // listEl.setAttribute("id", "list-ul");
        // listEl.className = "list-group list-group-flush";    


        for (var i = 0; i < tempSearchedCoins.length; i++) {
            var listItem = document.createElement("li");
            // listItem.className = "list-group-item";

            var listButton = document.createElement("button");
            listButton.className = "btn btn-outline-success my-2 my-sm-0";
            listButton.setAttribute("type", "submit");
            listButton.setAttribute("id", "coin-" + [i]);
            listButton.textContent = tempSearchedCoins[i];

            listItem.append(listButton);
            listEl.append(listItem);
            // listContainerEl.append(listContainerHeader, listEl);
            // listCoins.append(listContainerEl);

        }

        // var index = tempSearchedCoins.length - 1;
        // coinInfo(tempSearchedCoins[index]);
    } else {
        var listItem = document.createElement("li");
        listItem.textContent = "No recently saved searches."
        console.log("listItem", listItem);
        // display modal alert
        // var modalAlert = document.createElement("div");
        // modalAlert.setAttribute("id", "modal-body");
        // // modalAlert.className = "modal";

        // var modalContent = document.createElement("div");
        // modalContent.setAttribute("id", "modal-content");

        // var modalText = document.createElement("p");
        // modalText.setAttribute("id", "modal-text");
        // modalText.textContent = "No previously searched coins."

        // modalContent.append(modalText);
        // modalAlert.append(modalContent);

        // var modalDiv = document.getElementById("coins-list");
        // modalDiv.append(modalAlert);

        // var listCoins = document.getElementById("coins-list");
        // console.log("listCoins", listCoins);
        // listCoins.append(modalAlert);

        var listEl = document.getElementById("searched");
        listEl.appendChild(listItem);
        console.log("listEl", listEl);

        return;
    }


    console.log("start portion creating event listeners for list of recent searches");
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
    // articles.className = "col-6 bg-ligh text-dark align-right";

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