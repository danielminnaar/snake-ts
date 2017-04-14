export interface IShape {
    draw(ctx: any): void;
    x: number;
    y: number;
    color: string;
    lineWidth: number;
}