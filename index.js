const colorList = 
  {
    red: "red",
    orange: "orange",
    yellow: "yellow",
    green: "rgb(0, 198, 0)" ,
    aqua: "rgb(0, 221, 255)" ,
    blue: "blue",
    indigo: "rgb(32, 0, 128)",
    purple: "purple",
    darkgray: "rgb(58, 58, 58)",
    black: "black",
    darkred: "darkred",
    brown: "brown",
    lightyellow: "rgb(253, 255, 137)",
    lightgreen: "rgb(123, 255, 0)",
    teal: "teal",
    skyblue: "rgb(81, 188, 255)",
    periwinkle: "rgb(139, 157, 255)",
    pink: "rgb(255, 85, 113)",
    lightgray: "rgb(153, 153, 153)",
    white: "white",
  };

let count = 0;

const Switch = document.querySelector(".switcharrow");
const canvasBoard = document.querySelector(".canvas table");

let Rows = {}
let Pixels = {}

const handlePixelEvents = () => {
  Pixels.forEach((index) => {
    index.onmouseover = (e) =>{
  
      index.style.cursor= "default";
  
      e.target.style.outline = "0.1px solid black"
      if(mouseDown==1){
        e.target.style.backgroundColor = Selection.primary;
      }
      
    }
    index.onmouseout = (e) =>{
  
      index.style.cursor= "auto";
      e.target.style.outline = "0px";
    }
  
    index.onmousedown = (e) => {
        e.target.style.backgroundColor = Selection.primary;
    }
  })
}

const initCanvas = () => {
  canvasBoard.innerHTML = "";

  for (tri=0; tri<24; tri++){
    const pixelrow = document.createElement("tr");
    canvasBoard.appendChild(pixelrow)
    
    for(tdi=0; tdi<48; tdi++){
      const pixel = document.createElement("td");
      pixel.style.backgroundColor = "white";
      pixelrow.appendChild(pixel);
    }
  
  }

  Pixels = document.querySelectorAll(".canvas table td");

  handlePixelEvents();

}

initCanvas();

Rows = document.querySelectorAll(".palette tr");
Object.keys(Rows).forEach((index) => {
  
  for (let i = 0; i< 10; i++){
    Rows[index].appendChild(document.createElement('td'));
    let bgColor = Object.values(colorList)[count];
    
    document.querySelectorAll('.palette td')[count].style.backgroundColor = bgColor;
    console.log(document.querySelectorAll('.palette td')[0]);
    count++;
  }
})

const firstColor = document.querySelector(".primary");
const secondColor = document.querySelector(".secondary");

const Palette = document.querySelectorAll(".palette td");  
const Selection = {
  primary : "black",
  secondary : "white",
};

let mouseDown = 0;

const clearButton = document.querySelector(".clear-btn button")

canvasBoard.onmousedown = function() { 
  mouseDown = 1;
  console.log(mouseDown)
  // canvasBoard.addEventListener("mouseover", (e)=>{
  //   e.target
  //   // e.target.styles.backgroundColor = Selection.primary;
  // })
}
canvasBoard.onmouseup = function() {
  mouseDown = 0;
  console.log(mouseDown);
}

clearButton.onclick = function (e){
  e.preventDefault();
  initCanvas();
}

const updateSelector = (primary, secondary) => {
  Selection.primary = primary;
  Selection.secondary = secondary;

  firstColor.style.backgroundColor = primary;
  secondColor.style.backgroundColor = secondary;
}

Palette.forEach((index) => {
  index.onmouseover = (e) =>{

    index.style.cursor= "pointer";

    e.target.style.outline = "0.1px solid black"
  }
  index.onmouseout = (e) =>{

    index.style.cursor= "auto";
    e.target.style.outline = "0px"
  }
  index.onmousedown = (e) => {
    updateSelector(e.target.style.backgroundColor, Selection.secondary);
  }

})

window.addEventListener('keydown', (e) => {
  Switch.click();
})

Switch.addEventListener('click', (e) => {
  updateSelector(Selection.secondary, Selection.primary);
})