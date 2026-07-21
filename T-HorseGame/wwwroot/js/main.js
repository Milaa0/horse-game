import { Game } from './Game.js';

/** Główny punkt startowy aplikacji.
* Uruchamia się po wczytaniu strony.
*/

window.addEventListener('load', () => {

    // Tworzenie obiektu gry.
    const tHorseGame = new Game();

    // Uruhomienie gry.
    tHorseGame.start();
});
