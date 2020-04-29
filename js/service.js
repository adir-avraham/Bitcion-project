const config = {
    currencies: "https://api.coingecko.com/api/v3/coins/list",
    currenciesInfo: "https://api.coingecko.com/api/v3/coins",
    currenciesPrice: "https://min-api.cryptocompare.com/data"
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
    },

    getCurrenciesPrice: (selectedCurrency) => {
        return $.ajax({
            url: `${config.currenciesPrice}/pricemulti?fsyms=${selectedCurrency[0]},${selectedCurrency[1]},${selectedCurrency[2]},${selectedCurrency[3]},${selectedCurrency[4]}&tsyms=USD`,
            method: "get"
        })

    }

};