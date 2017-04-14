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
