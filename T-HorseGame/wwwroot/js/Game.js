import { Horse } from './Horse.js';

export class Game {
    // Initializes the game environment
    constructor() {
        // Canvas ze strony HTML
        this.canvas = document.getElementById('gameCanvas');

        // Narzędzie do rysowania 2D
        this.ctx = this.canvas.getContext('2d');

        // Tworzenie obiektu konia
        this.horse = new Horse();

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
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        // Rysowanie konia na canvasie
        this.ctx.fillRect(this.horse.x, this.horse.y, this.horse.width, this.horse.height);
    }

    loop() {

        // Aktualizacja stanu gry
        this.horse.update();

        //Rysowanie klatki
        this.draw(); 

        // Wywołanie pętli gry w następnej klatce
        requestAnimationFrame(() => this.loop());
    }

    start() {
        console.log('Game started');
        
        // Start pętli gry
        this.loop(); 
    }
}