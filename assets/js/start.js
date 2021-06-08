var trendingEl = document.getElementById("");
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


var trendingCoins = function() {
    // List of the top 7 trending coins
    var apiUrl = "https://api.coingecko.com/api/v3/search/trending";

    fetch(apiUrl).then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                // Loop through the seven trending coins
                for (i = 0; i < 7; i++) {
                    var coinName = data.coins[i].name
                    var coinPrice = data.coins[i].price_btc
                    var largePng = data.coins[i].large

                    displayTrendingData(coinName, coinPrice, largePng);

                };
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


                displayData(coinName, coinPrice, coinMarketCap, coinVolume, pngLogo, date);


            });
        }
    });
};

var displayChoosenData = function(name, price = 0, marketCap = 0, volume = 0, logo = 0, date = moment().format('MMMM Do YYYY, h:mm:ss a')) {
    // create elements for the variables
    var nameEl = document.createElement("p");
    var priceEl = document.createElement("p");
    var marketCapEl = document.createElement("p");
    var volumeEl = document.createElement("p");
    var dateEl = document.createElement("p");
    var logoEl = document.createElement("img");

    // assign the values
    nameEl.textContent = name;
    priceEl.textContent = price;
    marketCapEl.textContent = marketCap;
    volumeEl.textContent = volume;
    logoEl.value = logo;

    // make them the right sizes
    nameEl.classList("col-5");
    priceEl.classList("col-5");
    logoEl.classList("col-2");

    searchedEl.appendChild(logoEl);
    searchedEl.appendChild(nameEl);
    searchedEl.appendChild(priceEl);


};

var displayTrendingData = function(name, price = 0, logo = 0) {
    // create elements for the functions
    var nameEl = document.createElement("p");
    var priceEl = document.createElement("p");
    var logoEl = document.createElement("img");

    // assign the values
    nameEl.textContent = name;
    priceEl.textContent = price;
    logoEl.value = logo;

    // make them the right sizes
    nameEl.classList("col-5");
    priceEl.classList("col-5");
    logoEl.classList("col-2");

    trendingEl.appendChild(logoEl);
    trendingEl.appendChild(nameEl);
    trendingEl.appendChild(priceEl);

};










var coinName = "";


var renderNews = function() {
    console.log("renderNews start");

    console.log("call getSavedCoins");
    getSavedCoins();

    var coinNameSearchForm = document.createElement("form");
    coinNameSearchForm.setAttribute("id", "input-form");

    var inputLabel = document.createElement("label");
    inputLabel.setAttribute("for", "coinName-text");

    var inputText = document.createElement("input");
    inputText.setAttribute("id", "coinName-text");
    inputText.setAttribute("type", "text");
    inputText.setAttribute("name", "coinName-text");
    inputText.setAttribute("placeholder", "Enter Coin Name");

    var inputSubmit = document.createElement("input");
    inputSubmit.setAttribute("id", "submit-coinName");
    inputSubmit.setAttribute("type", "submit");
    inputSubmit.setAttribute("value", "submit");

    coinNameSearchForm.append(inputLabel, inputText, inputSubmit);

    var mainFormDiv = document.querySelector("#form-row");
    mainFormDiv.append(coinNameSearchForm);

    var searchCoinName = document.querySelector("#submit-coinName");
    searchCoinName.addEventListener("click", function(event) {
        event.preventDefault();
        var articles = document.querySelector("#article-row");
        articles.innerHTML = "";
        coinName = inputText.value;
        console.log("send to saveCoinName and fetchNYT");
        saveCoinName(coinName);
        fetchNYT(coinName);
        console.log("Empty input content");
        inputText.value = "";
    });
};


var saveCoinName = function(coinName) {
    console.log("start saveCoinName")
    if (tempSearchedCoins) {
        console.log("if portion of tempSearchedCoins expression");
        searchedCoins = tempSearchedCoins;
    } else {

        console.log("else portion of tempSearchedCoins expression");
        searchedCoins.push(keyWord);
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
        console.log("if statement to render list of recent searches");

        var randomSearch = tempSearchedCoins[Math.floor(Math.random() * tempSearchedCoins.length)];
        console.log("randomSearch output", randomSearch);
        console.log("send to fetchNYT");
        fetchNYT(randomSearch);

        var listCoins = document.getElementById("coins-list");

        var listContainerEl = document.createElement("div");
        listContainerEl.setAttribute("id", "list-div");
        listContainerEl.className = "card";

        var listContainerHeader = document.createElement("div");
        listContainerHeader.className = "card-header";
        listContainerHeader.textContent = "Recent Searches:"

        var listEl = document.createElement("ul");
        listEl.setAttribute("id", "list-ul");
        listEl.className = "list-group list-group-flush";


        for (var i = 0; i < tempSearchedCoins.length; i++) {
            console.log("for loop in rendering list");

            var listItem = document.createElement("li");
            listItem.className = "list-group-item";

            var listButton = document.createElement("button");
            listButton.className = "btn btn-outline-success my-2 my-sm-0";
            listButton.setAttribute("type", "submit");
            listButton.setAttribute("id", "coin-" + [i]);
            listButton.textContent = tempSearchedCoins[i];

            listItem.append(listButton);
            listEl.append(listItem);
            listContainerEl.append(listContainerHeader, listEl);
            listCoins.append(listContainerEl);

        }

        // var index = tempSearchedCoins.length - 1;
        // coinInfo(tempSearchedCoins[index]);
    } else {
        // display modal alert
        console.log("else portion to create modal");
        var modalAlert = document.createElement("div");
        modalAlert.setAttribute("id", "modal-body");
        // modalAlert.className = "modal";

        var modalContent = document.createElement("div");
        modalContent.setAttribute("id", "modal-content");

        var modalText = document.createElement("p");
        modalText.setAttribute("id", "modal-text");
        modalText.textContent = "No previously searched coins."

        modalContent.append(modalText);
        modalAlert.append(modalContent);

        var modalDiv = document.getElementById("coins-list");
        modalDiv.append(modalAlert);

        var listCoins = document.getElementById("coins-list");
        console.log("listCoins", listCoins);
        listCoins.append(modalAlert);

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
    console.log("displayArticles");

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
};

var fetchNYT = function(coinName) {
    console.log("fetchNYT");

    var nytApiKey = "LCyA6VYEUWEMBexw7HmmAlPdPJopvG9G";
    var apiUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + coinName + "&api-key=" + nytApiKey;

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(article) {
                displayNytArticles(article);
            })
        } else {
            console.log("Error retrieving NYT", response);
        }
    })
};



renderNews();