async function init() {


    api.getCurrencies().then((result) => {
        currencies = result.slice(0, 10)
        // .map(currency => currency);
        getCurrenciesNameSymble(currencies);
    })




}


function search(searchBy, value, data) {
    const result = [];
    if (!Array.isArray(data) || !searchBy || !value) return data;
    for (let index = 0; index < data.length; index++) {
      // if (data[index][searchBy] === value.toLowerCase()) {
      if (data[index]["symbol"].includes(value.toLowerCase())) {
        result.push(data[index]);
      }
    }
    // return data.filter((car) => {
    //     return car[searchBy].includes(value.toLowerCase())
    // })
    console.log(result)
    return result;
 
  }
  

$("#searchInput").on("keyup", searchAction)

function searchAction () {

    api.getCurrencies().then((result) => {
        currencies = result.slice(0, 10)
        // .map(currency => currency);
        draw(search("name", $(this).val(), currencies))
     
       
    })


}




//$("#home").on("click", init)
$("#reports").on("click", showReports);

function getCurrenciesNameSymble(currencies) {
    const currenciesNameSymbol = currencies.map((currency) => {
        const { name, symbol } = currency;
        return { name, symbol };
    })
    draw(currenciesNameSymbol);
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

        clonedCard.find(".infoBtn").attr("alt", currenciesNameSymbol[index].name);

        clonedCard.find(".infoBtn").attr("data-target", `#a${currenciesNameSymbol[index].name}`);
        clonedCard.find(".infoBtn").attr("aria-controls", `a${currenciesNameSymbol[index].name}`);

        clonedCard.find("#moreInfo").attr("id", `a${currenciesNameSymbol[index].name}`);




        clonedCard.find(".infoBtn").on("click", function (event) {
            searchinfo(event.target.alt.toLowerCase(), event)
            //console.log(event.toElement.parentElement.parentElement)
        })
        clonedCard.find("label").attr("for", currenciesNameSymbol[index].symbol);
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





function showReports() {
    $("#divCoins").html("<h1>adir</h1>")



}


let selectedCurrency = [];

function checkedCurrency() {
    const checked = $(this).val().toUpperCase();
    $(this.parentElement.parentElement.parentElement.parentElement.parentElement).toggleClass("bg-silver-coin");
    if ($(this).is(':checked')) {

        selectedCurrency.push(checked);
        
        // const clonedListItem = $(this.parentElement).clone();
        // clonedListItem.append(checked);
        // $(".list-group").append(clonedListItem);
        
        if (selectedCurrency.length > 2) {
            $("#exampleModal").modal();
            
            $(this).prop('checked', false)
            $(this.parentElement.parentElement.parentElement.parentElement.parentElement).toggleClass("bg-silver-coin");
            selectedCurrency.splice($.inArray(checked, selectedCurrency), 1);
        }
    } 
    else {
        $(this).prop('checked', false)
        selectedCurrency.splice($.inArray(checked, selectedCurrency), 1);
    }



    console.log(selectedCurrency)

    api.getCurrenciesPrice(selectedCurrency[0], selectedCurrency[1], selectedCurrency[2], selectedCurrency[3], selectedCurrency[4]).then((result) => {
        console.log(result)
    })

}

init()







/*


let selectedCurrency = [];
function checkedCurrency () {
    const checked = $(this).val().toUpperCase();
    if ($(this).is(':checked')) {
        selectedCurrency.push(checked);
        if (selectedCurrency.length > 2) {
            selectedCurrency.forEach((currency, index) =>{
                const clonedListItem = $("#modalListItem").clone();
                clonedListItem.find("#spanID").text(currency);
                $(".list-group").append(clonedListItem);

            })
            $("#exampleModal").modal();
          this.checked = false;
          selectedCurrency.splice(selectedCurrency.length - 1,1);
          return;
        }
    } else {
      selectedCurrency.splice($.inArray(checked, selectedCurrency),1);
    }
    console.log(selectedCurrency)



   api.getCurrenciesPrice(selectedCurrency[0], selectedCurrency[1], selectedCurrency[2], selectedCurrency[3], selectedCurrency[4]).then((result) => {
      console.log(result)
   })

}





2)=======================================================================================

function checkedCurrency () {
    const checked = $(this).val().toUpperCase();
    if ($(this).is(':checked')) {
        selectedCurrency.push(checked);
        if (selectedCurrency.length > 2) {

            $("#exampleModal").modal("show").on("shown.bs.modal", function() {
                selectedCurrency.forEach((currency, index) =>{
                    const clonedListItem = $("#modalListItem").clone();
                    clonedListItem.find("#spanID").text(currency);
                    $(".list-group").append(clonedListItem);

                })

                $("#modalListItem").remove();


              });

            }


        //  this.checked = false;
        //  selectedCurrency.splice(selectedCurrency.length - 1,1);
          return;

    } else {
      selectedCurrency.splice($.inArray(checked, selectedCurrency),1);
    }
    console.log(selectedCurrency)



   api.getCurrenciesPrice(selectedCurrency[0], selectedCurrency[1], selectedCurrency[2], selectedCurrency[3], selectedCurrency[4]).then((result) => {
      console.log(result)
   })

}


*/