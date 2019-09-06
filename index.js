api.getCurrencies().then((result) => {
    currencies = result.slice(0, 10)
   // .map(currency => currency);
    getCurrenciesNameSymble(currencies);
})

function getCurrenciesNameSymble(currencies) {
    const currenciesNameSymbol = currencies.map((currency) => {
        const { name, symbol } = currency;
        return { name, symbol };
    })
    draw(currenciesNameSymbol);
}





function draw(currenciesNameSymbol) {
    currenciesNameSymbol.forEach((currency, index, currenciesNameSymbol) => {
        const clonedCard = $("#coinCard").clone();
        clonedCard.css({ display: "inline-block" });
        clonedCard.find("#name").html(currenciesNameSymbol[index].name);
        clonedCard.find("h5").html(currenciesNameSymbol[index].symbol);
        clonedCard.find("input").attr("id", currenciesNameSymbol[index].name);
        clonedCard.find(".infoBtn").attr("alt", currenciesNameSymbol[index].name);

        clonedCard.find(".infoBtn").attr("data-target", `#${currenciesNameSymbol[index].symbol}`);
        clonedCard.find(".infoBtn").attr("aria-controls", currenciesNameSymbol[index].symbol);
                
        clonedCard.find("#moreInfo").attr("id", currenciesNameSymbol[index].symbol);
      

    

        clonedCard.find(".infoBtn").on("click", function (event) {
            searchinfo(event.target.alt.toLowerCase(), event)
            //console.log(event.toElement.parentElement.parentElement)
        })
        clonedCard.find("label").attr("for", currenciesNameSymbol[index].name);
        $("#divCoins").append(clonedCard);

    })
}






function searchinfo(currency, event) {
    const coinCard = event.toElement.parentElement.parentElement;

    api.getCurrencyInfoById(currency).then((result) => {


        const image = result.image.small;
        const current_price_usd = result.market_data.current_price.usd;
        const current_price_eur = result.market_data.current_price.eur;
        const current_price_ils = result.market_data.current_price.ils;





        console.log(result)
        drawInfo(image, current_price_usd, current_price_eur, current_price_ils)
        //console.log(image)
        console.log(current_price_usd + "$")
        console.log(current_price_eur + "EUR")
        console.log(current_price_ils + "ILS")

    })


    function drawInfo(image, current_price_usd, current_price_eur, current_price_ils) {
        //can use later when chosing a coin =>    $(coinCard).toggleClass("bg-silver-coin");
        console.log(image);
           
        $(coinCard).find("#img").html(`<img src=${image}>`);   
        $(coinCard).find("img").addClass("rounded-lg");   
        $(coinCard).find("#usd").text(`${current_price_usd} $`);          
        $(coinCard).find("#eur").html(`${current_price_eur} &euro;`);          
        $(coinCard).find("#ils").html(`${current_price_ils} &#8362;`);          
        
  
            

    }

}



