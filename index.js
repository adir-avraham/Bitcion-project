let state = [];

async function init() {
   emptyDivCoins()
    spinner("divCoins")
    api.getCurrencies().then((result) => {
        currencies = result.slice(0, 10)
        state = [ ...currencies ];
        draw(state);
        clearArray();
    }).catch(err => console.error("no data"))

}

function emptyDivCoins() {
$("#divCoins").empty();
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
    emptyDivCoins()

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
    // api.getCurrenciesPrice(selectedCurrency[0], selectedCurrency[1], selectedCurrency[2], selectedCurrency[3], selectedCurrency[4]).then((result) => {
    //     console.log(result)
    //     // if (result.Response = "error") {
    //     //   console.log("No data found")
    //     // }
    // }).catch(err =>  noDadaMessage())
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
    emptyDivCoins()
    
    spinner()
    api.getCurrenciesPrice(selectedCurrency[0], selectedCurrency[1], selectedCurrency[2], selectedCurrency[3], selectedCurrency[4]).then((result) => {
     
        //console.log("current =", current_usd_rate_0)
        // console.log("result =>",  result)
  
        // const current_usd_rate_0 = result[selectedCurrency[0]].USD;
        // console.log("current =", current_usd_rate_0)
        // const current_usd_rate_1 = result[selectedCurrency[1]].USD;
        // const current_usd_rate_2 = result[selectedCurrency[2]].USD;
        // const current_usd_rate_3 = result[selectedCurrency[3]].USD;
        // const current_usd_rate_4 = result[selectedCurrency[4]].USD;


        

       const cloneCard = $("#chartContainer").clone();
       cloneCard.css({display: "inline-block"})
       $("#divCoins").append(cloneCard)
       //renderChart(current_usd_rate_0, current_usd_rate_1, current_usd_rate_2, current_usd_rate_3, current_usd_rate_4)
       renderChart()

    }).catch(err => console.error("no data"))


  
 
}
function renderChart(current_usd_rate_0, current_usd_rate_1, current_usd_rate_2, current_usd_rate_3, current_usd_rate_4) {
	var chart = new CanvasJS.Chart("chartContainer", {
		title:{
			text: "Converting to USD"              
		},
		data: [              
		{
			// Change type to "doughnut", "line", "splineArea", etc.
			type: "column",
			dataPoints: [
				{ label: selectedCurrency[0].toLowerCase(),  y: 5 },
				{ label: selectedCurrency[1], y: 3 },
				{ label: selectedCurrency[2], y: 10 },
				{ label: selectedCurrency[3],  y: 1 },
				{ label: selectedCurrency[4],  y: 20 }
			]
		}
		]
	});
	chart.render();
}


function aboutPage() {
    emptyDivCoins()
    const cloneCard = $("#aboutContent").clone();
    cloneCard.css({display: "inline-block"})
    $("#divCoins").append(cloneCard)

}


init()


