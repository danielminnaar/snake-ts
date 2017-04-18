"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Grid_1 = require("./Grid");
var Snake_1 = require("./Snake");
var Rectangle_1 = require("./Rectangle");
var canvas;
var ctx;
var grid = new Grid_1.Grid(100);
var snake;
var rect;
function gameLoop() {
    var interval = setInterval(function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 1280, 720);
        rect.draw(ctx, 1280, 720);
        //grid.draw(ctx);
        //snake.draw(ctx);
        requestAnimationFrame(gameLoop);
    }, 500);
}
window.onload = function () {
    canvas = document.getElementById('cnvs');
    ctx = canvas.getContext("2d");
    var gridCells = grid.generate(1280, 720);
    snake = new Snake_1.Snake(gridCells);
    rect = new Rectangle_1.Rectangle(100, 100, 50, 50, "blue");
    gameLoop();
};
