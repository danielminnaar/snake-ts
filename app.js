"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Circle_1 = require("./Circle");
var Grid_1 = require("./Grid");
var canvas;
var ctx;
var circle1 = new Circle_1.Circle(200, 300, 50);
var circle2 = new Circle_1.Circle(400, 550, 150, "blue", 5);
var grid = new Grid_1.Grid(10, 50);
function gameLoop() {
    requestAnimationFrame(gameLoop);
    //    if (circle1.x++ >= 1280 + circle1.radius) {
    //       circle1.x = -circle1.radius;
    //    }
    //    if (circle2.y++ >= 720 + circle2.radius) {
    //       circle2.y = -circle2.radius;
    //    }
    //    circle1.draw(ctx);
    //    circle2.draw(ctx);
}
window.onload = function () {
    canvas = document.getElementById('cnvs');
    ctx = canvas.getContext("2d");
    gameLoop();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 1280, 720);
    grid.draw(ctx);
};
//# sourceMappingURL=app.js.map