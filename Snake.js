"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Snake = (function () {
    function Snake(grid) {
        this.direction = "left";
        this.grid = grid;
        this.snakeCells = new Array();
        this.snakeCells.push(this.grid[0]);
        //this.snakeCells.push(this.grid[1]);
        //this.snakeCells.push(this.grid[2]);
    }
    Snake.prototype.draw = function (ctx) {
        ctx.fillStyle = "red";
        for (var i = 0; i < this.snakeCells.length; i++) {
            ctx.fillRect(this.snakeCells[i].x, this.snakeCells[i].y, this.snakeCells[i].width, this.snakeCells[i].height);
            switch (this.direction) {
                case "left": {
                    debugger;
                    // Move the snake cell to the previous x-cell in the grid
                    this.snakeCells[i].x = this.getNextLeftGridCell(this.snakeCells[i].x, this.snakeCells[i].y).x;
                }
            }
        }
    };
    Snake.prototype.getNextLeftGridCell = function (x, y) {
        var leftCells = this.grid.filter(function (gc) { return gc.y == y && gc.x < x; });
        if (leftCells && leftCells.length > 0) {
            // Find the closest x position in the grid
            return leftCells[0];
        }
        else {
            var rightCells = this.grid.filter(function (gc) { return gc.y == y && gc.x > x; });
            var mostRight = x;
            rightCells.forEach(function (rc) {
                if (rc.x > mostRight)
                    mostRight = rc.x;
            });
            return rightCells.filter(function (rc) { return rc.x == mostRight; })[0];
        }
    };
    return Snake;
}());
exports.Snake = Snake;
