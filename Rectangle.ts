import { IShape } from "./IShape";

export class Rectangle implements IShape {

    constructor(x: number, y: number, width: number, height: number, color: string = "white", lineWidth: number = 3) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.lineWidth = lineWidth;
    }
    
    draw(ctx: CanvasRenderingContext2D, maxX: number, maxY: number): void {
        this.scrollLeft(maxX);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    scrollLeft(wrapX: number): void {
        this.x = this.x - this.width;
        if( (this.x + this.width) <= 0)
            this.x = wrapX;
        
    }
    
    width: number;
    height: number;
    x: number;
    y: number;
    color: string;
    lineWidth: number;


}