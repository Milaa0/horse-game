export class Obstacle {
    constructor(canvasWidth, groundLevel) {
        this.width = 30;
        this.height = 40;
        this.x = canvasWidth;
        this.y = groundLevel - this.height;
        this.speed = 5;
    }

    update() {
        this.x -= this.speed;
    }

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}