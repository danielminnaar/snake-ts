(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rectangle_1 = require("./Rectangle");
var Grid = (function () {
    function Grid(block_size, color, lineWidth) {
        if (color === void 0) { color = "blue"; }
        if (lineWidth === void 0) { lineWidth = 2; }
        this.blockSize = block_size;
        this.color = color;
        this.lineWidth = lineWidth;
        this.lastX = 0;
        this.lastY = 0;
        this.cells = new Array();
    }
    Grid.prototype.generate = function (maxX, maxY) {
        var horizontalBlocks = maxX / this.blockSize;
        var verticalBlocks = maxY / this.blockSize;
        // The gridSize should be the smaller of the two
        this.gridSize = Math.round((horizontalBlocks > verticalBlocks ? verticalBlocks : horizontalBlocks));
        var blocksToDraw = (this.gridSize * this.gridSize);
        var blockCount = 0;
        while (blockCount < blocksToDraw) {
            this.cells.push(new Rectangle_1.Rectangle(this.lastX, this.lastY, this.blockSize, this.blockSize));
            if (this.currentBlockRight > this.totalGridSize) {
                this.lastY += this.blockSize;
                this.lastX = 0;
            }
            else
                this.lastX += this.blockSize + this.lineWidth;
            blockCount++;
        }
        return this.cells;
    };
    Grid.prototype.draw = function (ctx) {
        var _this = this;
        ctx.lineWidth = 1;
        ctx.strokeStyle = this.color;
        if (this.cells) {
            this.cells.forEach(function (cell) {
                _this.drawGridBlock(ctx, cell);
            });
        }
    };
    Grid.prototype.drawGridBlock = function (ctx, block) {
        ctx.strokeRect(block.x, block.y, block.width, block.height);
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
},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Grid_1 = require("./Grid");
var Snake_1 = require("./Snake");
var canvas;
var ctx;
var grid = new Grid_1.Grid(100);
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
    var gridCells = grid.generate(1280, 720);
    grid.draw(ctx);
    snake = new Snake_1.Snake(gridCells);
    gameLoop();
};
},{"./Grid":1,"./Snake":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJHcmlkLnRzIiwiUmVjdGFuZ2xlLnRzIiwiU25ha2UudHMiLCJhcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0NBLHlDQUF3QztBQUV4QztJQThESSxjQUFZLFVBQWtCLEVBQUUsS0FBc0IsRUFBRSxTQUFxQjtRQUE3QyxzQkFBQSxFQUFBLGNBQXNCO1FBQUUsMEJBQUEsRUFBQSxhQUFxQjtRQUN6RSxJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQztRQUM1QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBYSxDQUFDO0lBQ3hDLENBQUM7SUFuRUQsdUJBQVEsR0FBUixVQUFTLElBQVksRUFBRSxJQUFZO1FBQy9CLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDN0MsSUFBSSxjQUFjLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDM0MsZ0RBQWdEO1FBQ2hELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLGdCQUFnQixHQUFHLGNBQWMsR0FBRyxjQUFjLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1FBRXBHLElBQUksWUFBWSxHQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0QsSUFBSSxVQUFVLEdBQVcsQ0FBQyxDQUFDO1FBQzNCLE9BQU0sVUFBVSxHQUFHLFlBQVksRUFBRSxDQUFDO1lBRTlCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUkscUJBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUV2RixFQUFFLENBQUEsQ0FBRSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQzlDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDbkIsQ0FBQztZQUNELElBQUk7Z0JBQ0EsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFFbEQsVUFBVSxFQUFFLENBQUM7UUFDakIsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxtQkFBSSxHQUFKLFVBQUssR0FBUTtRQUFiLGlCQVFDO1FBUEcsR0FBRyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbEIsR0FBRyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzdCLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO2dCQUNuQixLQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNsQyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7SUFDTCxDQUFDO0lBRU8sNEJBQWEsR0FBckIsVUFBc0IsR0FBUSxFQUFFLEtBQWdCO1FBQzVDLEdBQUcsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCxzQkFBWSwrQkFBYTthQUF6QjtZQUNJLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVDLENBQUM7OztPQUFBO0lBRUQsc0JBQVksbUNBQWlCO2FBQTdCO1lBQ0ksTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUQsQ0FBQzs7O09BQUE7SUFFRCxzQkFBWSxvQ0FBa0I7YUFBOUI7WUFDSSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzFELENBQUM7OztPQUFBO0lBc0JMLFdBQUM7QUFBRCxDQXhFQSxBQXdFQyxJQUFBO0FBeEVZLG9CQUFJOzs7O0FDRGpCO0lBRUksbUJBQVksQ0FBUyxFQUFFLENBQVMsRUFBRSxLQUFhLEVBQUUsTUFBYyxFQUFFLEtBQXVCLEVBQUUsU0FBcUI7UUFBOUMsc0JBQUEsRUFBQSxlQUF1QjtRQUFFLDBCQUFBLEVBQUEsYUFBcUI7UUFDM0csSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNYLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQy9CLENBQUM7SUFFRCx3QkFBSSxHQUFKLFVBQUssR0FBUTtRQUNULE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBVUwsZ0JBQUM7QUFBRCxDQXZCQSxBQXVCQyxJQUFBO0FBdkJZLDhCQUFTOzs7O0FDQXRCO0lBQ0ksZUFBWSxJQUFpQjtRQTJDN0IsY0FBUyxHQUFXLE1BQU0sQ0FBQztRQTFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLEtBQUssRUFBYSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQyxxQ0FBcUM7UUFDckMscUNBQXFDO0lBRXpDLENBQUM7SUFFTSxvQkFBSSxHQUFYLFVBQVksR0FBUTtRQUNoQixHQUFHLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN0QixHQUFHLENBQUEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFHLENBQUM7WUFDM0MsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQy9HLE1BQU0sQ0FBQSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixLQUFLLE1BQU0sRUFBRSxDQUFDO29CQUNWLFFBQVEsQ0FBQztvQkFDVCx5REFBeUQ7b0JBQ3pELElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEcsQ0FBQztZQUVMLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUVPLG1DQUFtQixHQUEzQixVQUE0QixDQUFTLEVBQUUsQ0FBUztRQUMxQyxJQUFJLFNBQVMsR0FBZ0IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBQSxFQUFFLElBQUksT0FBQSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBckIsQ0FBcUIsQ0FBQyxDQUFDO1FBQzNFLEVBQUUsQ0FBQSxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckMsMENBQTBDO1lBQzFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEIsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxVQUFVLEdBQWdCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQXJCLENBQXFCLENBQUMsQ0FBQztZQUM1RSxJQUFJLFNBQVMsR0FBVyxDQUFDLENBQUM7WUFDMUIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEVBQUU7Z0JBQ2pCLEVBQUUsQ0FBQSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDO29CQUNoQixTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN6QixDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsRUFBRSxDQUFDLENBQUMsSUFBSSxTQUFTLEVBQWpCLENBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2RCxDQUFDO0lBQ1AsQ0FBQztJQU1MLFlBQUM7QUFBRCxDQTlDQSxBQThDQyxJQUFBO0FBOUNZLHNCQUFLOzs7O0FDRmxCLCtCQUE4QjtBQUM5QixpQ0FBZ0M7QUFFaEMsSUFBSSxNQUF5QixDQUFDO0FBQzlCLElBQUksR0FBNkIsQ0FBQztBQUNsQyxJQUFJLElBQUksR0FBUyxJQUFJLFdBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMvQixJQUFJLEtBQVksQ0FBQztBQUVqQjtJQUNHLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbkIsQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLEdBQUc7SUFDYixNQUFNLEdBQXNCLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUQsR0FBRyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFOUIsR0FBRyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7SUFDeEIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM5QixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2YsS0FBSyxHQUFHLElBQUksYUFBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzdCLFFBQVEsRUFBRSxDQUFDO0FBQ2QsQ0FBQyxDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7IElTaGFwZSB9IGZyb20gJy4vSVNoYXBlJztcclxuaW1wb3J0IHsgUmVjdGFuZ2xlIH0gZnJvbSBcIi4vUmVjdGFuZ2xlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgR3JpZCBpbXBsZW1lbnRzIElTaGFwZSB7XHJcblxyXG4gICAgZ2VuZXJhdGUobWF4WDogbnVtYmVyLCBtYXhZOiBudW1iZXIpOiBSZWN0YW5nbGVbXSB7XHJcbiAgICAgICAgdmFyIGhvcml6b250YWxCbG9ja3MgPSBtYXhYIC8gdGhpcy5ibG9ja1NpemU7XHJcbiAgICAgICAgdmFyIHZlcnRpY2FsQmxvY2tzID0gbWF4WSAvIHRoaXMuYmxvY2tTaXplO1xyXG4gICAgICAgIC8vIFRoZSBncmlkU2l6ZSBzaG91bGQgYmUgdGhlIHNtYWxsZXIgb2YgdGhlIHR3b1xyXG4gICAgICAgIHRoaXMuZ3JpZFNpemUgPSBNYXRoLnJvdW5kKChob3Jpem9udGFsQmxvY2tzID4gdmVydGljYWxCbG9ja3MgPyB2ZXJ0aWNhbEJsb2NrcyA6IGhvcml6b250YWxCbG9ja3MpKTtcclxuXHJcbiAgICAgICAgdmFyIGJsb2Nrc1RvRHJhdzogbnVtYmVyID0gKHRoaXMuZ3JpZFNpemUgKiB0aGlzLmdyaWRTaXplKTtcclxuICAgICAgICB2YXIgYmxvY2tDb3VudDogbnVtYmVyID0gMDtcclxuICAgICAgICB3aGlsZShibG9ja0NvdW50IDwgYmxvY2tzVG9EcmF3KSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmNlbGxzLnB1c2gobmV3IFJlY3RhbmdsZSh0aGlzLmxhc3RYLCB0aGlzLmxhc3RZLCB0aGlzLmJsb2NrU2l6ZSwgdGhpcy5ibG9ja1NpemUpKTtcclxuXHJcbiAgICAgICAgICAgIGlmKCB0aGlzLmN1cnJlbnRCbG9ja1JpZ2h0ID4gdGhpcy50b3RhbEdyaWRTaXplKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RZICs9IHRoaXMuYmxvY2tTaXplO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0WCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMubGFzdFggKz0gdGhpcy5ibG9ja1NpemUgKyB0aGlzLmxpbmVXaWR0aDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGJsb2NrQ291bnQrKztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2VsbHM7XHJcbiAgICB9IFxyXG5cclxuICAgIGRyYXcoY3R4OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBjdHgubGluZVdpZHRoID0gMTtcclxuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSB0aGlzLmNvbG9yO1xyXG4gICAgICAgIGlmKHRoaXMuY2VsbHMpIHtcclxuICAgICAgICAgICAgdGhpcy5jZWxscy5mb3JFYWNoKGNlbGwgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3R3JpZEJsb2NrKGN0eCwgY2VsbCk7ICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3R3JpZEJsb2NrKGN0eDogYW55LCBibG9jazogUmVjdGFuZ2xlKTogdm9pZCB7XHJcbiAgICAgICAgY3R4LnN0cm9rZVJlY3QoYmxvY2sueCwgYmxvY2sueSwgYmxvY2sud2lkdGgsIGJsb2NrLmhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXQgdG90YWxHcmlkU2l6ZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5ncmlkU2l6ZSAqIHRoaXMuYmxvY2tTaXplKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldCBjdXJyZW50QmxvY2tSaWdodCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAoKHRoaXMubGFzdFggKyB0aGlzLmxpbmVXaWR0aCkgKyB0aGlzLmJsb2NrU2l6ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXQgY3VycmVudEJsb2NrQm90dG9tKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLmxhc3RZICsgdGhpcy5saW5lV2lkdGgpICsgdGhpcy5ibG9ja1NpemU7XHJcbiAgICB9XHJcblxyXG4gICAgbGFzdFg6IG51bWJlcjtcclxuICAgIGxhc3RZOiBudW1iZXI7XHJcbiAgICB4OiBudW1iZXI7XHJcbiAgICB5OiBudW1iZXI7XHJcbiAgICBjb2xvcjogc3RyaW5nO1xyXG4gICAgbGluZVdpZHRoOiBudW1iZXI7XHJcbiAgICBibG9ja1NpemU6IG51bWJlcjtcclxuICAgIGdyaWRTaXplOiBudW1iZXI7XHJcbiAgICBjZWxsczogUmVjdGFuZ2xlW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoYmxvY2tfc2l6ZTogbnVtYmVyLCBjb2xvcjogc3RyaW5nID0gXCJibHVlXCIsIGxpbmVXaWR0aDogbnVtYmVyID0gMikge1xyXG4gICAgICAgIHRoaXMuYmxvY2tTaXplID0gYmxvY2tfc2l6ZTtcclxuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XHJcbiAgICAgICAgdGhpcy5saW5lV2lkdGggPSBsaW5lV2lkdGg7XHJcbiAgICAgICAgdGhpcy5sYXN0WCA9IDA7XHJcbiAgICAgICAgdGhpcy5sYXN0WSA9IDA7XHJcbiAgICAgICAgdGhpcy5jZWxscyA9IG5ldyBBcnJheTxSZWN0YW5nbGU+KCk7XHJcbiAgICB9XHJcblxyXG5cclxufSIsImltcG9ydCB7IElTaGFwZSB9IGZyb20gXCIuL0lTaGFwZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJlY3RhbmdsZSBpbXBsZW1lbnRzIElTaGFwZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBjb2xvcjogc3RyaW5nID0gXCJ3aGl0ZVwiLCBsaW5lV2lkdGg6IG51bWJlciA9IDMpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcclxuICAgICAgICB0aGlzLmxpbmVXaWR0aCA9IGxpbmVXaWR0aDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZHJhdyhjdHg6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC4nKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgd2lkdGg6IG51bWJlcjtcclxuICAgIGhlaWdodDogbnVtYmVyO1xyXG4gICAgeDogbnVtYmVyO1xyXG4gICAgeTogbnVtYmVyO1xyXG4gICAgY29sb3I6IHN0cmluZztcclxuICAgIGxpbmVXaWR0aDogbnVtYmVyO1xyXG5cclxuXHJcbn0iLCJpbXBvcnQgeyBSZWN0YW5nbGUgfSBmcm9tIFwiLi9SZWN0YW5nbGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTbmFrZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihncmlkOiBSZWN0YW5nbGVbXSkge1xyXG4gICAgICAgIHRoaXMuZ3JpZCA9IGdyaWQ7XHJcbiAgICAgICAgdGhpcy5zbmFrZUNlbGxzID0gbmV3IEFycmF5PFJlY3RhbmdsZT4oKTtcclxuICAgICAgICB0aGlzLnNuYWtlQ2VsbHMucHVzaCh0aGlzLmdyaWRbMF0pO1xyXG4gICAgICAgIC8vdGhpcy5zbmFrZUNlbGxzLnB1c2godGhpcy5ncmlkWzFdKTtcclxuICAgICAgICAvL3RoaXMuc25ha2VDZWxscy5wdXNoKHRoaXMuZ3JpZFsyXSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KGN0eDogYW55KSB7XHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwicmVkXCI7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaTx0aGlzLnNuYWtlQ2VsbHMubGVuZ3RoO2krKykgIHtcclxuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHRoaXMuc25ha2VDZWxsc1tpXS54LCB0aGlzLnNuYWtlQ2VsbHNbaV0ueSwgIHRoaXMuc25ha2VDZWxsc1tpXS53aWR0aCwgdGhpcy5zbmFrZUNlbGxzW2ldLmhlaWdodCk7XHJcbiAgICAgICAgICAgIHN3aXRjaCh0aGlzLmRpcmVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImxlZnRcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIE1vdmUgdGhlIHNuYWtlIGNlbGwgdG8gdGhlIHByZXZpb3VzIHgtY2VsbCBpbiB0aGUgZ3JpZFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc25ha2VDZWxsc1tpXS54ID0gdGhpcy5nZXROZXh0TGVmdEdyaWRDZWxsKHRoaXMuc25ha2VDZWxsc1tpXS54LCB0aGlzLnNuYWtlQ2VsbHNbaV0ueSkueDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0TmV4dExlZnRHcmlkQ2VsbCh4OiBudW1iZXIsIHk6IG51bWJlcik6IFJlY3RhbmdsZSB7XHJcbiAgICAgICAgICB2YXIgbGVmdENlbGxzOiBSZWN0YW5nbGVbXSA9IHRoaXMuZ3JpZC5maWx0ZXIoZ2MgPT4gZ2MueSA9PSB5ICYmIGdjLnggPCB4KTtcclxuICAgICAgICAgIGlmKGxlZnRDZWxscyAmJiBsZWZ0Q2VsbHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAvLyBGaW5kIHRoZSBjbG9zZXN0IHggcG9zaXRpb24gaW4gdGhlIGdyaWRcclxuICAgICAgICAgICAgcmV0dXJuIGxlZnRDZWxsc1swXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2UgeyAvLyBpZiB3ZSBjYW4ndCBmaW5kIGFueXRoaW5nIHRvIHRoZSBsZWZ0LCBsb29wIGJhY2sgdG8gdGhlIG1vc3QtcmlnaHRcclxuICAgICAgICAgICAgdmFyIHJpZ2h0Q2VsbHM6IFJlY3RhbmdsZVtdID0gdGhpcy5ncmlkLmZpbHRlcihnYyA9PiBnYy55ID09IHkgJiYgZ2MueCA+IHgpO1xyXG4gICAgICAgICAgICB2YXIgbW9zdFJpZ2h0OiBudW1iZXIgPSB4O1xyXG4gICAgICAgICAgICByaWdodENlbGxzLmZvckVhY2gocmMgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYocmMueCA+IG1vc3RSaWdodClcclxuICAgICAgICAgICAgICAgICAgICBtb3N0UmlnaHQgPSByYy54O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHJpZ2h0Q2VsbHMuZmlsdGVyKHJjID0+IHJjLnggPT0gbW9zdFJpZ2h0KVswXTtcclxuICAgICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBncmlkOiBSZWN0YW5nbGVbXTtcclxuICAgIHNuYWtlQ2VsbHM6IFJlY3RhbmdsZVtdO1xyXG4gICAgZGlyZWN0aW9uOiBzdHJpbmcgPSBcImxlZnRcIjtcclxuXHJcbn0iLCJpbXBvcnQgeyBHcmlkIH0gZnJvbSBcIi4vR3JpZFwiO1xyXG5pbXBvcnQgeyBTbmFrZSB9IGZyb20gXCIuL1NuYWtlXCI7XHJcblxyXG52YXIgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcclxudmFyIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xyXG52YXIgZ3JpZDogR3JpZCA9IG5ldyBHcmlkKDEwMCk7XHJcbnZhciBzbmFrZTogU25ha2U7XHJcblxyXG5mdW5jdGlvbiBnYW1lTG9vcCgpIHtcclxuICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGdhbWVMb29wKTtcclxuICAgc25ha2UuZHJhdyhjdHgpO1xyXG59XHJcblxyXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xyXG4gICBjYW52YXMgPSA8SFRNTENhbnZhc0VsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NudnMnKTtcclxuICAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgXHJcbiAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XHJcbiAgIGN0eC5maWxsUmVjdCgwLCAwLCAxMjgwLCA3MjApO1xyXG4gICB2YXIgZ3JpZENlbGxzID0gZ3JpZC5nZW5lcmF0ZSgxMjgwLCA3MjApO1xyXG4gICBncmlkLmRyYXcoY3R4KTtcclxuICAgc25ha2UgPSBuZXcgU25ha2UoZ3JpZENlbGxzKTtcclxuICAgZ2FtZUxvb3AoKTtcclxufSJdfQ==
