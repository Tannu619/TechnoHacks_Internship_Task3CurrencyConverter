
// input select box
var from = document.getElementById("fromCurrency");
var to = document.getElementById("toCurrency");

for(currency_code in country_list){
    if(currency_code == "USD"){
        to.innerHTML += `<option value="${currency_code}" selected >${currency_code}</option>`;
    }
    else if(currency_code == "INR"){
        from.innerHTML += `<option value="${currency_code}" selected >${currency_code}</option>`;
    }
    from.innerHTML += `<option value="${currency_code}">${currency_code}</option>`;
    to.innerHTML += `<option value="${currency_code}">${currency_code}</option>`;
};


// change flag
from.addEventListener("change",(e)=>{
    loadFlag(e.target);
    loadtoSymbol();
    loadfromSymbol();
});
to.addEventListener("change",(e)=>{
    loadFlag(e.target);
    loadtoSymbol();
    loadfromSymbol();
});

function loadFlag(element){
    for(code in country_list){
        if(code==element.value){
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagsapi.com/${country_list[code]}/shiny/64.png`;
        }
    }
}

// change currency symbol

function loadtoSymbol(){
    for(code in currencySymbol_list){
        if(code == to.value){
            let inputBox = document.getElementById("tosymbol");
            inputBox.innerHTML = currencySymbol_list[code];
        }
    }
}

function loadfromSymbol(){
    for(code in currencySymbol_list){
        if(code == from.value){
            let inputBox = document.getElementById("fromsymbol");
            inputBox.innerHTML = currencySymbol_list[code];
        }
    }
}


// button 
document.getElementById("ConvertBtn").addEventListener("click",(e)=>{
    e.preventDefault();
    convertor();
});

// on button click this function called
function convertor(){

    var from = document.getElementById("fromCurrency");
    var to = document.getElementById("toCurrency");

    // console.log(from.value);
    
    const host = 'api.frankfurter.app';

    var input_currency_val = getCurrenyValue();

    document.getElementById("result").value = "Getting Value ....";
    document.getElementById("result").style.fontSize = '1.3rem';
    fetch(`https://v6.exchangerate-api.com/v6/dd4907f6c22fdbae13c9852c/latest/${from.value}`).then((val)=>val.json()).then((val)=>{
        // console.log(val.conversion_rates[to.value]);
        document.getElementById("result").value = (val.conversion_rates[to.value]*input_currency_val);
        document.getElementById("result").style.fontSize = '2.3rem';
        document.getElementById("result").style.color = "#686e2d";
    }).catch(()=>{
        document.getElementById("result").value = "Something went wrong!";
        document.getElementById("result").style.fontSize = '1rem';
        document.getElementById("result").style.color = "red";
    });
}

//for input field
function getCurrenyValue(){
    var Currvalue = document.getElementById("Amount").value;
    if(Currvalue=='' || Currvalue==null || Currvalue==0){
        document.getElementById("Amount").value = 1;
        return 1;
    } 
    else{
        return Currvalue;
    }
}


//window events
window.addEventListener("resize",()=>{
    var swapBtn = document.getElementsByClassName("swapBtn");
    if(window.innerWidth < 1010){
        swapBtn[0].innerHTML = `<img width="40" height="40" src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/40/FFFFFF/external-swap-arrows-tanah-basah-basic-outline-tanah-basah-2.png" alt="external-swap-arrows-tanah-basah-basic-outline-tanah-basah-2"/>`;
    }
    else {
        swapBtn[0].innerHTML = ` <img width="60" height="60" src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/60/FFFFFF/external-swap-arrows-tanah-basah-basic-outline-tanah-basah.png" alt="external-swap-arrows-tanah-basah-basic-outline-tanah-basah"/>`;
    }
});

window.addEventListener("load",()=>{
    var swapBtn = document.getElementsByClassName("swapBtn");
    if(window.innerWidth < 1010){
        swapBtn[0].innerHTML = `<img width="40" height="40" id="swapBtn" src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/40/FFFFFF/external-swap-arrows-tanah-basah-basic-outline-tanah-basah-2.png" alt="external-swap-arrows-tanah-basah-basic-outline-tanah-basah-2"/>`;
    }
    else {
        swapBtn[0].innerHTML = ` <img width="60" height="60" id="swapBtn" src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/60/FFFFFF/external-swap-arrows-tanah-basah-basic-outline-tanah-basah.png" alt="external-swap-arrows-tanah-basah-basic-outline-tanah-basah"/>`;
    }

    convertor();
});

//for swap Button
const swapBtn = document.getElementById("swapBtn");
swapBtn.addEventListener("click", ()=> {
    var temp = from.value;
    from.value = to.value;
    to.value = temp;

    loadFlag(from);
    loadFlag(to);
    loadtoSymbol();
    loadfromSymbol();

    convertor();
}) ;
