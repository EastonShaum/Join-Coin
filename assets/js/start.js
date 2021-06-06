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

                    displayData(coinName, coinPrice, largePng);

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

    var searchKeyword = document.querySelector("#submit-keyword");
    searchKeyword.addEventListener("click", function(event) {
        event.preventDefault();
        var articles = document.querySelector("#article-row");
        articles.innerHTML = "";
        keyWord = inputText.value;
        saveKeyword(keyWord);
        fetchNYT(keyWord);
        inputText.value = "";
    });
};


var saveKeyword = function(keyWord) {
    var searchedCoins = [];
    if (keyWord) {
        searchedCoins.push(keyWord);
        if (keyWord.length > 5) {
            searchedCoins.pop();
            console.log(searchedCoins);
        }
        localStorage.setItem("searchedCoins", JSON.stringify(searchedCoins));
    } else {
        console.log("No keyword saved.");
    }
    searchedCoins = [];
};

var getSavedCoins = function() {
    var searchedCoins = JSON.parse(localStorage.getItem("searchedCoins"));
    var randomSearch = searchedCoins[Math.floor(Math.random() * searchedCoins.length)];
    fetchNYT(randomSearch);
};


var displayNytArticles = function(article) {

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

var displayGuardianArticles = function(article) {
    var articles = document.querySelector("#article-row");
    articles.className = "col-6 bg-ligh text-dark align-right";
    for (var i = 0; i < 5; i++) {
        var articleLink = document.createElement("h6");
        var articleHeadline = document.createElement("a");
        if (article.results[0].webTitle) {
            articleHeadline.setAttribute("href", article.results[0].webUrl);
            articleHeadline.textContent = article.results[0].webTitle;
        } else {
            return;
        }

        articleLink.append(articleHeadline);
        articles.append(articleLink);
    }
};

var fetchNYT = function() {

    var nytApiKey = "LCyA6VYEUWEMBexw7HmmAlPdPJopvG9G";
    var apiUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + keyWord + "&api-key=" + nytApiKey;

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


var fetchGuardian = function() {

    var apiUrl = "https://content.guardianapis.com/search?q=" + keyWord + "&api-key=" + guardianApiKey;
    var guardianApiKey = "40d21f00-7384-4c14-92a3-12ba0e8591ab";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(article) {
                displayGuardianArticles(article);
            })
        } else {
            console.log("Error fetching from Guardian.", response);
        }
    })
};



renderNews();