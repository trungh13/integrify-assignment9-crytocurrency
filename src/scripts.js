const url = "https://api.coinmarketcap.com/v2/ticker/?convert=BTC";
const iconSrc = "https://s2.coinmarketcap.com/static/img/coins/16x16/";
let myData;
let newData;
let itemList;
fetch(url)
  .then(res => res.json())
  .then(json => {
    myData = [Object.values(json.data)][0];
    renderList(myData);
    newData = myData;
  });

let searchData = [];
let sortType = "";
let typeSort = "";
const crytoList = document.getElementById("cryto-list");
const searchPanel = document.getElementById("search-panel");
const sortName = document.getElementById("sort-alphabet");
const sortRank = document.getElementById("sort-rank");
const sortPrice = document.getElementById("sort-price");
const sortButton = document.querySelectorAll("i");
const displayType = document.getElementById("display-type");
const searchPaneDiv = document.querySelector(".search-panel-div");
const searchPanelPos = searchPaneDiv.offsetTop;
const displayTypeDiv = document.querySelector(".display-type-div");
const numberOfCoins = document.getElementById("number-of-coin");

const initHeight = window.innerHeight + window.scrollY;
const render = item => {
  const itemNode = document.createElement("div");
  itemNode.className = "item";
  itemNode.id = item.symbol;

  const itemHeader = document.createElement("div");
  itemHeader.className = "item-header";
  const itemHeaderIcon = document.createElement("img");
  itemHeaderIcon.className = "item-header-icon";
  itemHeaderIcon.src = `${iconSrc}${item.id}.png`;
  const itemHeaderSymbol = document.createElement("a");
  itemHeaderSymbol.className = "item-header-symbol";
  itemHeaderSymbol.href = `https://coinmarketcap.com/currencies/${item.name}`;
  itemHeaderSymbol.setAttribute("target", "_blank");
  itemHeaderSymbol.innerHTML = item.symbol;
  const itemHeaderName = document.createElement("div");
  itemHeaderName.className = "item-header-name";
  itemHeaderName.appendChild(itemHeaderIcon);
  itemHeaderName.appendChild(itemHeaderSymbol);
  itemHeaderName.innerHTML += `<p>(${item.name})</p>`;
  const itemHeaderRank = document.createElement("div");
  itemHeaderRank.className = "item-header-rank";
  itemHeaderRank.innerHTML = item.rank;
  itemHeader.appendChild(itemHeaderName);
  itemHeader.appendChild(itemHeaderRank);

  const itemBody = document.createElement("div");
  itemBody.className = "item-body";

  const itemBodyPriceUSD = document.createElement("div");
  itemBodyPriceUSD.className = "item-body-priceUSD";
  itemBodyPriceUSD.innerHTML = `USD : ${item.quotes.USD.price}`;
  const itemBodyPriceBTC = document.createElement("div");
  itemBodyPriceBTC.className = "item-body-priceBTC";
  itemBodyPriceBTC.innerHTML = `BTC : ${item.quotes.BTC.price}`;
  const itemBodyVol24h = document.createElement("div");
  itemBodyVol24h.className = "item-body-volumn24h";
  itemBodyVol24h.innerHTML = `Volume in 24h : ${item.quotes.USD.volume_24h}`;
  const itemBodyChange24h = document.createElement("div");
  itemBodyChange24h.className = "item-body-change24h";
  itemBodyChange24h.innerHTML = `Change in 24h : ${
    item.quotes.USD.percent_change_24h
  }%`;
  item.quotes.USD.percent_change_24h >= 0
    ? (itemBodyChange24h.innerHTML += ` <i class="fas fa-caret-up"></i>`)
    : (itemBodyChange24h.innerHTML += ` <i class="fas fa-caret-down"></i>`);
  itemBody.appendChild(itemBodyPriceUSD);
  itemBody.appendChild(itemBodyPriceBTC);
  itemBody.appendChild(itemBodyVol24h);
  itemBody.appendChild(itemBodyChange24h);

  itemNode.appendChild(itemHeader);
  itemNode.appendChild(itemBody);
  crytoList.appendChild(itemNode);
};
const renderList = theList => {
  theList.forEach(element => {
    render(element);
  });
  itemList = Object.values(document.querySelectorAll(".item"));
  displayType.classList.contains("fa-bars") ? displayGrid() : displayTable();

  numberOfCoins.innerHTML = theList.length;
};

searchPanel.addEventListener("input", event => {
  searchLog = event.target.value;
  searchData = myData.filter(el => {
    return (
      el.name.toLowerCase().includes(searchLog.toLowerCase()) ||
      el.symbol.toLowerCase().includes(searchLog.toLowerCase())
    );
  });
  numberOfCoins.innerHTML = searchData.length;
  clearList();
  renderList(searchData);
});
//Change logos
sortName.children[0].addEventListener("click", event => {
  if (event.target.classList.contains("fa-sort-alpha-up")) {
    sortType = "name-asc";
    event.target.classList.remove("fa-sort-alpha-up");
    event.target.classList.add("fa-sort-alpha-down");
  } else {
    sortType = "name-desc";
    event.target.classList.remove("fa-sort-alpha-down");
    event.target.classList.add("fa-sort-alpha-up");
  }
});
sortRank.children[0].addEventListener("click", event => {
  typeSort = "rank";
  if (event.target.classList.contains("fa-sort-numeric-up")) {
    sortType = "rank-asc";
    event.target.classList.remove("fa-sort-numeric-up");
    event.target.classList.add("fa-sort-numeric-down");
  } else {
    sortType = "rank-desc";
    event.target.classList.remove("fa-sort-numeric-down");
    event.target.classList.add("fa-sort-numeric-up");
  }
});
sortPrice.children[0].addEventListener("click", event => {
  typeSort = "quotes.USD.price";
  if (event.target.classList.contains("fa-sort-amount-up")) {
    sortType = "price-asc";
    event.target.classList.remove("fa-sort-amount-up");
    event.target.classList.add("fa-sort-amount-down");
  } else {
    sortType = "price-desc";
    event.target.classList.remove("fa-sort-amount-down");
    event.target.classList.add("fa-sort-amount-up");
  }
});
//sort function
sortButton.forEach(sortBtn => {
  sortBtn.addEventListener("click", event => {
    clearList();
    switch (sortType) {
      case "name-asc":
        newData = sortNameFunc(myData);
        break;
      case "name-desc":
        newData = sortNameFunc(myData).reverse();
        break;
      case "rank-asc":
        newData = sortRankFunc(myData);
        break;
      case "rank-desc":
        newData = sortRankFunc(myData).reverse();
        break;
      case "price-asc":
        newData = sortPriceFunc(myData);
        break;
      case "price-desc":
        newData = sortPriceFunc(myData).reverse();
        break;
      default:
        break;
    }
    renderList(newData);
    searchPanel.value = null;
  });
});

function sortNameFunc(data) {
  newData = data.sort(function(a, b) {
    var nameA = a.name.toUpperCase();
    var nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  return newData;
}
function sortRankFunc(data) {
  newData = data.sort(function(a, b) {
    return a.rank - b.rank;
  });
  return newData;
}
function sortPriceFunc(data) {
  newData = data.sort(function(a, b) {
    return a.quotes.USD.price - b.quotes.USD.price;
  });
  return newData;
}
//change display
displayType.addEventListener("click", event => {
  display = event.target;
  if (display.classList.contains("fa-bars")) {
    display.classList.remove("fa-bars");
    display.classList.add("fa-th");
    displayTable();
  } else {
    display.classList.remove("fa-th");
    display.classList.add("fa-bars");
    displayGrid();
  }
});
function displayTable() {
  crytoList.classList = "display-table";
  itemList.forEach(element => {
    element.classList.add("item-table");
    element.children[0].classList.add("item-header-table");
    element.firstChild.firstChild.classList.add("item-header-name-table");
    element.children[1].classList.add("item-body-table");
  });
}
function displayGrid() {
  crytoList.classList = "display-grid";
  itemList.forEach(element => {
    element.classList.remove("item-table");
    element.children[0].classList.remove("item-header-table");
    element.firstChild.firstChild.classList.remove("item-header-name-table");
    element.children[1].classList.remove("item-body-table");
  });
}

let counter = 1;

window.onscroll = function(ev) {
  //fixed-header
  if (window.pageYOffset >= searchPanelPos) {
    searchPaneDiv.classList.add("fixed-header");
    displayTypeDiv.classList.add("fixed-header");
    crytoList.style.paddingTop = "90px";
  } else {
    searchPaneDiv.classList.remove("fixed-header");
    displayTypeDiv.classList.remove("fixed-header");
    crytoList.style.paddingTop = "30px";
  }
  //scroll end page -100px
  if (
    window.innerHeight + window.pageYOffset >=
    document.body.offsetHeight -50
  ) {
    fetch(`${url}&start=${(counter += 100)}`)
      .then(res => res.json())
      .then(json => {
        Object.values(json.data).forEach(el => newData.push(el));
        console.log(newData);
        clearList();
        renderList(newData);
      });
  }
};

function clearList() {
  crytoList.innerHTML = null;
}
