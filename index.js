let state = [];

async function init() {
    spinner("divCoins")
    api.getCurrencies().then((result) => {
        currencies = result.slice(0, 10)
        state = [ ...currencies ];
        draw(state);
        clearArray();
    }).catch(err => console.error("no data"))

}


function spinner(idElement) {
    const spinner = $("#spinner").clone()
    spinner.css({ display: "inline-block" });
    $(`#${idElement}`).append(spinner);
}

function search(searchBy, value, data) {
    if (!Array.isArray(data) || !searchBy || !value) return data;
    return data.filter((currency) => {
        return currency[searchBy] === (value.toLowerCase())
    })
}


$("#searchBtn").on("click", searchAction)


function searchAction() {
    const value = $("#searchInput").val();
        draw(search("symbol", value, state));
}




$("#home").on("click", init)
$("#reports").on("click", liveReportsPage);
$("#about").on("click", aboutPage);


function  clearArray() {
    selectedCurrency = [];
}




function draw(currenciesNameSymbol) {
    $("#divCoins").empty();

    currenciesNameSymbol.forEach((currency, index, currenciesNameSymbol) => {
        const clonedCard = $("#coinCard").clone();
        clonedCard.css({ display: "inline-block" });
        clonedCard.find("#name").html(currenciesNameSymbol[index].name);
        clonedCard.find("h5").html(currenciesNameSymbol[index].symbol);

        clonedCard.find("input").attr("id", currenciesNameSymbol[index].symbol);
        clonedCard.find("input").attr("value", currenciesNameSymbol[index].symbol);
        clonedCard.find("input").on("change", checkedCurrency)
        clonedCard.find("input").on("click", checkMaxCurrency)

        clonedCard.find(".infoBtn").attr("alt", currenciesNameSymbol[index].id);
        clonedCard.find(".infoBtn").attr("data-target", `#a${currenciesNameSymbol[index].id}`);
        clonedCard.find(".infoBtn").attr("aria-controls", `a${currenciesNameSymbol[index].id}`);
        clonedCard.find(".infoBtn").on("click", function (event) {
            searchinfo(event.target.alt.toLowerCase(), event)
        })
        
        clonedCard.find(".collapse").attr("id", `a${currenciesNameSymbol[index].id}`);
        
        clonedCard.find("label").attr("for", currenciesNameSymbol[index].symbol);
        
        $("#divCoins").append(clonedCard);
    })
}





function searchinfo(currency, event) {
    const coinCard = event.toElement.parentElement.parentElement;
    spinner("moreInfo");
    api.getCurrencyInfoById(currency).then((result) => {
        

        const image = result.image.small;
        const current_price_usd = result.market_data.current_price.usd;
        const current_price_eur = result.market_data.current_price.eur;
        const current_price_ils = result.market_data.current_price.ils;



        console.log(result)
        drawInfo(image, current_price_usd, current_price_eur, current_price_ils)

        console.log(current_price_usd + "$")
        console.log(current_price_eur + "EUR")
        console.log(current_price_ils + "ILS")

    }).catch(err => noDadaMessage())



    function drawInfo(image, current_price_usd, current_price_eur, current_price_ils) {     
        $(coinCard).find("#img").html(`<img src=${image}>`);
        $(coinCard).find("img").addClass("rounded-lg");
        $(coinCard).find("#usd").text(`${current_price_usd} $`);
        $(coinCard).find("#eur").html(`${current_price_eur} &euro;`);
        $(coinCard).find("#ils").html(`${current_price_ils} &#8362;`);
    }

}

function noDadaMessage() {
    alert("No data for this coin")
}





let selectedCurrency = [];

function checkedCurrency() {

    const checked = $(this).val().toUpperCase();
//    $(this).parents(".bg-coin").toggleClass("bg-silver-coin");
    if ($(this).is(':checked')) {
        selectedCurrency.push(checked);       
    }
    else {
        selectedCurrency.splice($.inArray(checked, selectedCurrency), 1);
    }

    console.log(selectedCurrency)
    api.getCurrenciesPrice(selectedCurrency[0], selectedCurrency[1], selectedCurrency[2], selectedCurrency[3], selectedCurrency[4]).then((result) => {
        console.log(result)

    }).catch(err =>  noDadaMessage())
}


function checkMaxCurrency() {
    if ($(this).is(':checked') && selectedCurrency.length === 2) {
        openModal()
        return false;
    }
}


function openModal() {
    $("#modalListGroup").empty();
    for (let i = 0; i < selectedCurrency.length; i++ ) {
        const listItem = $("#listItem").clone()
        listItem.css({ visibility: "visible" });
        listItem.find("span").text(selectedCurrency[i]);
        listItem.find("input").attr("id", `item-${i}`); 
        listItem.find("input").attr("value", selectedCurrency[i]);
        listItem.find("label").attr("for", `item-${i}`);
        listItem.find("input").on("change", checkedCurrencyInModal)
        $("#modalListGroup").append(listItem);       
    }
    $("#exampleModal").modal();
}


function checkedCurrencyInModal() {
    const checked = $(this).val().toUpperCase();
    if ($(this).is(':checked')) {
        selectedCurrency.push(checked);       
    }
    else {
        selectedCurrency.splice($.inArray(checked, selectedCurrency), 1);
    }
}


$("#saveBtn").on("click", saveChangesModal)


function saveChangesModal() {
    
    
    for (index=0; index <= $(".input-cards-id").length - 2; index++ ) {
        const temp = $(".input-cards-id")[index]["value"];
        const input = $(".input-cards-id")[index];
        if (input.checked && selectedCurrency.includes(temp.toUpperCase())) {
        }   else {
            input.checked = false;
                 
        // almost working=>>    ($(input.parentElement.parentElement.parentElement.parentElement)).toggleClass("bg-coin");

        }  
}
    $("#exampleModal").modal('hide');
}



function liveReportsPage() {
    spinner()
    api.getCurrenciesPrice(selectedCurrency[0], selectedCurrency[1], selectedCurrency[2], selectedCurrency[3], selectedCurrency[4]).then((result) => {
        console.log(result)

        $("#divCoins").html("<h1>live reports page</h1>")
        const current_usd_rate = result[selectedCurrency[0]].USD;
        $("#divCoins").html("<h5>" +  current_usd_rate + "here" +  "</h5>")


    }).catch(err => console.error("no data"))
    
  
 
}


function aboutPage() {
    $("#divCoins").html("<h1>about page</h1>")

}


init()


