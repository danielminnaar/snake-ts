(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rectangle_1 = require("./Rectangle");
var Grid = (function () {
    function Grid(grid_size, block_size, color, lineWidth) {
        if (color === void 0) { color = "blue"; }
        if (lineWidth === void 0) { lineWidth = 2; }
        this.gridSize = grid_size;
        this.blockSize = block_size;
        this.color = color;
        this.lineWidth = lineWidth;
        this.lastX = this.lineWidth;
        this.lastY = this.lineWidth;
        this.cells = new Array();
    }
    Grid.prototype.draw = function (ctx, visible) {
        if (visible === void 0) { visible = false; }
        ctx.lineWidth = 1;
        ctx.strokeStyle = this.color;
        var filled = false;
        var blocksToDraw = (this.gridSize * this.gridSize);
        var blockCount = 0;
        while (blockCount < blocksToDraw) {
            if (visible)
                this.drawGridBlock(ctx);
            this.cells.push(new Rectangle_1.Rectangle(this.lastX + this.lineWidth, this.lastY + this.lineWidth, this.blockSize, this.blockSize));
            if (this.currentBlockRight > this.totalGridSize) {
                this.lastY += this.blockSize;
                this.lastX = this.lineWidth;
            }
            else
                this.lastX += this.blockSize + this.lineWidth;
            blockCount++;
        }
    };
    Grid.prototype.getGridCells = function () {
        // Need to figure out a way of ensuring the cell sizes are neatly within the block sizes, given the line widths.
        return this.cells;
    };
    Grid.prototype.drawGridBlock = function (ctx) {
        ctx.strokeRect(this.lastX, this.lastY + this.lineWidth, this.blockSize, this.blockSize);
    };
    Object.defineProperty(Grid.prototype, "totalGridSize", {
        get: function () {
            return (this.gridSize * this.blockSize);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "currentBlockRight", {
        get: function () {
            return ((this.lastX + this.lineWidth) + this.blockSize);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "currentBlockBottom", {
        get: function () {
            return (this.lastY + this.lineWidth) + this.blockSize;
        },
        enumerable: true,
        configurable: true
    });
    return Grid;
}());
exports.Grid = Grid;
},{"./Rectangle":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rectangle = (function () {
    function Rectangle(x, y, width, height, color, lineWidth) {
        if (color === void 0) { color = "white"; }
        if (lineWidth === void 0) { lineWidth = 3; }
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.lineWidth = lineWidth;
    }
    Rectangle.prototype.draw = function (ctx) {
        throw new Error('Method not implemented.');
    };
    return Rectangle;
}());
exports.Rectangle = Rectangle;
},{}],3:[function(require,module,exports){
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
        ctx.fillStyle = "purple";
        for (var i = 0; i < this.SnakeCells.length; i++) {
            ctx.fillRect(this.SnakeCells[i].x, this.SnakeCells[i].y, this.SnakeCells[i].width, this.SnakeCells[i].height);
        }
    };
    return Snake;
}());
exports.Snake = Snake;
},{}],4:[function(require,module,exports){
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
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 1280, 720);
    grid.draw(ctx, true);
    snake = new Snake_1.Snake(grid.getGridCells());
    gameLoop();
};
},{"./Grid":1,"./Snake":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJHcmlkLnRzIiwiUmVjdGFuZ2xlLnRzIiwiU25ha2UudHMiLCJhcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0NBLHlDQUF3QztBQUV4QztJQXdESSxjQUFZLFNBQWlCLEVBQUUsVUFBa0IsRUFBRSxLQUFzQixFQUFFLFNBQXFCO1FBQTdDLHNCQUFBLEVBQUEsY0FBc0I7UUFBRSwwQkFBQSxFQUFBLGFBQXFCO1FBQzVGLElBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO1FBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDO1FBQzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUM1QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDNUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBYSxDQUFDO0lBQ3hDLENBQUM7SUE5REQsbUJBQUksR0FBSixVQUFLLEdBQVEsRUFBRSxPQUF3QjtRQUF4Qix3QkFBQSxFQUFBLGVBQXdCO1FBQ25DLEdBQUcsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLEdBQUcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUM3QixJQUFJLE1BQU0sR0FBWSxLQUFLLENBQUM7UUFDNUIsSUFBSSxZQUFZLEdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzRCxJQUFJLFVBQVUsR0FBVyxDQUFDLENBQUM7UUFDM0IsT0FBTSxVQUFVLEdBQUcsWUFBWSxFQUFFLENBQUM7WUFDOUIsRUFBRSxDQUFDLENB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O0lBQ2pELHFDQUFxQztJQUNyQyxPQUFPO0lBRVAsZ0RBQWdEO0lBQ2hELHFDQUFxQztJQUNyQyxPQUFPO0lBRVAsd0JBQXdCO0lBQ3hCLHdCQUF3QjtBQUN4QixDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0sR0FBRztJQUNiLE1BQU0sR0FBc0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1RCxHQUFHLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUU5QixHQUFHLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztJQUN4QixHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JCLEtBQUssR0FBRyxJQUFJLGFBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztJQUN2QyxRQUFRLEVBQUUsQ0FBQztBQUNkLENBQUMsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyBJU2hhcGUgfSBmcm9tICcuL0lTaGFwZSc7XHJcbmltcG9ydCB7IFJlY3RhbmdsZSB9IGZyb20gXCIuL1JlY3RhbmdsZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdyaWQgaW1wbGVtZW50cyBJU2hhcGUge1xyXG5cclxuICAgIGRyYXcoY3R4OiBhbnksIHZpc2libGU6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xyXG4gICAgICAgIGN0eC5saW5lV2lkdGggPSAxO1xyXG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHRoaXMuY29sb3I7XHJcbiAgICAgICAgdmFyIGZpbGxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBibG9ja3NUb0RyYXc6IG51bWJlciA9ICh0aGlzLmdyaWRTaXplICogdGhpcy5ncmlkU2l6ZSk7XHJcbiAgICAgICAgdmFyIGJsb2NrQ291bnQ6IG51bWJlciA9IDA7XHJcbiAgICAgICAgd2hpbGUoYmxvY2tDb3VudCA8IGJsb2Nrc1RvRHJhdykge1xyXG4gICAgICAgICAgICBpZiAodmlzaWJsZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd0dyaWRCbG9jayhjdHgpO1xyXG4gICAgICAgICAgICB0aGlzLmNlbGxzLnB1c2gobmV3IFJlY3RhbmdsZSh0aGlzLmxhc3RYICsgdGhpcy5saW5lV2lkdGgsIHRoaXMubGFzdFkgKyB0aGlzLmxpbmVXaWR0aCwgdGhpcy5ibG9ja1NpemUsIHRoaXMuYmxvY2tTaXplKSk7XHJcblxyXG4gICAgICAgICAgICBpZiggdGhpcy5jdXJyZW50QmxvY2tSaWdodCA+IHRoaXMudG90YWxHcmlkU2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0WSArPSB0aGlzLmJsb2NrU2l6ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGFzdFggPSB0aGlzLmxpbmVXaWR0aDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0WCArPSB0aGlzLmJsb2NrU2l6ZSArIHRoaXMubGluZVdpZHRoO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgYmxvY2tDb3VudCsrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0R3JpZENlbGxzKCk6IFJlY3RhbmdsZVtdIHtcclxuICAgICAgICAvLyBOZWVkIHRvIGZpZ3VyZSBvdXQgYSB3YXkgb2YgZW5zdXJpbmcgdGhlIGNlbGwgc2l6ZXMgYXJlIG5lYXRseSB3aXRoaW4gdGhlIGJsb2NrIHNpemVzLCBnaXZlbiB0aGUgbGluZSB3aWR0aHMuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2VsbHM7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0dyaWRCbG9jayhjdHg6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGN0eC5zdHJva2VSZWN0KHRoaXMubGFzdFgsIHRoaXMubGFzdFkgKyB0aGlzLmxpbmVXaWR0aCwgdGhpcy5ibG9ja1NpemUsIHRoaXMuYmxvY2tTaXplKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldCB0b3RhbEdyaWRTaXplKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLmdyaWRTaXplICogdGhpcy5ibG9ja1NpemUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0IGN1cnJlbnRCbG9ja1JpZ2h0KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuICgodGhpcy5sYXN0WCArIHRoaXMubGluZVdpZHRoKSArIHRoaXMuYmxvY2tTaXplKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldCBjdXJyZW50QmxvY2tCb3R0b20oKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMubGFzdFkgKyB0aGlzLmxpbmVXaWR0aCkgKyB0aGlzLmJsb2NrU2l6ZTtcclxuICAgIH1cclxuXHJcbiAgICBsYXN0WDogbnVtYmVyO1xyXG4gICAgbGFzdFk6IG51bWJlcjtcclxuICAgIHg6IG51bWJlcjtcclxuICAgIHk6IG51bWJlcjtcclxuICAgIGNvbG9yOiBzdHJpbmc7XHJcbiAgICBsaW5lV2lkdGg6IG51bWJlcjtcclxuICAgIGJsb2NrU2l6ZTogbnVtYmVyO1xyXG4gICAgZ3JpZFNpemU6IG51bWJlcjtcclxuICAgIGNlbGxzOiBSZWN0YW5nbGVbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihncmlkX3NpemU6IG51bWJlciwgYmxvY2tfc2l6ZTogbnVtYmVyLCBjb2xvcjogc3RyaW5nID0gXCJibHVlXCIsIGxpbmVXaWR0aDogbnVtYmVyID0gMikge1xyXG4gICAgICAgIHRoaXMuZ3JpZFNpemUgPSBncmlkX3NpemU7XHJcbiAgICAgICAgdGhpcy5ibG9ja1NpemUgPSBibG9ja19zaXplO1xyXG4gICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcclxuICAgICAgICB0aGlzLmxpbmVXaWR0aCA9IGxpbmVXaWR0aDtcclxuICAgICAgICB0aGlzLmxhc3RYID0gdGhpcy5saW5lV2lkdGg7XHJcbiAgICAgICAgdGhpcy5sYXN0WSA9IHRoaXMubGluZVdpZHRoO1xyXG4gICAgICAgIHRoaXMuY2VsbHMgPSBuZXcgQXJyYXk8UmVjdGFuZ2xlPigpO1xyXG4gICAgfVxyXG5cclxuXHJcbn0iLCJpbXBvcnQgeyBJU2hhcGUgfSBmcm9tIFwiLi9JU2hhcGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSZWN0YW5nbGUgaW1wbGVtZW50cyBJU2hhcGUge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgY29sb3I6IHN0cmluZyA9IFwid2hpdGVcIiwgbGluZVdpZHRoOiBudW1iZXIgPSAzKSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XHJcbiAgICAgICAgdGhpcy5saW5lV2lkdGggPSBsaW5lV2lkdGg7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGRyYXcoY3R4OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01ldGhvZCBub3QgaW1wbGVtZW50ZWQuJyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHdpZHRoOiBudW1iZXI7XHJcbiAgICBoZWlnaHQ6IG51bWJlcjtcclxuICAgIHg6IG51bWJlcjtcclxuICAgIHk6IG51bWJlcjtcclxuICAgIGNvbG9yOiBzdHJpbmc7XHJcbiAgICBsaW5lV2lkdGg6IG51bWJlcjtcclxuXHJcblxyXG59IiwiaW1wb3J0IHsgUmVjdGFuZ2xlIH0gZnJvbSBcIi4vUmVjdGFuZ2xlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU25ha2Uge1xyXG4gICAgY29uc3RydWN0b3IoZ3JpZDogUmVjdGFuZ2xlW10pIHtcclxuICAgICAgICB0aGlzLkdyaWQgPSBncmlkO1xyXG4gICAgICAgIHRoaXMuU25ha2VDZWxscyA9IG5ldyBBcnJheTxSZWN0YW5nbGU+KCk7XHJcbiAgICAgICAgdGhpcy5TbmFrZUNlbGxzLnB1c2godGhpcy5HcmlkWzBdKTtcclxuICAgICAgICB0aGlzLlNuYWtlQ2VsbHMucHVzaCh0aGlzLkdyaWRbMV0pO1xyXG4gICAgICAgIHRoaXMuU25ha2VDZWxscy5wdXNoKHRoaXMuR3JpZFsyXSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KGN0eDogYW55KSB7XHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwicHVycGxlXCI7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaTx0aGlzLlNuYWtlQ2VsbHMubGVuZ3RoO2krKykgIHtcclxuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHRoaXMuU25ha2VDZWxsc1tpXS54LCB0aGlzLlNuYWtlQ2VsbHNbaV0ueSwgIHRoaXMuU25ha2VDZWxsc1tpXS53aWR0aCwgdGhpcy5TbmFrZUNlbGxzW2ldLmhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEdyaWQ6IFJlY3RhbmdsZVtdO1xyXG4gICAgU25ha2VDZWxsczogUmVjdGFuZ2xlW107XHJcbn0iLCJpbXBvcnQgeyBHcmlkIH0gZnJvbSBcIi4vR3JpZFwiO1xyXG5pbXBvcnQgeyBTbmFrZSB9IGZyb20gXCIuL1NuYWtlXCI7XHJcblxyXG52YXIgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcclxudmFyIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xyXG52YXIgZ3JpZDogR3JpZCA9IG5ldyBHcmlkKDEwLCA1MCk7XHJcbnZhciBzbmFrZTogU25ha2U7XHJcblxyXG5mdW5jdGlvbiBnYW1lTG9vcCgpIHtcclxuICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGdhbWVMb29wKTtcclxuICAgc25ha2UuZHJhdyhjdHgpO1xyXG4gICBcclxuLy8gICAgaWYgKGNpcmNsZTEueCsrID49IDEyODAgKyBjaXJjbGUxLnJhZGl1cykge1xyXG4vLyAgICAgICBjaXJjbGUxLnggPSAtY2lyY2xlMS5yYWRpdXM7XHJcbi8vICAgIH1cclxuXHJcbi8vICAgIGlmIChjaXJjbGUyLnkrKyA+PSA3MjAgKyBjaXJjbGUyLnJhZGl1cykge1xyXG4vLyAgICAgICBjaXJjbGUyLnkgPSAtY2lyY2xlMi5yYWRpdXM7XHJcbi8vICAgIH1cclxuXHJcbi8vICAgIGNpcmNsZTEuZHJhdyhjdHgpO1xyXG4vLyAgICBjaXJjbGUyLmRyYXcoY3R4KTtcclxufVxyXG5cclxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcclxuICAgY2FudmFzID0gPEhUTUxDYW52YXNFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbnZzJyk7XHJcbiAgIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgIFxyXG4gICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xyXG4gICBjdHguZmlsbFJlY3QoMCwgMCwgMTI4MCwgNzIwKTtcclxuICAgZ3JpZC5kcmF3KGN0eCwgdHJ1ZSk7XHJcbiAgIHNuYWtlID0gbmV3IFNuYWtlKGdyaWQuZ2V0R3JpZENlbGxzKCkpO1xyXG4gICBnYW1lTG9vcCgpO1xyXG59Il19
