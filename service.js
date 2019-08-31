const config = {
    currencies: "https://api.coingecko.com/api/v3/coins/list",
    currenciesInfo: "https://api.coingecko.com/api/v3/coins"
}



const api = { 
getCurrencies: () => {
    return $.ajax({
        url: config.currencies,
        method: "get"
    })
},

getCurrencyInfoById: (currency) => {
    return $.ajax({
        url: `${config.currenciesInfo}/${currency}`,
        method: "get"
    })
}
}



