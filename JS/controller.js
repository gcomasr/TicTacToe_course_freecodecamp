// EN AQUEST DOCUMENT NOMES S'EMMAGATZEMARÀ
// LA CRIDA A FUNCIONS, RES DE LÒGICA --> VIEW/DATA-STATUS
import Model from "./model.js";
import View from "./view.js";

const players = [
  {
    id: 1,
    name: "Player 1",
    iconClass: "fa-x",
    colorClass: "turquoise",
  },
  {
    id: 2,
    name: "Player 2",
    iconClass: "fa-o",
    colorClass: "yellow",
  },
];

function init() {
  const view = new View();
  const model = new Model("live-game-key", players);

  function initView() {
    view.closeAll();
    view.clearBoardGame();
    view.setTurnIndicator(model.game.currPlayer);
    view.updateScoreboard(
      model.stats.playerWithStats[0].wins,
      model.stats.playerWithStats[1].wins,
      model.stats.ties
    );
    view.initializeMoves(model.game.moves);
  }

  // listener per sincronitzar entre diferents browser tabs
  window.addEventListener("storage", () => {
    console.log("state changed from another tab");
    initView();
  });

  model.game;

  initView();

  view.gameResetEvent((event) => {
    model.resetGame();
    initView();
  });

  view.newRoundEvent((event) => {
    model.newRoundEvent();
    initView();
  });

  view.playerMoveEvent((square) => {
    // const clickedSquare = event.target;

    const existingMove = model.game.moves.find(
      (move) => move.squareId === +square.id
    );

    if (existingMove) return;

    // Place an icon into the game square
    view.handlePlayerMove(square, model.game.currPlayer);
    // Update to the next state by pushing a new move to the moves array
    model.playerMove(+square.id);

    if (model.game.status.isComplete) {
      view.openModal(
        model.game.status.winner
          ? `${model.game.status.winner.name} wins!`
          : "It is a Tie!"
      );

      return;
    }

    // Set the next player's turn indicator
    view.setTurnIndicator(model.game.currPlayer);
  });
}

window.addEventListener("load", init);
