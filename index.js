let state = [];



function init() {
    emptyDivCoins()
    spinner("divCoins")
    api.getCurrencies().then((result) => {
        currencies = result.slice(0, 100)
        state = [ ...currencies ];
        draw(state);
        clearArray();
    }).catch(err => console.error("no data"))

}



function emptyDivCoins() {
$("#divCoins").empty();
}



function spinner(idElement) {
    const spinner = $("#spinner").clone();
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
    $("#searchInput").val("");
}




$("#home").on("click", init)
$("#reports").on("click", liveReportsPage);
$("#about").on("click", aboutPage);




function  clearArray() {
    selectedCurrency = [];
}



function draw(currenciesArray) {
    emptyDivCoins()

    currenciesArray.forEach((currency, index) => {
        const clonedCard = $("#coinCard").clone();
        clonedCard.css({ display: "inline-block" });
        clonedCard.find("#name").html(currenciesArray[index].name);
        clonedCard.find("h5").html(currenciesArray[index].symbol.toUpperCase());

        clonedCard.find("input").attr("id", currenciesArray[index].symbol);
        clonedCard.find("input").attr("value", currenciesArray[index].symbol);
        clonedCard.find("input").on("change", checkedCurrency)
        clonedCard.find("input").on("click", checkMaxCurrency)

        clonedCard.find(".infoBtn").attr("id", currenciesArray[index].id);
        clonedCard.find(".infoBtn").attr("data-target", `#a${currenciesArray[index].id}`);
        clonedCard.find(".infoBtn").attr("aria-controls", `a${currenciesArray[index].id}`);
        clonedCard.find(".infoBtn").on("click", function (event) {
            searchinfo(event.target.id.toLowerCase(), event)
            //optional =>>>>>   $(this).parents(".bg-coin").toggleClass("bg-silver-coin");   
        })
        
        clonedCard.find(".collapse").attr("id", `a${currenciesArray[index].id}`);
        
        clonedCard.find("label").attr("for", currenciesArray[index].symbol);
        

        $("#divCoins").append(clonedCard);
    })
}




function searchinfo(currency, event) {
    //spinner(`a${currency}`);
    //$(`#a${currency}`).empty()    
    const coinCard = event.toElement.parentElement.parentElement;
    
    api.getCurrencyInfoById(currency).then((result) => {

        const image = result.image.small;
        const current_price_usd = result.market_data.current_price.usd;
        const current_price_eur = result.market_data.current_price.eur;
        const current_price_ils = result.market_data.current_price.ils;

        drawInfo(image, current_price_usd, current_price_eur, current_price_ils, coinCard )
  
    }).catch(err => noDadaMessage())   
}




function drawInfo(image, current_price_usd, current_price_eur, current_price_ils, coinCard) {     
    $(coinCard).find("#img").html(`<img src=${image}>`);
    $(coinCard).find("img").addClass("rounded-lg");
    $(coinCard).find("#usd").text(`${current_price_usd} $`);
    $(coinCard).find("#eur").html(`${current_price_eur} &euro;`);
    $(coinCard).find("#ils").html(`${current_price_ils} &#8362;`);
}




function noDadaMessage() {
    alert("No data")
}




let selectedCurrency = [];

function checkedCurrency() {   
    const checked = $(this).val().toUpperCase();
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
    selectedCurrency.forEach((currency, index) => {
        const listItem = $("#listItem").clone()
        listItem.css({ visibility: "visible" });
        listItem.find("span").text(selectedCurrency[index]);
        listItem.find("input").attr("id", `item-${index}`); 
        listItem.find("input").attr("value", selectedCurrency[index]);
        listItem.find("label").attr("for", `item-${index}`);
///change here as a test  "checkedCurrency" insted of "checkedCurrencyInModal"
        listItem.find("input").on("change", checkedCurrency)
        $("#modalListGroup").append(listItem);   
    })
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
        } 
        else {
            input.checked = false;            
        }  
    }

    $("#exampleModal").modal('hide');

}



function liveReportsPage() {
        emptyDivCoins()
        //spinner("divCoins")
        api.getCurrenciesPrice(selectedCurrency[0], selectedCurrency[1], selectedCurrency[2], selectedCurrency[3], selectedCurrency[4]).then((result) => {
            
        //console.log("current =", current_usd_rate_0)
        console.log("result =>",  result)
            
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
        
    }).catch(err => noDadaMessage())
      
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
    clearArray()
    const cloneCard = $("#aboutContent").clone();
    cloneCard.css({display: "inline-block"})
    $("#divCoins").append(cloneCard)

}


setInterval(function(){

    
}, 1000);



init()


