const canvas = document.getElementById("jsCanvas");
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;
 
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
let ctx = canvas.getContext('2d');
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.lineWidth = 2.5;

const colors = document.getElementsByClassName("jsColor");
let range = document.getElementById("jsRange");

let mode = document.getElementById("jsMode");
let save = document.getElementById("jsSave");
let clear = document.getElementById("jsClear");

let posObj = {
    xPos:0,
    yPos:0,
    color:"white"
};
let posList = [];

let painting = false;
let filling = false;

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;

    if(!painting){
         ctx.beginPath();
         ctx.moveTo(x, y);
    }
    else{
        posObj.xPos = x;
        posObj.yPos = y;
        posList.push(posObj);
        //console.log(posList);

        ctx.lineTo(x, y);
        ctx.stroke();
    }
}
function startPainting(){
    painting = true;
}
function stopPainting(){
    painting = false;
}
function handleColorClick(event){
    ctx.strokeStyle = event.target.style.backgroundColor;
    ctx.fillStyle = event.target.style.backgroundColor;
    //posObj.color = event.target.style.backgroundColor;
}
function handleRangeChange(event){
    ctx.lineWidth = event.target.value;
}
function handleModeClick(){
    if(filling == true){
        filling = false;
        mode.innerText = "Fill";
    }
    else{
        filling = true;
        mode.innerText = "Paint";
        ctx.fillStyle = ctx.strokeStyle;
    }
}
function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        //ctx.beginPath();
        for(i=0; i<posList.length; i++){
            console.log(posList[i].color, posList[i].xPos, posList[i].yPos);
            ctx.strokeStyle = posList[i].color;
            ctx.lineTo(posList[i].xPos, posList[i].yPos);
            ctx.stroke();
        }
    }
}
function handleCM(event){
    event.preventDefault();
}
function handleSaveClick(){
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "HansPaintJS[EXPORT]";
    link.click();
    //console.log(image);
}
function handleClearClick(){
    posList = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}
if(colors){
    Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));
}
if(range){
    range.addEventListener("input", handleRangeChange);
}
if(mode){
    mode.addEventListener("click", handleModeClick);
}
if(save){
    save.addEventListener("click", handleSaveClick);
}
if(clear){
    clear.addEventListener("click", handleClearClick);
}


