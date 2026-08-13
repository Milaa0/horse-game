import { Horse } from './Horse.js';
import { Obstacle } from './Obstacle.js';
export class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');

        // Narzędzie do rysowania 2D
        this.ctx = this.canvas.getContext('2d');

        // Tworzenie obiektu konia
        this.horse = new Horse();

        this.obstacles = []; // Tworzymy pustą listę na nasze przeszkody
        this.frames = 0;     // Ustawiamy licznik klatek na 0

        this.animationId = null; // Przechowuje ID animacji, aby móc ją zatrzymać w przyszłości

        // Sterowanie komputer
        window.addEventListener('keydown', (event) => {
            if (event.code === 'Space') {
                this.horse.jump();
            }
        });

        // Sterowanie telefon
        window.addEventListener('touchstart', (event) => {
            this.horse.jump();
        });

        console.log('Game initialized', this.canvas);
    }

    draw() {
      
        // Czyszczenie canvasu przed rysowaniem
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Wywołanie metody draw() dla konia i przeszkód
        this.horse.draw(this.ctx);

        // Rysowanie przeszkód
        for (let i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].draw(this.ctx);
        }
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

            // Sprawdzenie kolizji konia z przeszkodą
            if (
                this.horse.x < this.obstacles[i].x + this.obstacles[i].width &&
                this.horse.x + this.horse.width > this.obstacles[i].x &&
                this.horse.y < this.obstacles[i].y + this.obstacles[i].height &&
                this.horse.y + this.horse.height > this.obstacles[i].y
            ) {
                // Kolizja wykryta
                console.log('Kolizja');

                // Zatrzymanie pętli gry i wyświetlenie komunikatu
                cancelAnimationFrame(this.animationId);

                this.drawGameOver();

                return; // Przerywamy dalsze wykonywanie pętli
            }
            if (this.obstacles[i].x + this.obstacles[i].width < 0) {
                this.obstacles.splice(i, 1);
            }
        }
        //Rysowanie klatki
        this.draw()

        // Wywołanie pętli gry w następnej klatce
        this.animationId = requestAnimationFrame(() => this.loop());
    }

    start() {
        console.log('Game started');
        
        // Start pętli gry
        this.loop(); 
    }
}