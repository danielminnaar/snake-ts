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
    Rectangle.prototype.draw = function (ctx, maxX, maxY) {
        this.scrollLeft(maxX);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    Rectangle.prototype.scrollLeft = function (wrapX) {
        if ((this.x + this.width) <= 0)
            this.x = wrapX;
    };
    return Rectangle;
}());
exports.Rectangle = Rectangle;
