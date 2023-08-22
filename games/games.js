const tic_tac_toe = {
  board: ["", "", "", "", "", "", "", "", ""],
  symbols: {
    options: ["X", "O"],
    turn_index: 0, //turno
    change() {
      this.turn_index = this.turn_index === 0 ? 1 : 0;
    },
  },
  container_element: null,
  gameover: false,
  win_sequences: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ],

  //Define a mesa de jogo
  init: function (container) {
    this.container_element = container;
  },

  // Define a mecanica do jogo
  make_play(position) {
    //Jogo acabou?
    if (this.gameover || this.board[position] !== "") return false;

    const currentSymbol = this.symbols.options[this.symbols.turn_index];

    this.board[position] = currentSymbol;
    this.draw();

    const win_sequences_index = this.check_win_sequences(currentSymbol);

    if (this.is_game_over()) {
      this.game_is_over();
    }

    if (win_sequences_index >= 0) {
      this.game_is_over();
      this.stylize_winner_sequence(this.win_sequences[win_sequences_index]);
    } else {
      this.symbols.change();
    }
    return true;
  },

  stylize_winner_sequence(winner_sequence) {
    winner_sequence.forEach((position) => {
      this.container_element
        .querySelector(`div:nth-child(${position + 1})`)
        .classList.add("winner");
    });
  },

  game_is_over() {
    this.gameover = true;
    console.log("GAME OVER");
  },

  is_game_over() {
    return !this.board.includes("");
  },

  start() {
    this.board.fill("");
    this.draw();
    this.gameover = false;
  },

  restart() {
    if (this.is_board_empty(this.board)) {
      console.log("A board está vazia");
      return false;
    }

    if (this.is_game_over() || this.gameover) {
      this.start();
      console.log("this game has been restarted!");
    } else if (confirm("Are you sure you want to restart this game?")) {
      this.start();
      console.log("this game has been restarted!");
    }
  },

  is_board_empty(board) {
    for (i in board) {
      if (board[i] !== "") return false;
    }
    return true;
  },

  check_win_sequences(symbol) {
    for (i in this.win_sequences) {
      if (
        this.board[this.win_sequences[i][0]] === symbol &&
        this.board[this.win_sequences[i][1]] === symbol &&
        this.board[this.win_sequences[i][2]] === symbol
      ) {
        console.log("sequencia vencedora ", i);
        return i;
      }
    }
    return -1;
  },

  //Desenha na tela o jogo
  draw() {
    this.container_element.innerHTML = this.board
      .map(
        (element, index) =>
          `<div class="ps-${index} ps" style="" onclick="tic_tac_toe.make_play('${index}')"> ${element} </div>`
      )
      .reduce((content, current) => content + current);
  },
};
