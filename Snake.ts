import { Rectangle } from "./Rectangle";

export class Snake {
    constructor(grid: Rectangle[]) {
        this.grid = grid;
        this.snakeCells = new Array<Rectangle>();
        this.snakeCells.push(this.grid[0]);
        this.snakeCells.push(this.grid[1]);
        this.snakeCells.push(this.grid[2]);

    }

    public draw(ctx: CanvasRenderingContext2D, maxX: number, maxY: number) {
        ctx.fillStyle = "red";
        for(var i = 0; i<this.snakeCells.length;i++)  {
         
            ctx.fillRect(this.snakeCells[i].x, this.snakeCells[i].y,  this.snakeCells[i].width, this.snakeCells[i].height);


            switch(this.direction) {
                case "left": {
                    debugger;
                    // Move the snake cell to the previous x-cell in the grid
                    var leftCells: Rectangle[] = this.grid.filter(gc => gc.y == this.snakeCells[i].y && gc.x < this.snakeCells[i].x);
                    var leftGridCellIndex: number = this.searchClosestGridCellIndex(this.snakeCells[i].x, leftCells);
                    if ((leftGridCellIndex < 0) || leftCells[leftGridCellIndex].x == this.snakeCells[i].x) {
                         var rightCells: Rectangle[] = this.grid.filter(gc => gc.y == this.snakeCells[i].y && gc.x > this.snakeCells[i].x);
                         this.snakeCells[i].x = rightCells[rightCells.length - 1].x;
                    }
                    else
                        this.snakeCells[i].x = leftCells[leftGridCellIndex].x;  //this.getNextLeftGridCell(this.snakeCells[i].x, this.snakeCells[i].y).x;
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
    

    private getNextLeftGridCell(x: number, y: number): Rectangle {
          var leftCells: Rectangle[] = this.grid.filter(gc => gc.y == y && gc.x < x);
          if(leftCells && leftCells.length > 0) {
            // Find the closest x position in the grid
            return leftCells[0];
          }
          else { // if we can't find anything to the left, loop back to the most-right
            var rightCells: Rectangle[] = this.grid.filter(gc => gc.y == y && gc.x > x);
            var mostRight: number = x;
            rightCells.forEach(rc => {
                if(rc.x > mostRight)
                    mostRight = rc.x;
            });
            return rightCells.filter(rc => rc.x == mostRight)[0];
          }
    }

    grid: Rectangle[];
    snakeCells: Rectangle[];
    direction: string = "left";

}