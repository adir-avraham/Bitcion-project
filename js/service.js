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

    getCurrenciesPrice: (currencySymbol_1, currencySymbol_2, currencySymbol_3, currencySymbol_4, currencySymbol_5) => {
        return $.ajax({
            url: `${config.currenciesPrice}/pricemulti?fsyms=${currencySymbol_1},${currencySymbol_2},${currencySymbol_3},${currencySymbol_4},${currencySymbol_5}&tsyms=USD`,
            method: "get"
        })

    }


}



