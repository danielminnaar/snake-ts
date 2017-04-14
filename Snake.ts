import { Rectangle } from "./Rectangle";

export class Snake {
    constructor(grid: Rectangle[]) {
        this.grid = grid;
        this.snakeCells = new Array<Rectangle>();
        this.snakeCells.push(this.grid[0]);
        //this.snakeCells.push(this.grid[1]);
        //this.snakeCells.push(this.grid[2]);

    }

    public draw(ctx: any) {
        ctx.fillStyle = "red";
        for(var i = 0; i<this.snakeCells.length;i++)  {
            ctx.fillRect(this.snakeCells[i].x, this.snakeCells[i].y,  this.snakeCells[i].width, this.snakeCells[i].height);
            switch(this.direction) {
                case "left": {
                    debugger;
                    // Move the snake cell to the previous x-cell in the grid
                    this.snakeCells[i].x = this.getNextLeftGridCell(this.snakeCells[i].x, this.snakeCells[i].y).x;
                }
                
            }
        }
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