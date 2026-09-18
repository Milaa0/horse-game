export class Horse {
    constructor() {
        this.width = 50;
        this.height = 50;
        this.x = 50;
        // Poziom podłoża
        this.groundLevel = 240;
        // Ruch
        this.y = this.groundLevel - this.height;  // Aktualna pozycja Y
        this.vy = 0;                              // Prędkość w pionie
        this.gravity = 0.6;                       // Przyspieszenie w pionie
        this.jumpStrength = -12;                  // Siła skoku

        this.isJumping = false;     // Blokowanie wielokrotnego skoku
    }

    // Metoda aktualizująca pozycję konia
    update() {
        // Aktualizacja pozycji konia w pionie
        this.y += this.vy;

        // Jeśli koń nad ziemią, to grawitacja się zwiększa
        if (this.y + this.height < this.groundLevel) {
            this.vy += this.gravity;
        }

        // Dotknięcie ziemi przez konia
        if (this.y + this.height >= this.groundLevel) {
            this.y = this.groundLevel - this.height; // Ustawiamy konia na ziemi
            this.vy = 0;
            this.isJumping = false;
        }
    }

    // Meotda wywoływana przy skoku
    jump() {
        if (!this.isJumping) {
            this.vy = this.jumpStrength;
            this.isJumping = true;
        }
    }

    // Metoda rysująca konia
    draw(ctx) {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    // Przywraca konia do ustawień początkowych
    reset() {
        this.y = this.groundLevel - this.height; 
        this.vy = 0; 
        this.isJumping = false;
    }
}