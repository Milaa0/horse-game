export class Horse {
    constructor() {
        this.width = 50;
        this.height = 50;
        this.x = 50;

        // Ruch
        this.y = 200;              // Aktualna pozycja Y
        this.vy = 0;               // Prędkość w pionie
        this.gravity = 0.6;        // Przyspieszenie w pionie
        this.jumpStrength = -12;   // Siła skoku

        // Poziom podłoża
        this.groundLevel = 250;
        this.isJumping = false;     // Blokowanie wielokrotnego skoku
    }

    // Metoda aktualizująca pozycję konia
    update() {
        // Aktualizacja pozycji konia w pionie
        this.y += this.vy;

        // Jeśli koń nad ziemią, to grawitacja się zwiększa
        if (this.y < this.groundLevel) {
            this.vy += this.gravity;
        }

        // Dotknięcie ziemi przez konia
        if (this.y >= this.groundLevel) {
            this.y = this.groundLevel;
            this.vy = 0;
            this.isJumping = false; // Koń dotknął ziemi, można skakać ponownie
        }

}