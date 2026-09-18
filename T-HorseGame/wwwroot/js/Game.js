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
        this.score = 0;
        this.gameSpeed = 4;

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
        // Rysowanie wyniku
        this.ctx.font = '20px Arial';
        this.ctx.fillStyle = 'black';
        this.ctx.textAlign = 'left';
        this.ctx.fillText('Wynik: ' + this.score, 20, 30);
    }

    // Osobna metoda restartu
    restart() {
        this.isGameOver = false;
        this.obstacles = [];
        this.frames = 0;
        this.score = 0; //Zerowanie punktów po nowym starcie
        this.gameSpeed = 4;
        this.horse.reset();
        this.loop();
    }

    drawGameOver() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.font = ' 40px "Arial"';
        this.ctx.fillStyle = 'black';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2 - 40);

        this.ctx.font = ' 24px "Arial"';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText('Twój wynik: ' + this.score, this.canvas.width / 2, this.canvas.height / 2 );

        this.ctx.font = '18px "Arial"';
        this.ctx.fillStyle = '#444';
        this.ctx.fillText('Naciśnij spację, aby spróbować ponownie', this.canvas.width / 2, this.canvas.height / 2 + 30);
    }

    loop() {
        // Aktualizacja pozycji konia
        this.horse.update();

        // Licznik klatek i tworzenie nowych przeszkód
        this.frames++;

        // Przyspieszenie z każdą klatką
        this.gameSpeed += 0.002;

        if (this.frames % 120 === 0) {
            this.obstacles.push(new Obstacle(this.canvas.width, this.horse.groundLevel, this.gameSpeed));
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

                return;
            }
            // Jeśli koń jest dalej po prawej niż prawa krawędź przeszkody i punkt nie był jeszcze dodany
            if (!this.obstacles[i].passed && this.horse.x > this.obstacles[i].x + this.obstacles[i].width) {
                this.score++; // Dodajemy punkt
                this.obstacles[i].passed = true; // Zaznaczamy, żeby nie dodać go ponownie
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