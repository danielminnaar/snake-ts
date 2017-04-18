export interface IShape {
    draw(ctx: CanvasRenderingContext2D, maxX: number, maxY: number): void;
    x: number;
    y: number;
    color: string;
    lineWidth: number;
}