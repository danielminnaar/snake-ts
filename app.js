"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Grid_1 = require("./Grid");
var Snake_1 = require("./Snake");
var canvas;
var ctx;
var grid = new Grid_1.Grid(10, 50);
var snake;
function gameLoop() {
    requestAnimationFrame(gameLoop);
    snake.draw(ctx);
}
window.onload = function () {
    canvas = document.getElementById('cnvs');
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 1280, 720);
    grid.draw(ctx, true);
    snake = new Snake_1.Snake(grid.getGridCells());
    gameLoop();
};
