import Game from "./main.js";

var game = new Game();
Loop();
function Loop() {
  // game.animate()
  requestAnimationFrame(Loop);
}
