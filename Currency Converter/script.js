const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";
const dropdown = document.querySelectorAll("select");


const fromCurr=document.querySelector(".from select");

const toCurr=document.querySelector(".to select");

const btn=document.querySelector("button");

const msg=document.querySelector(".msg");

for (let select of dropdown) {
  for (let code in countryList) {
    let option = document.createElement("option");
    option.setAttribute("value", code);
    option.innerText = code;  
    if(select.name=="from"&&code=="USD"){
        option.selected=true;
    }
    else if(select.name=="to"&&code=="INR"){
        option.selected=true;
    }
    select.append(option);
  }
  select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
  });
}
const updateExchangeRate=async ()=>{
    let input=document.querySelector(".amount input");
    let amount=input.value;
    if(amount===""||amount<1){
        amount=1;
        input.value="1";
    }

    const URL=`${BASE_URL}${fromCurr.value.toLowerCase()}.min.json`;
    let response=await fetch(URL);
    let data=await response.json();
    console.log(data);
    let fromValue=fromCurr.value.toLowerCase();
    let toValue=toCurr.value.toLowerCase();
    let rate=data[fromValue][toValue];
    let finalAmount=amount*rate;
    msg.innerText=`${amount} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}
const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newsrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.previousElementSibling;
    img.src=newsrc;
}


btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
   updateExchangeRate();
});
window.addEventListener("load",()=>{
    updateExchangeRate();
})