import { IShape } from './IShape';
import { Rectangle } from "./Rectangle";

export class Grid implements IShape {

    draw(ctx: any, visible: boolean = false): void {
        ctx.lineWidth = 1;
        ctx.strokeStyle = this.color;
        var filled: boolean = false;
        var blocksToDraw: number = (this.gridSize * this.gridSize);
        var blockCount: number = 0;
        while(blockCount < blocksToDraw) {
            if (visible)
                this.drawGridBlock(ctx);
            this.cells.push(new Rectangle(this.lastX + this.lineWidth, this.lastY + this.lineWidth, this.blockSize, this.blockSize));

            if( this.currentBlockRight > this.totalGridSize) {
                this.lastY += this.blockSize;
                this.lastX = this.lineWidth;
            }
            else                
                this.lastX += this.blockSize + this.lineWidth;
            
            blockCount++;
        }
    }

    public getGridCells(): Rectangle[] {
        // Need to figure out a way of ensuring the cell sizes are neatly within the block sizes, given the line widths.
        return this.cells;

    }

    private drawGridBlock(ctx: any): void {
        ctx.strokeRect(this.lastX, this.lastY + this.lineWidth, this.blockSize, this.blockSize);
    }

    private get totalGridSize(): number {
        return (this.gridSize * this.blockSize);
    }

    private get currentBlockRight(): number {
        return ((this.lastX + this.lineWidth) + this.blockSize);
    }

    private get currentBlockBottom(): number {
        return (this.lastY + this.lineWidth) + this.blockSize;
    }

    lastX: number;
    lastY: number;
    x: number;
    y: number;
    color: string;
    lineWidth: number;
    blockSize: number;
    gridSize: number;
    cells: Rectangle[];

    constructor(grid_size: number, block_size: number, color: string = "blue", lineWidth: number = 2) {
        this.gridSize = grid_size;
        this.blockSize = block_size;
        this.color = color;
        this.lineWidth = lineWidth;
        this.lastX = this.lineWidth;
        this.lastY = this.lineWidth;
        this.cells = new Array<Rectangle>();
    }


}