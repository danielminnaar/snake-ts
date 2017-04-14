import { IShape } from './IShape';
import { Rectangle } from "./Rectangle";

export class Grid implements IShape {

    generate(maxX: number, maxY: number): Rectangle[] {
        var horizontalBlocks = maxX / this.blockSize;
        var verticalBlocks = maxY / this.blockSize;
        // The gridSize should be the smaller of the two
        this.gridSize = Math.round((horizontalBlocks > verticalBlocks ? verticalBlocks : horizontalBlocks));

        var blocksToDraw: number = (this.gridSize * this.gridSize);
        var blockCount: number = 0;
        while(blockCount < blocksToDraw) {
            
            this.cells.push(new Rectangle(this.lastX, this.lastY, this.blockSize, this.blockSize));

            if( this.currentBlockRight > this.totalGridSize) {
                this.lastY += this.blockSize;
                this.lastX = 0;
            }
            else                
                this.lastX += this.blockSize + this.lineWidth;
            
            blockCount++;
        }
        return this.cells;
    } 

    draw(ctx: any): void {
        ctx.lineWidth = 1;
        ctx.strokeStyle = this.color;
        if(this.cells) {
            this.cells.forEach(cell => {
                this.drawGridBlock(ctx, cell);    
            });
        }
    }

    private drawGridBlock(ctx: any, block: Rectangle): void {
        ctx.strokeRect(block.x, block.y, block.width, block.height);
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

    constructor(block_size: number, color: string = "blue", lineWidth: number = 2) {
        this.blockSize = block_size;
        this.color = color;
        this.lineWidth = lineWidth;
        this.lastX = 0;
        this.lastY = 0;
        this.cells = new Array<Rectangle>();
    }


}