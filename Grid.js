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
        this.lastX = 0;
        this.lastY = 0;
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
