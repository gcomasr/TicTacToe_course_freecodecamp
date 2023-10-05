const initialValue = { moves: [] };

export default class Model {
  #state = {
    currGameMoves: [],
    history: {
      currentRoundGames: [],
      allGames: [],
    },
  };

  constructor(players) {
    this.players = players;
  }

  get stats() {
    const state = this.#getState();

    return {
      playerWithStats: this.players.map((player) => {
        const wins = state.history.currentRoundGames.filter(
          // TODO: operador ? es un operador especial JS per filtrar undefined???
          (game) => game.status.winner?.id === player.id
        ).length;

        return {
          // TODO: que son els 3 punts?
          ...player,
          wins,
        };
      }),

      ties: state.history.currentRoundGames.filter(
        (game) => game.status.winner === null
      ).length,
    };
  }

  get game() {
    const state = this.#getState();

    const currPlayer = this.players[state.currGameMoves.length % 2];

    const winningPatterns = [
      [1, 2, 3],
      [1, 5, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 5, 7],
      [3, 6, 9],
      [4, 5, 6],
      [7, 8, 9],
    ];

    let winner = null;

    for (const player of this.players) {
      const selectedSquareIds = state.currGameMoves
        .filter((moves) => moves.player.id === player.id)
        .map((move) => move.squareId);

      for (const pattern of winningPatterns) {
        if (pattern.every((v) => selectedSquareIds.includes(v))) {
          winner = player;
        }
      }
    }

    return {
      moves: state.currGameMoves,
      currPlayer,
      status: {
        isComplete: winner != null || state.currGameMoves.length === 9,
        winner,
      },
    };
  }

  playerMove(squareId) {
    // const state = this.#getState();
    // const stateClone = structuredClone(state);

    const stateClone = structuredClone(this.#getState());

    stateClone.currGameMoves.push({
      squareId,
      player: this.game.currPlayer,
    });

    this.#saveState(stateClone);
  }

  resetGame() {
    const stateClone = structuredClone(this.#getState());
    const { status, moves } = this.game;

    if (status.isComplete) {
      stateClone.history.currentRoundGames.push({
        moves,
        status,
      });
    }

    stateClone.currGameMoves = [];

    this.#saveState(stateClone);
  }

  #getState() {
    return this.#state;
  }

  #saveState(newStateOrFunc) {
    const prevState = this.#getState();

    let newState;

    switch (typeof newStateOrFunc) {
      case "function":
        newState = newStateOrFunc(prevState);
        break;

      case "object":
        newState = newStateOrFunc;
        break;

      default:
        throw new Error("Invalid argument to saveState");
    }

    this.#state = newState;
  }
}
