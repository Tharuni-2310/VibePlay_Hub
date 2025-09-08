const textbox=document.getElementById("textbox");
const toFahrenheit=document.getElementById("toFahrenheit");
const toCesius=document.getElementById("toCesius");
const result=document.getElementById("result");
let temp;
function convert(){
   if(toFahrenheit.checked){
      temp=Number(textbox.value);
      temp=temp*9/5+32;
      result.textContent=temp.toFixed(1)+"°F";
   }
   else if(toCesius.checked){
      temp=Number(textbox.value);
      temp=(temp-32)*(5/9);
      result.textContent=temp.toFixed(1)+"°C";
   }
   else{
    result.textContent="Select a unit";
   }
}