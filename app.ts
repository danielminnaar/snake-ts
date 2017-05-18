import { Grid } from "./Grid";
import { Snake } from "./Snake";
import { Rectangle } from "./Rectangle";

var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;
var grid: Grid = new Grid(20);
var snake: Snake;
var rect: Rectangle;
var canvasWidth: number = 1280;
var canvasHeight: number = 720;
var drawGrid: boolean = false;
function gameLoop() {
     var interval = setInterval(function() {
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        //rect.draw(ctx, 1280, 720);
        if(drawGrid)
            grid.draw(ctx, canvasWidth, canvasHeight);
        snake.draw(ctx, canvasWidth, canvasHeight);
        
     }, 100);

   
}

window.onload = () => {
   canvas = <HTMLCanvasElement>document.getElementById('cnvs');
   ctx = canvas.getContext("2d");
   var gridCells = grid.generate(canvasWidth, canvasHeight);
   snake = new Snake(gridCells);
   rect = new Rectangle(100,100, 50, 50, "blue");
   document.addEventListener("keydown", (e) => {
        switch (e.which) {
            case 37: {
                snake.direction = "left";
                break;
            }
            case 38: {
                snake.direction = "up";
                break;
            }
            case 39: {
                snake.direction = "right";
                break;
            }
            case 40: {
                snake.direction = "down";
                break;
            }
            case 32: {
                toggleDebugMode();
                break;
            }
        }
   });          
   requestAnimationFrame(gameLoop);
    
}

function toggleDebugMode() {
    drawGrid = (!drawGrid);
}