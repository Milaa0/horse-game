import { Horse } from './Horse.js';
import { Obstacle } from './Obstacle.js';

export class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');

        this.horse = new Horse();
        this.obstacles = [];
        this.frames = 0;
        this.animationId = null;
        this.isGameOver = false;

        // Sterowanie skokiem (komputer)
        window.addEventListener('keydown', (event) => {
            if (event.code === 'Space' && this.isGameOver === false) {
                this.horse.jump();
            }
        });

        // Sterowanie skokiem (telefon)
        window.addEventListener('touchstart', (event) => {
            if (this.isGameOver === false) {
                this.horse.jump();
            }
        });

        console.log('Game initialized', this.canvas);

        // Nasłuchiwanie na restart gry PO przegranej
        window.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && this.isGameOver === true) {
                this.restart();
            }
        });
    }

    draw() {
        // Czyszczenie canvasu przed rysowaniem
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Rysowanie konia i przeszkód
        this.horse.draw(this.ctx);
        for (let i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].draw(this.ctx);
        }
    }

    // Osobna metoda restartu
    restart() {
        this.isGameOver = false;
        this.obstacles = [];
        this.frames = 0;
        this.horse.reset();

        this.loop();
    }

    drawGameOver() {
        this.ctx.font = 'bold 40px Arial';
        this.ctx.fillStyle = 'red';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2);
    }

    loop() {
        // Aktualizacja pozycji konia
        this.horse.update();

        // Licznik klatek i tworzenie nowych przeszkód
        this.frames++;
        if (this.frames % 120 === 0) {
            this.obstacles.push(new Obstacle(this.canvas.width, this.horse.groundLevel));
        }

        // Aktualizacja i usuwanie starych przeszkód
        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            this.obstacles[i].update();

            // Sprawdzenie kolizji
            if (
                this.horse.x < this.obstacles[i].x + this.obstacles[i].width &&
                this.horse.x + this.horse.width > this.obstacles[i].x &&
                this.horse.y < this.obstacles[i].y + this.obstacles[i].height &&
                this.horse.y + this.horse.height > this.obstacles[i].y
            ) {
                this.isGameOver = true;
                cancelAnimationFrame(this.animationId);

                this.drawGameOver();

                this.ctx.font = '20px Arial';
                this.ctx.fillText('Naciśnij spację, aby spróbować ponownie', this.canvas.width / 2, this.canvas.height / 2 + 40);

                return;
            }

            // Usuwanie przeszkód, które minęły ekran
            if (this.obstacles[i].x + this.obstacles[i].width < 0) {
                this.obstacles.splice(i, 1);
            }
        }

        // Rysowanie klatki
        this.draw();

        // Wywołanie pętli gry w następnej klatce
        this.animationId = requestAnimationFrame(() => this.loop());
    }

    start() {
        console.log('Game started');
        this.loop();
    }
}