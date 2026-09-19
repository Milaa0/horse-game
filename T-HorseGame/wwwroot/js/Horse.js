export class Horse {
    constructor() {
        this.width = 80;
        this.height = 60;
        this.x = 50;
        // Poziom podłoża
        this.groundLevel = 240;
        // Ruch
        this.y = this.groundLevel - this.height;  
        this.vy = 0;                              
        this.gravity = 0.6;                       
        this.jumpStrength = -12;                  
        this.isJumping = false;     

        // Element wideo dla animacji konia
        this.video = document.createElement('video');
        this.video.src = '/js/horse_run_loading.mp4';
        this.video.loop = true; 
        this.video.muted = true;
        this.video.play();
        // Płótno do green screen
        this.offscreenCanvas = document.createElement('canvas');
        this.offscreenCanvas.width = this.width;
        this.offscreenCanvas.height = this.height;
        this.offCtx = this.offscreenCanvas.getContext('2d', { willReadFrequently: true });
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
            this.y = this.groundLevel - this.height;
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

    draw(ctx) {
        if (this.video.readyState >= 2) {
            // 1. Czyścimy robocze płótno
            this.offCtx.clearRect(0, 0, this.width, this.height);

            // 2. Rysujemy wideo w odbiciu lustrzanym (żeby koń biegł w prawo)
            this.offCtx.save();
            this.offCtx.scale(-1, 1);
            this.offCtx.drawImage(this.video, -this.width, 0, this.width, this.height);
            this.offCtx.restore();

            // 3. Pobieramy surowe dane wszystkich pikseli
            let frame = this.offCtx.getImageData(0, 0, this.width, this.height);
            let data = frame.data;

            // 4. Analizujemy piksele (R, G, B, Alpha). Usuwamy jasne (białe) tło.
            for (let i = 0; i < data.length; i += 4) {
                let r = data[i];
                let g = data[i + 1];
                let b = data[i + 2];

                // Jeśli piksel jest bardzo jasny (wartości powyżej 200 na 255 to odcienie bieli)
                if (r > 200 && g > 200 && b > 200) {
                    data[i + 3] = 0; // Kanał Alpha = 0 (robimy z tego piksela przezroczystość)
                }
            }

            // 5. Wrzucamy zmodyfikowane piksele (wyciętego konia) z powrotem na robocze płótno
            this.offCtx.putImageData(frame, 0, 0);

            // 6. Rysujemy gotowego, odwróconego konia bez tła w głównej grze
            ctx.drawImage(this.offscreenCanvas, this.x, this.y);
        }
    }

    // Przywraca konia do ustawień początkowych
    reset() {
        this.y = this.groundLevel - this.height;
        this.vy = 0;
        this.isJumping = false;
    }
}