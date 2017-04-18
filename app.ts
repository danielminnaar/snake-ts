import { Grid } from "./Grid";
import { Snake } from "./Snake";
import { Rectangle } from "./Rectangle";

var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;
var grid: Grid = new Grid(100);
var snake: Snake;
var rect: Rectangle;

function gameLoop() {
     var interval = setInterval(function() {
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 1280, 720);
        //rect.draw(ctx, 1280, 720);
        grid.draw(ctx, 1280, 720);
        snake.draw(ctx, 1280, 720);
        
     }, 100);

   
}

window.onload = () => {
   canvas = <HTMLCanvasElement>document.getElementById('cnvs');
   ctx = canvas.getContext("2d");
   var gridCells = grid.generate(1280, 720);
   snake = new Snake(gridCells);
   rect = new Rectangle(100,100, 50, 50, "blue");
   requestAnimationFrame(gameLoop);
}