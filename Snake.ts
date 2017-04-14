import { Rectangle } from "./Rectangle";

export class Snake {
    constructor(grid: Rectangle[]) {
        this.Grid = grid;
        this.SnakeCells = new Array<Rectangle>();
        this.SnakeCells.push(this.Grid[0]);
        this.SnakeCells.push(this.Grid[1]);
        this.SnakeCells.push(this.Grid[2]);

    }

    public draw(ctx: any) {
        ctx.fillStyle = "purple";
        for(var i = 0; i<this.SnakeCells.length;i++)  {
            ctx.fillRect(this.SnakeCells[i].x, this.SnakeCells[i].y,  this.SnakeCells[i].width, this.SnakeCells[i].height);
        }
    }

    Grid: Rectangle[];
    SnakeCells: Rectangle[];
}