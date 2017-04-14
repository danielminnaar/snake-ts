"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Snake = (function () {
    function Snake(grid) {
        this.Grid = grid;
        this.SnakeCells = new Array();
        this.SnakeCells.push(this.Grid[0]);
        this.SnakeCells.push(this.Grid[1]);
        this.SnakeCells.push(this.Grid[2]);
    }
    Snake.prototype.draw = function (ctx) {
        ctx.fillStyle = "yellow";
        for (var i = 0; i < this.SnakeCells.length; i++) {
            ctx.fillRect(this.SnakeCells[i].x, this.SnakeCells[i].y, this.SnakeCells[i].width, this.SnakeCells[i].height);
        }
    };
    return Snake;
}());
exports.Snake = Snake;
