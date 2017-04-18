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
    Grid.prototype.draw = function (ctx, maxX, maxY) {
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
