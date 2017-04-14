import { Grid } from "./Grid";
import { Snake } from "./Snake";

var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;
var grid: Grid = new Grid(10, 50);
var snake: Snake;

function gameLoop() {
   requestAnimationFrame(gameLoop);
   snake.draw(ctx);
}

window.onload = () => {
   canvas = <HTMLCanvasElement>document.getElementById('cnvs');
   ctx = canvas.getContext("2d");
   
   ctx.fillStyle = "black";
   ctx.fillRect(0, 0, 1280, 720);
   grid.draw(ctx, true);
   snake = new Snake(grid.getGridCells());
   gameLoop();
}