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

  // ARA INTEGRAT AL RENDER DE VIEW
  // function initView() {
  //   view.closeAll();
  //   view.clearBoardGame();
  //   view.setTurnIndicator(model.game.currPlayer);
  //   view.updateScoreboard(
  //     model.stats.playerWithStats[0].wins,
  //     model.stats.playerWithStats[1].wins,
  //     model.stats.ties
  //   );
  //   view.initializeMoves(model.game.moves);
  // }

  // listener per sincronitzar entre diferents browser tabs

  //When current tab state changes:
  model.addEventListener("stateChange", () => {
    view.render(model.game, model.stats);
  });

  // When different tab state changes:
  window.addEventListener("storage", () => {
    console.log("state changed from another tab");
    // initView();     // ARA INTEGRAT AL RENDER DE VIEW

    view.render(model.game, model.stats);
  });

  model.game;

  // The first load of the document:
  view.render(model.game, model.stats);
  // initView();     // ARA INTEGRAT AL RENDER DE VIEW

  view.gameResetEvent((event) => {
    model.resetGame();
    // initView();    // ARA INTEGRAT AL RENDER DE VIEW
    // view.render(model.game, model.stats); //ARA LISTENER
  });

  view.newRoundEvent((event) => {
    model.newRound();
    // initView();    // ARA INTEGRAT AL RENDER DE VIEW
    // view.render(model.game, model.stats); //ARA LISTENER
  });

  view.playerMoveEvent((square) => {
    // const clickedSquare = event.target;

    const existingMove = model.game.moves.find(
      (move) => move.squareId === +square.id
    );

    if (existingMove) return;

    // ARA INTEGRAT AL RENDER DE VIEW
    // Place an icon into the game square
    // view.handlePlayerMove(square, model.game.currPlayer);

    // Update to the next state by pushing a new move to the moves array
    model.playerMove(+square.id);

    // ARA INTEGRAT AL RENDER DE VIEW
    // if (model.game.status.isComplete) {
    //   view.openModal(
    //     model.game.status.winner
    //       ? `${model.game.status.winner.name} wins!`
    //       : "It is a Tie!"
    //   );

    //   return;
    // }

    // // Set the next player's turn indicator
    // view.setTurnIndicator(model.game.currPlayer);

    // view.render(model.game, model.stats);
  });
}

window.addEventListener("load", init);
