import { Game } from './Game.js ';

window.addEventListener('load', () => {
    const tHorseGame = new Game();
    tHorseGame.start();

    window.addEventListener('keydown, (e) => {
       if (e.code === 'Space') {
        tHorseGame.horse.jump();
        }
    });
});
