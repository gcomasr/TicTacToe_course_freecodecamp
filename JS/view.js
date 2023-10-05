// En aquest document s'emmagatemarà tots
// els elements i funcions que modifiquin només la UI

export default class View {
  $ = {};
  $$ = {};

  constructor() {
    this.$.turn = this.#qs('[data-id="turn"]');

    this.$.btn_menu = this.#qs('[data-id="menu"]');
    this.$.menuItems = this.#qs('[data-id="menu-items"]');
    this.$.btn_rst = this.#qs('[data-id="rst-btn"]');
    this.$.btn_newRound = this.#qs('[data-id="new-round-btn"]');

    this.$.modal = this.#qs('[data-id="modal"]');
    this.$.txt_modal = this.#qs('[data-id="modal-txt"]');
    this.$.btn_modal = this.#qs('[data-id="btn-modal"]');

    this.$.stats_p1 = this.#qs('[data-id="p1-stats"]');
    this.$.stats_tie = this.#qs('[data-id="ties-stats"]');
    this.$.stats_p2 = this.#qs('[data-id="p2-stats"]');

    this.$$.squares = this.#qsAll('[data-id="square"]');

    // UI-only event listeners (it does not affect the game data)
    this.$.btn_menu.addEventListener("click", (event) => {
      this.#toggleMenu();
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////
  // REGISTER OF EVENT LISTENERS
  gameResetEvent(handler) {
    this.$.btn_rst.addEventListener("click", handler);
    this.$.btn_modal.addEventListener("click", handler);
  }

  newRoundEvent(handler) {
    this.$.btn_newRound.addEventListener("click", handler);
  }

  playerMoveEvent(handler) {
    this.$$.squares.forEach((square) => {
      square.addEventListener("click", () => handler(square));
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////
  //   DOM HELPER METHODS (TO CHANGE THE UI IN SOME WAY)

  #qs(selector, parent) {
    const el = parent
      ? parent.querySelector(selector)
      : document.querySelector(selector);
    if (!el) throw new Error("Could not find the element");
    return el;
  }
  #qsAll(selector) {
    const elList = document.querySelectorAll(selector);
    if (!elList) throw new Error("Could not find the elements");
    return elList;
  }

  #toggleMenu() {
    this.$.menuItems.classList.toggle("hidden");
    this.$.btn_menu.classList.toggle("border");

    const icon = this.$.btn_menu.querySelector("i");
    console.log(icon);

    icon.classList.toggle("fa-chevron-down");
    icon.classList.toggle("fa-chevron-up");
  }

  #closeModal() {
    this.$.modal.classList.add("hidden");
  }
  #closeMenu() {
    this.$.menuItems.classList.add("hidden");
    this.$.btn_menu.classList.remove("border");

    const icon = this.$.btn_menu.querySelector("i");
    icon.classList.add("fa-chevron-down");
    icon.classList.remove("fa-chevron-up");
  }
  closeAll() {
    this.#closeMenu();
    this.#closeModal();
  }

  setTurnIndicator(player) {
    const icon = document.createElement("i");
    const label = document.createElement("p");

    icon.classList.add("fa-solid", player.iconClass, player.colorClass);

    label.classList.add(player.colorClass);
    label.innerText = `${player.name}, you're up!`;

    this.$.turn.replaceChildren(icon, label);
  }

  handlePlayerMove(squareEl, player) {
    const icon = document.createElement("i");
    icon.classList.add("fa-solid", player.iconClass, player.colorClass);
    squareEl.replaceChildren(icon);
  }

  openModal(message) {
    this.$.modal.classList.remove("hidden");
    this.$.txt_modal.innerText = message;
  }

  clearBoardGame() {
    this.$$.squares.forEach((square) => {
      square.replaceChildren();
    });
  }

  updateScoreboard(p1Wins, p2Wins, ties) {
    this.$.stats_p1.innerText = `${p1Wins} wins`;
    this.$.stats_p2.innerText = `${p2Wins} wins`;
    this.$.stats_tie.innerText = `${ties} wins`;
  }
}
