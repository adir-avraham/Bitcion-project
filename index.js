api.getCurrencies().then((result) => {
    currencies = result.slice(0, 10).map(currency => currency);
    getCurrenciesNameSymble(currencies);
})

function getCurrenciesNameSymble(currencies) {
    const currenciesNameSymbol = currencies.map((currency) => {
    const {name , symbol} = currency;
        return {name , symbol};
    }) 
  draw (currenciesNameSymbol);  
}





function draw(currenciesNameSymbol) {
    currenciesNameSymbol.forEach((currency, index, currenciesNameSymbol) => {                  
        const clonedCard = $("#coinCard").clone();
        clonedCard.find("h5").html(currenciesNameSymbol[index].name);
        clonedCard.find("p").html(currenciesNameSymbol[index].symbol);
        $("#divCoins").append(clonedCard);
        
    })
}






