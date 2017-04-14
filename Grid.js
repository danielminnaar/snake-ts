"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Grid = (function () {
    function Grid(grid_size, block_size, color, lineWidth) {
        if (color === void 0) { color = "blue"; }
        if (lineWidth === void 0) { lineWidth = 2; }
        this.gridSize = grid_size;
        this.blockSize = block_size;
        this.color = color;
        this.lineWidth = lineWidth;
    }
    Grid.prototype.draw = function (ctx) {
        ctx.lineWidth = 3;
        ctx.strokeStyle = this.color;
        var filled = false;
        while (!filled) {
            this.drawGridBlock(ctx);
            if (this.currentBlockRight > this.totalGridSize) {
                this.lastY += this.blockSize;
                this.lastX = 0;
            }
            else
                this.lastX += this.blockSize;
            if (this.lastX >= this.totalGridSize && this.lastY >= this.totalGridSize) {
                this.drawGridBlock(ctx);
                filled = true;
            }
        }
    };
    Grid.prototype.drawGridBlock = function (ctx) {
        ctx.strokeRect(this.lastX + this.lineWidth, this.lastY + this.lineWidth, this.blockSize, this.blockSize);
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
            return this.lastX + this.blockSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "currentBlockBottom", {
        get: function () {
            return this.lastY + this.blockSize;
        },
        enumerable: true,
        configurable: true
    });
    return Grid;
}());
exports.Grid = Grid;
//# sourceMappingURL=Grid.js.map