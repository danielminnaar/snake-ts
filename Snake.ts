import { Rectangle } from "./Rectangle";

export class Snake {
    constructor(grid: Rectangle[]) {
        this.grid = grid;
        this.snakeCells = new Array<Rectangle>();
        this.snakeCells.push(this.cloneCell(this.grid[0]));
        this.snakeCells.push(this.cloneCell(this.grid[1]));
        this.snakeCells.push(this.cloneCell(this.grid[2]));
    }

    private cloneCell(original: Rectangle): Rectangle {
        return new Rectangle(original.x, original.y, original.width, original.height);
    }

    public draw(ctx: CanvasRenderingContext2D, maxX: number, maxY: number) {
        ctx.fillStyle = "red";
        for(var i = 0; i<this.snakeCells.length;i++)  {
         
            ctx.fillRect(this.snakeCells[i].x, this.snakeCells[i].y,  this.snakeCells[i].width, this.snakeCells[i].height);


            switch(this.direction) {
                case "left": {
                    // Move the snake cell to the previous x-cell in the grid
                    this.snakeCells[i].y = this.snakeCells[0].y; // Re-align and follow the head
                    var leftCells: Rectangle[] = this.grid.filter(gc => gc.y == this.snakeCells[i].y && gc.x < this.snakeCells[i].x);
                    var leftGridCellIndex: number = this.searchClosestGridCellIndex(this.snakeCells[i].x, leftCells);
                    if ((leftGridCellIndex < 0) || leftCells[leftGridCellIndex].x == this.snakeCells[i].x) {
                         var rightCells: Rectangle[] = this.grid.filter(gc => gc.y == this.snakeCells[i].y && gc.x > this.snakeCells[i].x);
                         this.snakeCells[i].x = rightCells[rightCells.length - 1].x;
                    }
                    else
                        this.snakeCells[i].x = leftCells[leftGridCellIndex].x;  //this.getNextLeftGridCell(this.snakeCells[i].x, this.snakeCells[i].y).x;
                    break;
                }
                case "right": {
                    // Move the snake cell to the next x-cell in the grid
                    this.snakeCells[i].y = this.snakeCells[this.snakeCells.length -1].y; // Re-align and follow the head
                    var rightCells: Rectangle[] = this.grid.filter(gc => gc.y == this.snakeCells[i].y && gc.x > this.snakeCells[i].x);
                    var rightGridCellIndex: number = this.searchClosestGridCellIndex(this.snakeCells[i].x, rightCells);
                    if ((rightGridCellIndex < 0) || rightCells[rightGridCellIndex].x == this.snakeCells[i].x) {
                         var leftCells: Rectangle[] = this.grid.filter(gc => gc.y == this.snakeCells[i].y && gc.x < this.snakeCells[i].x);
                         this.snakeCells[i].x = leftCells[0].x;
                    }
                    else
                        this.snakeCells[i].x = rightCells[rightGridCellIndex].x;  //this.getNextLeftGridCell(this.snakeCells[i].x, this.snakeCells[i].y).x;
                    break;
                }
                case "up": {
                    // Move the snake cell to the previous y-cell in the grid
                    this.snakeCells[i].x = this.snakeCells[0].x; // re-align and follow the head
                    var topCells: Rectangle[] = this.grid.filter(gc => gc.y < this.snakeCells[i].y && gc.x == this.snakeCells[i].x);
                    var topGridCellIndex: number = this.searchClosestGridCellIndex(this.snakeCells[i].y, topCells);
                    if ((topGridCellIndex < 0) || topCells[topGridCellIndex].y == this.snakeCells[i].y) {
                        // We need to switch direction
                         var bottomCells: Rectangle[] = this.grid.filter(gc => gc.y > this.snakeCells[i].y && gc.x == this.snakeCells[i].x);
                         this.snakeCells[i].y = bottomCells[bottomCells.length -1].y;
                    }
                    else
                        this.snakeCells[i].y = topCells[topGridCellIndex].y;
                    break;
                }
                default: {

                }
                
            }
        }
    }
    
    

    // Find the closest grid cell from our current x position
    private searchClosestGridCellIndex(currentX: number, gridArray: Rectangle[]): number {
       
       if(gridArray.length == 0)
        return -1;
       var currentIndex: number = 0; // number = gridArray[0].x;
       var currentValue: number = gridArray[0].x;
       for(var i: number = 0;i<gridArray.length; i++) {
           if (Math.abs(gridArray[currentIndex].x - gridArray[i].x) < Math.abs(currentX - gridArray[currentIndex].x))
            currentIndex = i;
       };
       return currentIndex;
    }
    

    grid: Rectangle[];
    snakeCells: Rectangle[];
    direction: string;
}