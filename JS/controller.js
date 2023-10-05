// EN AQUEST DOCUMENT NOMES S'EMMAGATZEMARÀ
// LA CRIDA A FUNCIONS, RES DE LÒGICA --> VIEW/DATA-STATUS
import Model from "./model.js";
import View from "./view.js";

// // declarem una variable JS_App per inicialitzar tot un conjunt de variables internes i evitar duplicats globals
// let cont_tie = 0,
//   p1_wins = 0,
//   p2_wins = 0;

// const JS_App = {
//   // ALL OUR SELECTED HTML ELEMENTS
//   $: {
//     turn: document.querySelector('[data-id="turn"]'),

//     btn_menu: document.querySelector('[data-id="menu"]'),
//     menuItems: document.querySelector('[data-id="menu-items"]'),
//     btn_rst: document.querySelector('[data-id="rst-btn"]'),
//     btn_newRound: document.querySelector('[data-id="new-round-btn"]'),

//     squares: document.querySelectorAll('[data-id="square"]'),

//     modal: document.querySelector('[data-id="modal"]'),
//     txt_modal: document.querySelector('[data-id="modal-txt"]'),
//     btn_modal: document.querySelector('[data-id="btn-modal"]'),

//     stats_p1: document.querySelector('[data-id="player1-stats"]'),
//     stats_tie: document.querySelector('[data-id="ties"]'),
//     stats_p2: document.querySelector('[data-id="player2-stats"]'),
//   },

//   ///////////////////////////////////////////////////////////////////////////////////
//   // definim l'estat el qual ens dirà quin jugador esta jugant i quin ha sigut el seu moviment
//   state: {
//     // currentPlayer: 1,
//     moves: [],
//   },

//   ///////////////////////////////////////////////////////////////////////////////////
//   // funcio d'inicialitzacio
//   init() {
//     JS_App.registerEventListeners();
//   },

//   ///////////////////////////////////////////////////////////////////////////////////
//   // funcio que contindrà tots els listeners/onclicks de la web
//   registerEventListeners() {
//     JS_App.$.btn_menu.addEventListener("click", (event) => {
//       JS_App.$.menuItems.classList.toggle("hidden");
//     });

//     JS_App.$.btn_rst.addEventListener("click", (event) => {
//       JS_App.$.menuItems.classList.add("hidden");
//       console.log("Reset game");
//     });

//     JS_App.$.btn_newRound.addEventListener("click", (event) => {
//       JS_App.$.menuItems.classList.add("hidden");
//       console.log("Start new round");
//     });

//     JS_App.$.btn_modal.addEventListener("click", (event) => {
//       JS_App.state.moves = [];
//       JS_App.$.squares.forEach((square) => square.replaceChildren());
//       JS_App.$.modal.classList.add("hidden");
//       console.log("Start new round");
//     });

//     JS_App.$.squares.forEach((square) => {
//       square.addEventListener("click", (event) => {
//         // console.log(`Game square clicked is id: ${event.target.id}`);
//         JS_App.checkMove(square);

//         // CHECK IF THERE IS A WINNER OR TIE GAME
//         const game = JS_App.getGameStatus(JS_App.state.moves);

//         if (game.status === "complete") {
//           JS_App.$.modal.classList.remove("hidden");

//           let message = "";
//           if (game.winner) {
//             // alert(`Player ${game.winner} wins!`);
//             message = `Player ${game.winner} wins!`;

//             if (game.winner === 1) p1_wins = p1_wins + 1;
//             else p2_wins = p2_wins + 1;
//           } else {
//             // alert("Tie!");
//             message = "Tie game!";

//             cont_tie = cont_tie + 1;
//           }

//           JS_App.$.stats_p1.innerHTML = p1_wins;
//           JS_App.$.stats_tie.innerHTML = cont_tie;
//           JS_App.$.stats_p2.innerHTML = p2_wins;

//           //   turnLbl.innerText = `Player 1, you're up!`;
//           //   turnLbl.classList = "yellow";
//           //   turnIcon.classList.add("fa-solid", "fa-x", "yellow");
//           //   JS_App.$.turn.replaceChildren(turnIcon, turnLbl);

//           JS_App.$.txt_modal.innerHTML = message;
//         }
//       });
//     });
//   },

//   ///////////////////////////////////////////////////////////////////////////////////
//   checkMove(square) {
//     // Revisa si ja s'ha jugat a la casella:
//     const hasMove = (squareId) => {
//       const existingMove = JS_App.state.moves.find(
//         (move) => move.squareId === squareId
//       );
//       return existingMove !== undefined;
//     };

//     // Si s'ha jugat, no fem res (return)
//     // if (square.hasChildNodes()) { return; }
//     if (hasMove(+square.id)) {
//       return;
//     }

//     // DETERMINE WICH PLAYER ICON TO ADD IN THE SQUARE
//     // Mirem quin es l'ultim moviment
//     const lastMove = JS_App.state.moves.at(-1);

//     //funcio per treure l'oponent quan passem un playerId
//     const getOppositePlayer = (playerId) => (playerId === 1 ? 2 : 1);

//     // Definim el currPlayer, si no hi ha moves, serà l'1, sino l'oposat a l'ultim moviment
//     const currPlayer =
//       JS_App.state.moves.length === 0
//         ? 1
//         : getOppositePlayer(lastMove.playerId);

//     const nextPlayer = getOppositePlayer(currPlayer);

//     // Declarem un icon per modificar l'HTML desde JS
//     const squareIcon = document.createElement("i");
//     const turnIcon = document.createElement("i");
//     const turnLbl = document.createElement("p");

//     // Si el jugador es l'1, posarem una icona 'X' groga, sino 'O' blava
//     if (currPlayer === 1) {
//       squareIcon.classList.add("fa-solid", "fa-x", "yellow");
//       turnLbl.classList = "turquoise";
//       turnIcon.classList.add("fa-solid", "fa-o", "turquoise");
//     } else {
//       squareIcon.classList.add("fa-solid", "fa-o", "turquoise");
//       turnLbl.classList = "yellow";
//       turnIcon.classList.add("fa-solid", "fa-x", "yellow");
//     }

//     turnLbl.innerText = `Player ${nextPlayer}, you're up!`;
//     JS_App.$.turn.replaceChildren(turnIcon, turnLbl);

//     // Actualitzem el currPlayer un cop jugat : si es 1 then 2, otherwise 1.
//     // JS_App.state.currentPlayer = currentPlayer === 1 ? 2 : 1;

//     // Actualitzem els moviments amb l'squareId i el currPlayer
//     JS_App.state.moves.push({
//       squareId: +square.id,
//       playerId: currPlayer,
//     });

//     // afegim l'icon corresponent a la casella
//     // event.target.replaceChildren(icon);
//     square.replaceChildren(squareIcon);
//   },
//   ///////////////////////////////////////////////////////////////////////////////////
//   getGameStatus(moves) {
//     const p1Moves = moves
//       .filter((move) => move.playerId === 1)
//       .map((move) => +move.squareId);
//     const p2Moves = moves
//       .filter((move) => move.playerId === 2)
//       .map((move) => +move.squareId);

//     const winningPatterns = [
//       [1, 2, 3],
//       [1, 5, 9],
//       [1, 4, 7],
//       [2, 5, 8],
//       [3, 5, 7],
//       [3, 6, 9],
//       [4, 5, 6],
//       [7, 8, 9],
//     ];

//     let winner = null;

//     winningPatterns.forEach((pattern) => {
//       const p1Wins = pattern.every((v) => p1Moves.includes(v));
//       const p2Wins = pattern.every((v) => p2Moves.includes(v));

//       if (p1Wins) winner = 1;
//       if (p2Wins) winner = 2;
//     });

//     return {
//       status: moves.length === 9 || winner != null ? "complete" : "on-going", // on-going | complete
//       winner, // 1 | 2 | null
//     };
//   },
// };

// // cada cop que es recarrega la pagina, executem la funcio inicialitzacio
// window.addEventListener("load", JS_App.init);

// //youtu.be/MsnQ5uepIaE?t=10859

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
  const model = new Model(players);

  model.game;

  view.gameResetEvent((event) => {
    view.closeAll();
    model.resetGame();

    view.clearBoardGame();
    view.setTurnIndicator(model.game.currPlayer);

    view.updateScoreboard(
      model.stats.playerWithStats[0].wins,
      model.stats.playerWithStats[1].wins,
      model.stats.ties
    );
  });

  view.newRoundEvent((event) => {
    console.log("New round event");
    console.log(event);
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
