import { Game } from './Game.js';

window.addEventListener('load', () => {

    // Tworzenie obiektu gry.
    const tHorseGame = new Game();

    // Uruhomienie gry.
    tHorseGame.start();
});
