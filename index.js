let runningTotal = 0;
let buffer = "0";
let previousOperator;
const screen = document.querySelector(".screen");



function handleSymbol(value){
   if(value === "C")
   {
      buffer = "0";
      runningTotal = 0;
   }
   else if(value === "="){
    if (previousOperator === null) {
      return;
    }
       flushOperation(parseInt(buffer));
       previousOperator = null;
       buffer = +runningTotal;
       runningTotal = 0;
   }
   else if(value === "←"){
      if(buffer.length === 1)
      {
        buffer = "0";
      }
      else
      {
        buffer = buffer.substring(0, buffer.length - 1);
      }
   }
   else{
      handleMath(value);
   }
}

function handleMath(value){
    if(buffer === "0")
         return ;
    const intBuffer = parseInt(buffer);
    
    if(runningTotal === 0){
        runningTotal = intBuffer;
    }
    else{
        flushOperation(intBuffer);
    }
    previousOperator = value;

    buffer =  "0";
}

function flushOperation(intBuffer){
  
  if(previousOperator === "x") {
    runningTotal *= intBuffer;
  } else if(previousOperator === "+") {
    runningTotal += intBuffer;
  } else if(previousOperator === "-") {
    runningTotal -= intBuffer;
  }
  else if(previousOperator === "/")
  {
    runningTotal /= intBuffer;
  }
}

function handleNumber(value){
  if(buffer === "0")
  {
    buffer = value;
  }
  else{
    buffer+= value;
  }
}

function buttonClick(value){
    if(isNaN(value))
    {
      handleSymbol(value);
    }
    else
    {
      handleNumber(value);
    }
    rerender();
}
function rerender(){
  screen.innerText = buffer;
}
  function init() {
    document.querySelector(".buttons-part")
    .addEventListener("click", function(event) {
      buttonClick(event.target.innerText);
    });
  }
  
  init();
