export class Obstacle {
    constructor(x, groundLevel) {
        this.width = 30;
        this.height = 40;
        this.x = x;
        this.y = groundLevel - this.height;
        this.vx = -4;
        this.passed = false;
    }

    update() {
        this.x += this.vx;
    }

    draw(ctx) {
        ctx.fillStyle = 'gray';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}