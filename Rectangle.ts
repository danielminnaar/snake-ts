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
    
    draw(ctx: any): void {
        throw new Error('Method not implemented.');
    }
    
    width: number;
    height: number;
    x: number;
    y: number;
    color: string;
    lineWidth: number;


}