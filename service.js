const config = {
    currencies: "https://api.coingecko.com/api/v3/coins/list"
}



const api = { 
getCurrencies: () => {
    return $.ajax({
        url: config.currencies,
        method: "get"
    })
}
}



