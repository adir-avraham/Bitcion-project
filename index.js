api.getCurrencies().then((result) => {
    currenciesName = result.slice(0, 10).map(currency => currency.name);
    console.log(currenciesName);
    draw(currenciesName);
})




function draw(currenciesName) {
    currenciesName.forEach((currency, index, currenciesName) => {                    
        const clonedCard = $("#coinCard").clone();
        clonedCard.find("h5").html(currenciesName[index]);
        $("#divCoins").append(clonedCard);
        
    })
}







