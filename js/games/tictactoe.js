document.addEventListener("DOMContentLoaded", async () => {
  // console.log("inicio");
  _FIRE.initFirebase();

  _aux.checkChangeState();

  html_Comp.conteudo(`
    <div id="game" class="game bg-dark p-0">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>

    <div class="d-flex justify-content-between">
        <button
            class="btnn"
            onclick="_aux.Navigate('../pages/games.html')"
            title="Voltar a pagina dos jogos"
            style="width:10rem"
        >
            Voltar ao inicio
        </button>
            
        <button 
            class="btnn bg-dark" 
            onclick="_aux.Copiar('chave',Url.path)" 
            title="Copiar chave"
        >
            ${Theme.icons.key}
        </button>

        <button 
            id="btn-action"
            class="btnn sus" 
            onclick="tic_tac_toe.start()" 
            title="Começar jogo"
            style="width:10rem"
        >
            Começar
        </button>

    </div>
    `);

  _html.elemento(
    "div",
    ["class"],
    ["p-2"],
    "modal",
    `
      <button
        type="button"
        class="btn btn-primary invisible"
        id="Modal-win"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      ></button>

      <!-- Modal -->
      <div
        class="modal text-black"
        id="staticBackdrop"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-sm">
          <div class="modal-content">
            <div class="modal-body">
              <h4 class="h4 text-center" id="text-win"></h4>
            </div>
          </div>
        </div>
      </div>
    `
  );

  // Criar sala no RealTime (DataB)
  let chave = Url.params.get("room");
  const room = await Store.getDocWhere("rooms", ["name", "==", chave]);

  await Store.setRoomAct(room.id);

  let isIn_room = false,
    isIn_db = false;

  if (!room.room_created) {
    await Store.updateDoc("rooms", room.id, { room_created: true });
    setTimeout(() => {
      game_dataB.room(room.game, room.name, room.num_ply);
      tic_tac_toe.preStart(room, true);
      return;
    }, 800);
  } else {
    let room_dataB = await DataB.get_once(room.game, `${room.name}`);
    let dados = [];

    room.players.forEach((player) => {
      player == User.username ? (isIn_room = true) : "";
    });

    room_dataB.players.forEach((player) => {
      dados.push(player);
      player == User.username ? (isIn_db = true) : "";
    });
    if (isIn_room) {
      if (!isIn_db) {
        tic_tac_toe.preStart(room);

        dados.push(User.username);
        await DataB.set(`${room.game}/${room.name}/players`, dados);
      }
    }
  }

  //
});

const tic_tac_toe = {
  board: ["", "", "", "", "", "", "", "", ""],
  room: "",
  symbols: {
    options: ["X", "O"],
    turn_index: 0, //turno
    change() {
      this.turn_index = this.turn_index === 0 ? 1 : 0;
    },
  },
  container_element: "",
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

  init: function () {
    this.room = RoomsFB.name;
    this.container_element = document.querySelector("#game");
  },

  //Define a mesa de jogo
  async preStart(room, ini) {
    const allPlayersRef = firebase
      .database()
      .ref(`tictactoe/${room.name}/players`);

    let roomId = await Store.getDocWhere(
      "rooms",
      ["name", "==", room.name],
      "id"
    );

    if (ini) {
      await Store.updateDoc("rooms", roomId, { state_game: true });
    }

    allPlayersRef.on("child_added", () => {
      // when new user is added
      allPlayersRef.get().then((snapshot) => {
        let num = [];
        num = snapshot.val();

        if (num.length == room.num_ply) {
          _aux.alertar("Todos jogadores estão na sala", "info");
          allPlayersRef.off();
        }
      });
    });
  },

  //
  start() {
    this.init();
    this.gameover = false;

    const gameoverRef = firebase
      .database()
      .ref(`tictactoe/${this.room}/gameover`);
    const boardRef = firebase.database().ref(`tictactoe/${this.room}/board`);

    game_dataB.start(RoomsFB.game, RoomsFB.name, this.board, this.gameover);

    RoomsFB.state_game = "started";
    Store.updateDoc("rooms", RoomsFB.id, RoomsFB);

    boardRef.on("value", (snapshot) => {
      // se board mudar
      this.board = snapshot.val();
      this.draw(this.board);
      //   console.log("Mudou", snapshot.val());
      console.log("board", this.board);
    });

    gameoverRef.on("value", (snapshot) => {
      // se board mudar
      console.log("Game Over", snapshot.val());
    });

    this.draw(this.board);

    let button = document.querySelector("#btn-action");
    button.classList.remove("sus");
    button.removeAttribute("onclick");
    button.setAttribute("onclick", `tic_tac_toe.restart()`);
    button.removeAttribute("title");
    button.setAttribute("title", `Recomeçar jogo`);
    button.innerHTML = "Recomeçar";
  },

  //Desenha na tela o jogo
  draw(board) {

    this.container_element.innerHTML = "";

    // console.log("desenho");
    for (i in board) {
      this.container_element.innerHTML += `<div class="ps-${i} ps" onclick="tic_tac_toe.make_play('${i}')">${board[i]}</div>`;
    }
  },

  // Define a mecanica do jogo
  make_play(position) {
    //Jogo acabou?
    if (this.gameover || this.board[position] !== "") return false;

    const currentSymbol = this.symbols.options[this.symbols.turn_index];

    this.board[position] = currentSymbol;

    DataB.update(`tictactoe/${RoomsFB.name}/board`, this.board);
    const win_sequences_index = this.check_win_sequences(currentSymbol);

    if (this.is_game_over()) {
      this.game_is_over();
    }

    if (win_sequences_index >= 0) {
      this.game_is_over();
      this.stylize_winner_sequence(
        this.win_sequences[win_sequences_index],
        currentSymbol
      );
    } else {
      this.symbols.change();
    }
    return true;
  },

  stylize_winner_sequence(winner_sequence, currentSymbol) {
    winner_sequence.forEach((position) => {
      this.container_element
        .querySelector(`div:nth-child(${position + 1})`)
        .classList.add("winner");
    });

    document.getElementById(
      "text-win"
    ).innerHTML = `${currentSymbol} venceu!!!`;
    document.getElementById("Modal-win").click();
  },

  game_is_over() {
    this.gameover = true;
    DataB.set(`tictactoe/${this.room}/gameover`, true);
  },

  is_game_over() {
    return !this.board.includes("");
  },

  restart() {
    for(i in this.board){
        this.board[i] = ""
    }

    if (this.is_game_over() || this.gameover) {
      this.start();
      console.log("this game has been restarted!");
    } else if (confirm("Are you sure you want to restart this game?")) {
      this.start();
      console.log("this game has been restarted!");
    }
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

};
