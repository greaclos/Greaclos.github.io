//Funções auxiliares
var hidden, visibilityChange;
if (typeof document.hidden !== "undefined") {
  // Suporte para Opera 12.10 e Firefox 18 em diante
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.mozHidden !== "undefined") {
  hidden = "mozHidden";
  visibilityChange = "mozvisibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}

function Reload() {
  window.location.reload();
}

function navigate(url) {
  window.location.href = url;
}

function configBut() {
  const divPai = document.querySelector("#configBut");

  divPai.innerHTML += `
    <span class="float-left">
      <i class="text-secondary">@${User.username}</i> 
      <a id="btn-logout" class="btn-link" onclick="logOut()">Sair</a>
    </span>`;
}

async function modalCreateRoom(game) {
  const modal = document.querySelector("#createroomdrop");

  async function optionSelect() {
    const amigosUid = await firebase
      .firestore()
      .collection("users")
      .where("uid", "==", User.uid)
      .get()
      .then(async (userData) => {
        const dados = await userData.docs.map((doc) => doc.data());
        let arr = [];
        dados.forEach((element) => {
          element.amigos.forEach((e) => {
            arr.push(e);
          });
        });
        return arr;
      });
    // console.log(amigosUid);

    const fin = await firebase
      .firestore()
      .collection("users")
      .where("uid", "in", amigosUid)
      .get()
      .then(async (userData) => {
        const dados = await userData.docs.map((doc) => doc.data());
        let text = "";
        let usernames = [];
        let txtArr = "[";
        let index = 1;
        dados.forEach((element) => {
          text += `<input type="checkbox" value="${
            element.username
          }" class="btn-check w-100 m-1 amigo-selected" id="btn-check-${index}-outlined">
          <label class="btn btn-outline-secondary w-100 m-1 btn-check-${index}-outlined" for="btn-check-${index}-outlined">
          ${element.nome + " " + element.sobrenome}</label><br/>`;

          usernames.push(element.username);
          index++;
        });

        for (i in usernames) {
          if (i < usernames.length - 1) txtArr += `'${usernames[i]}',`;
          else if (i == usernames.length - 1) txtArr += `'${usernames[i]}']`;
        }

        console.log(txtArr);

        return { components: text, users: txtArr };
      });

    return await fin;
  }

  const OPSEL = await optionSelect();
  // console.log(OPSEL);

  modal.innerHTML = ` 
  <div class="modal-dialog modal-dialog-centered modal-sm">
    <div class="modal-content">
      <div class="modal-body">
        <h4 class="h4 text-center" id="title-create-room">Criar Sala ${
          game.name
        }</h4>
        <p class="text-center">Limite de participantes: +${game.numL - 1}</p>
        <form>
          <div class="mb-3">
            <label for="escolher-amigo" class="form-label"
              >Escolher amigo${game.numL > 2 ? "s" : ""}</label
            ><br />
            <div
              id="escolher-amigo"
            >
              ${OPSEL.components}
              </div>
          </div>
          <button
            type="button"
            class="btn btn-primary"
            onclick="createRoom(${game.numL - 1},'${game.url}',[${
    OPSEL.users
  }])"
          >
            Criar
          </button>
        </form>
      </div>
    </div>
  </div>`;
}

function createRoom(numL, url, plys) {
  const amigos = document.querySelectorAll(".amigo-selected");
  let selecionados = 0;
  let amigosSelecionados = [];
  let urlUsrname = "";
  let index = 0;

  amigos.forEach((amigo) => {
    if (amigo.checked) {
      selecionados++;
      amigosSelecionados.push(amigo);
    }
  });

  if (selecionados !== numL) {
    alertar("alert", "Selecione o numero certo de jogadores", "warning");
    console.log("Selecione o numero certo de jogadores");
    return false;
  }

  let num = amigosSelecionados.length + 1;

  urlUsrname += `npl=${num}&ply_${index}=${User.username}`;
  index++;

  for (i in amigosSelecionados) {
    if (index >= 1) urlUsrname += "&";

    urlUsrname += `ply_${index}=${amigosSelecionados[i].value}`;
    // console.log(urlUsrname);
    // console.log(i);
    index++;
  }

  navigate(url + urlUsrname);
}

function openModalGame(name, nLim, url) {
  modalCreateRoom({
    name: name,
    numL: nLim,
    url: url,
  });
  setTimeout(() => {
    document.getElementById("Modal-create-room").click();
  }, 500);
}

//Criar um elemento html
//  nome -      string ""           //Nome do elemento a ser criado
//  des_Attr -  String Array [""]   //Array com as descrições dos atributos (Ex. id, class, etc)
//  v_Attrs -   String Array [""]   //Array com os valores dos atributos acima citados
//      NB: A descrição e o valor devem estar nas mesmas posições em seus respectivos Arrays (Ex. des_Attrs[0] == "id" ! v_Attrs[0] == "myId"  )
//  e_Pai -     string ""           //id do elemento pai para o elemento (apenas texto, sem #)
//
//Ex. criarElemento("div", ["id","class"], ["box1","boxes"], "body")
function criarElemento(nome, des_Attrs, v_Attrs, e_Pai) {
  const PAI = document.querySelector(`#${e_Pai}`);
  let n_Attr = des_Attrs.length;

  let elemento = document.createElement(`${nome}`);
  for (let e = 0; e < n_Attr; e++) {
    elemento.setAttribute(`${des_Attrs[e]}`, `${v_Attrs[e]}`);
  }
  PAI.appendChild(elemento);
}

//Cria a lista de navegação, os nomes identificadores das paginas no menu
//  classUl -   string    [""]      //Classes para a tag Ul
//  textLi -    array     [""]      //nomes dos li, os titulos que aparecerão na barra
//  classA -    array     [""]      //classes para cada tag a correspondente aos nomes acima citados
//  func -                          //função pro onclick (Enviar com "") Ex. "funcao(parametros)"
//  e_Pai -     string    ""        //id do elemento pai para o elemento (apenas texto, sem #)
//Ex. navbar_list("navbar-nav ",["Home", "Histórico"],[`nav-link active`, `nav-link disabled`],[" ", " "],"navbarCollapse")
function navbar_list(classUl, textLi, classA, func, e_Pai) {
  let Pai = document.querySelector(`#${e_Pai}`);
  let numLi = textLi.length;

  let ul = document.createElement("ul");
  ul.setAttribute("class", `${classUl}`);

  for (let e = 0; e < numLi; e++) {
    let li = document.createElement(`li`);
    li.setAttribute("class", `nav-item`);

    let a = document.createElement("a");
    a.setAttribute("class", `${classA[e]}`);
    a.setAttribute("style", `cursor: pointer;`);
    a.setAttribute("onclick", func[e]);
    a.innerHTML = `${textLi[e]}`;

    li.appendChild(a);
    ul.appendChild(li);
  }

  Pai.appendChild(ul);
}

//Criar um elemento html com valor/Conteudo de texto
//  nome -      string ""           //Nome do elemento a ser criado
//  des_Attr -  String Array [""]   //Array com as descrições dos atributos (Ex. id, class, etc)
//  v_Attrs -   String Array [""]   //Array com os valores dos atributos acima citados
//      NB: A descrição e o valor devem estar nas mesmas posições em seus respectivos Arrays (Ex. des_Attrs[0] == "id" ! v_Attrs[0] == "myId"  )
//  e_Pai -     string ""           //id do elemento pai para o elemento (apenas texto, sem #)
//  txtHtml -   string ""           //texto que será inserido no corrpo do elemento
//
//Ex. criarElemento("h2", ["id","class"], ["titulo","conteudo"], "box1", "Como faze...")
function criarElementoWText(nome, des_Attrs, v_Attrs, e_Pai, txtHtml) {
  const PAI = document.querySelector(`#${e_Pai}`);
  let n_Attr = des_Attrs.length;

  let elemento = document.createElement(`${nome}`);
  for (let e = 0; e < n_Attr; e++) {
    elemento.setAttribute(`${des_Attrs[e]}`, `${v_Attrs[e]}`);
  }
  elemento.innerHTML = txtHtml;
  PAI.appendChild(elemento);
}

//Criar um elemento Form-Floating, imput e label dentro de uma div
//  id          string ""           //id do imput e que vai pro campo "for" da Label
//  des_Attr    String Array [""]   //Array com as descrições dos outros atributos (fora o id) (Ex. value, class, etc)
//  v_Attrs     String Array [""]   //Array com os valores dos atributos acima citados
//      NB: A descrição e o valor devem estar nas mesmas posições em seus respectivos Arrays (Ex. des_Attrs[0] == "type" ! v_Attrs[0] == "text"  )
//  e_Pai       string ""           //id do elemento pai para a div (apenas texto, sem #)
//  mb          number 0-5          //margem bottom
//
//Ex. criarElemento("input", ["type","class"], ["text","form-control"], "box1", 4)
function criarElementoFF(id, des_Attrs, v_Attrs, e_Pai, mb) {
  const PAI = document.querySelector(`#${e_Pai}`);
  let n_Attr = des_Attrs.length;

  let div = document.createElement(`div`);
  div.setAttribute("class", `form-floating mb-${mb}`);
  PAI.appendChild(div);

  let input = document.createElement(`input`);
  for (let e = 0; e < n_Attr; e++) {
    input.setAttribute(`${des_Attrs[e]}`, `${v_Attrs[e]}`);
  }
  input.setAttribute("id", `${id}`);
  div.appendChild(input);

  let label = document.createElement(`label`);
  label.setAttribute("for", `${id}`);
  label.innerHTML = v_Attrs[v_Attrs.length - 1];
  div.appendChild(label);
}

const hasUpper = (str) => /[A-Z]/.test(str);
const hasLower = (str) => /[a-z]/.test(str);
const hasNumber = (str) => /[0-9]/.test(str);

//Cria a parte direita da barra de navegação, a parte do utilizador (quando estiver logado apenas)
//  txtOption - Array  [""]         //Array com a lista das opções no dropdown (excepto o Sair que é predefinido)
//  onClick_fun                     //Array de Funções de onclick para cada elemento da lista acima citado
//  e_Pai       string ""           //id do elemento pai para a div (apenas texto, sem #)
//Ex. criarMenuPerfil(["Perfil"],["chamarfunção()"]"navbarCollapse > div")
function criarMenuPerfil(txtOption, onClick_fun, e_Pai) {
  const PAI = document.querySelector(`#${e_Pai}`);
  let n_Options = txtOption.length;

  let li2 = document.createElement("li");

  for (let e = 0; e < n_Options; e++) {
    let a = document.createElement("a");
    a.setAttribute("class", "dropdown-item");
    a.setAttribute("onclick", `${onClick_fun[e]}`);
    a.innerHTML = txtOption[e];

    li2.appendChild(a);
  }

  let hr = document.createElement("hr");
  hr.setAttribute("class", "dropdown-divider");
  li2.appendChild(hr);

  let sair = document.createElement("a");
  sair.setAttribute("class", "dropdown-item");
  sair.setAttribute("onclick", "logOut()");
  sair.innerHTML = "Sair";
  li2.appendChild(sair);

  let ul2 = document.createElement(`ul`);
  ul2.setAttribute("class", "dropdown-menu");
  ul2.setAttribute("aria-labelledby", "perfilDropM");
  ul2.appendChild(li2);

  let userID = document.createElement("span");
  userID.setAttribute("class", "mt-0 mb-0 m-2");

  userID.innerHTML = "@" + User.username;

  let aBtn = document.createElement("a");
  aBtn.setAttribute("class", "nav-link dropdown-toggle mt-0 mb-0 m-2");
  aBtn.setAttribute("id", "perfilDropM");
  aBtn.setAttribute("role", "button");
  aBtn.setAttribute("data-bs-toggle", "dropdown");
  aBtn.setAttribute("aria-expanded", "false");
  aBtn.appendChild(userID);

  // console.log(aBtn);

  let li = document.createElement(`li`);
  li.setAttribute("class", "nav-item dropdown");
  li.appendChild(aBtn);
  li.appendChild(ul2);

  let ul = document.createElement(`ul`);
  ul.setAttribute("class", "navbar-nav me-auto");
  ul.appendChild(li);

  PAI.appendChild(ul);
}

//----------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------

//Cria a barra de Navegção
//  state   string    //on para caso o utilizador esteja logado
//                    //off para o caso de não haver ninguem loggado

function navBar(state) {
  //Nav
  criarElemento(
    "nav",
    ["class"],
    [
      `navbar navbar-expand-md p-0 ${_tema.navBar.text} fixed-top ${_tema.navBar.back}`,
    ],
    "nav" /* div com id #nav */
  );

  //Container Fluid
  criarElemento("div", ["class"], [`container-fluid`], "nav > nav");

  //Logo Name
  criarElementoWText(
    "a",
    ["class", "href"],
    ["navbar-brand", "index.html"],
    "nav > nav > div",
    "Greaclos"
  );

  //Botão Hamburguer
  criarElemento(
    "button",
    [
      "class",
      "type",
      "data-bs-toggle",
      "data-bs-target",
      "aria-controls",
      "aria-expanded",
      "aria-label",
    ],
    [
      "navbar-toggler",
      "#button",
      "collapse",
      "#navbarCollapse",
      "navbarCollapse",
      "false",
      "Toggle navigation",
    ],
    "nav > nav > div"
  );

  //Span Icone Menu Hamburguer
  criarElemento(
    "span",
    ["class"],
    [`navbar-toggler-icon`],
    "nav > nav > div > button"
  );

  //NavbarCollapse - Lussta de opções
  criarElemento(
    "div",
    ["class", "id"],
    ["collapse navbar-collapse", "navbarCollapse"],
    "nav > nav > div"
  );

  //Lista
  navbar_list(
    "navbar-nav me-auto mb-2 mb-md-0",
    ["Home", "Todos Jogos", "Histórico"],
    [`nav-link active`, `nav-link disabled`, `nav-link disabled`],
    ["navigate('../index.html')", " "],
    "navbarCollapse"
  );

  //Div de Opções do lado direito
  criarElemento("div", ["class"], ["d-flex "], "navbarCollapse");

  if (state == "on") {
    //
    criarMenuPerfil(
      ["Perfil", "Another action"],
      ["", ""], //onclick
      "navbarCollapse > div"
    );
  } else if (state == "off") {
    //
    navbar_list(
      "navbar-nav me-auto mb-2 mb-md-0",
      ["Login", "Inscrever-se"],
      [`nav-link`, `nav-link`],
      [
        "control_Modal('Entrar', 'open');",
        "control_Modal('Registar', 'open');",
      ],
      "navbarCollapse > div"
    );
  }
}

//----------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------

// Alerta

//Cria os alestas dentro de divs
//    devem haver divs no codigo com id "alert-..." exclusivamente para serem usadas pelos alertas
//  idTarget    string      //se reefere ao id da div alert
//  meessage    string      //mensagem que aparecerá no alerta
//  type        string      //tipo de alerta
//                            success - para alertas de sucesso
//                            warning - para alertas de aviso
//                            danger - para alertas de erro
function alertar(idTarget, message, type) {
  let Pai = document.querySelector(`#${idTarget}`);

  console.log(Pai);
  let wrapper = document.createElement("div");
  wrapper.setAttribute("class", `alert alert-${type} mt-3 alert-dismissible`);
  wrapper.setAttribute("role", "alert");

  let mensagem = document.createElement("div");
  mensagem.innerHTML = `${message}`;

  wrapper.appendChild(mensagem);

  let btn = document.createElement("button");
  btn.setAttribute("type", "button");
  btn.setAttribute("class", "btn-close visually-hidden");
  btn.setAttribute("data-bs-dismiss", "alert");
  btn.setAttribute("aria-label", "Close");

  wrapper.appendChild(btn);
  Pai.appendChild(wrapper);

  setTimeout(() => {
    btn.click();
  }, [5000]);
}

// Loading
//Cria a tela de Loadeing e a mostra
function showLoading() {
  const Pai = document.querySelector("#loading");

  let modal = document.createElement("div");
  modal.classList.add("modal", "show", "LOAD");
  modal.setAttribute("style", "display: block;");
  modal.setAttribute("data-bs-backdrop", "static");
  modal.setAttribute("tabindex", "-1");
  modal.setAttribute("aria-modal", "true");

  let div = document.createElement("div");
  div.classList.add("loading", "centralizar");

  let img = document.createElement("img");
  img.setAttribute("src", "media/img/logo.png");

  div.appendChild(img);
  modal.appendChild(div);
  Pai.appendChild(modal);
}

//Remove a tela de loading - chamada logo depois da primeira (show)
function hideLoading() {
  const loadings = document.getElementsByClassName("LOAD");
  if (loadings.length) {
    loadings[0].remove();
  }
}

//---------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------
// Jogo da Velha- Tic Tac Toe -----------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------
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

    this.draw(this.board);
    game_database.update(this.board, false);
    game_database.listen();

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
    game_database.update(this.board, true);

    // console.log("GAME OVER");

    setTimeout(() => {
      game_database.remove();
    }, 5000);
  },

  is_game_over() {
    return !this.board.includes("");
  },

  start() {
    this.board.fill("");
    // this.draw();
    this.gameover = false;

    const urlParams = window.location;
    document.querySelector("#link").setAttribute("value", `${urlParams}`);
  },

  restart() {
    if (this.is_board_empty(this.board)) {
      // console.log("A board está vazia");
      alertar("alert", "A board está vazia", "warning");
      return false;
    }

    if (this.is_game_over() || this.gameover) {
      this.start();
      this.draw(this.board);
      console.log("this game has been restarted!");
    } else if (confirm("Are you sure you want to restart this game?")) {
      this.start();
      this.draw(this.board);
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
  draw(board) {
    this.container_element.innerHTML = board
      .map(
        (element, index) =>
          `<div class="ps-${index} ps" onclick="tic_tac_toe.make_play('${index}')">${element}</div>`
      )
      .reduce((content, current) => content + current);
  },
};

// Database
const game_database = {};

(() => {
  let game_id = false;

  function new_game(player1, player2, board) {
    const game_data = {
      player1: player1,
      player2: player2,
      board: board,
      gameover: false,
      createdat: firebase.database.ServerValue.TIMESTAMP,
    };

    if (!game_id) {
      game_id = firebase.database().ref().child("tictactoe").push().key;
    }

    let updates = {};
    updates["/tictactoe/" + game_id] = game_data;

    let game_ref = firebase.database().ref();

    game_ref
      .update(updates)
      .then(() => {
        return { success: true, message: "Game created" };
      })
      .catch((error) => {
        return { success: false, message: "Creation failed: ", error };
      });
  }

  function remove_game() {
    if (!game_id) return { success: false, message: "Invalid Game " };

    let game_ref = firebase.database().ref("/tictactoe/" + game_id);

    game_ref
      .remove()
      .then(() => {
        return { success: true, message: "Game removed" };
      })
      .catch((error) => {
        return { success: false, message: "Remove failed: ", error };
      });
  }

  function update_game(board, gameover) {
    if (!game_id) return { success: false, message: "Invalid Game " };

    let game_ref = firebase.database().ref("/tictactoe/" + game_id);

    let updates = {};
    updates["/board"] = board;
    updates["/lastupdate"] = firebase.database.ServerValue.TIMESTAMP;
    updates["/gameover"] = gameover;

    game_ref
      .update(updates)
      .then(() => {
        return { success: true, message: "Game updated" };
      })
      .catch((error) => {
        return { success: false, message: "Update failed: ", error };
      });
  }

  function reset_game() {
    if (!game_id) return { success: false, message: "Invalid Game " };

    game_id = false;
    return { success: true, message: "Game reset" };
  }

  async function listen_game() {
    if (!game_id) return { success: false, message: "Invalid Game " };

    let game_ref = firebase.database().ref("/tictactoe/" + game_id);

    game_ref
      .once("child_changed")
      .then((snapshot) => {
        //Board
        if (snapshot.key == "board") {
          console.log("Board Changed", snapshot.val());
          update_game(snapshot.val, tic_tac_toe.gameover);
          tic_tac_toe.draw(snapshot.val);
          return {
            success: true,
            message: "Board updated",
            data: snapshot.val(),
          };
          //gameOver
        } else if (snapshot.key == "gameover") {
          console.log("Game Over", snapshot.val());
          return {
            success: true,
            message: "Game Over",
            data: snapshot.val(),
          };
        }
      })
      .catch((error) => {
        return { success: false, message: "Invalid data: ", error };
      });
  }

  game_database.new = new_game;
  game_database.remove = remove_game;
  game_database.update = update_game;
  game_database.reset = reset_game;
  game_database.listen = listen_game;
})();

//Jogo da Velha
//---------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------
//-           --    --          ---         --          ---           --
//-           --    --    --     --         --    --     --     -     --
//-   ----------    --    ---    --   --------    --     --    ---    --
//-   ----------    --    --    ---   --------    -     ---    ---    --
//-         ----    --         ----       ----         ----    ---    --
//-         ----    --        -----       ----          ---           --
//-   ----------    --    -   -----   --------    --     --           --
//-   ----------    --    --    ---   --------    ---    --    ---    --
//-   ----------    --    ---   ---   --------    --     --    ---    --
//-   ----------    --    ---   ---         --          ---    ---    --
//-   ----------    --    ---   ---         --         ----    ---    --
//------------------------------------------------------------------------------------------------------------------------

//Valida a autenticação
//Recebendo os codigos de erro, traduzindo para portugues
//E criando alertas
//    code    string    //codigo de erro
//    who     string    //se refere a pra quem será o alerta, o nome depois de "alert-"
function validaAuth(code, who) {
  switch (code) {
    case "auth/wrong-password":
      alertar(`alert-${who}`, "Palavra-passe errada!", "danger");
      console.log("Palavra-passe errada!");
      break;
    case "auth/invalid-email":
      alertar(`alert-${who}`, "Endereço de e-mail não válido!", "danger");
      console.log("Endereço de e-mail não válido!");
      break;
    case "auth/user-disabled":
      alertar(`alert-${who}`, "Este utilizador foi desabilitado.", "danger");
      console.log("Este utilizador foi desabilitado.");
      break;
    case "auth/user-not-found":
      alertar(`alert-${who}`, "Utilizador não encontrado.", "danger");
      console.log("Utilizador não encontrado.");
      break;
    case "auth/too-many-requests":
      alertar(
        `alert-${who}`,
        "Devida a atividades suspeitas, deverá tentar de novo em alguns minutos",
        "danger"
      );
      console.log(
        "Devida a atividades suspeitas, deverá tentar de novo em alguns minutos."
      );
      break;
    case "auth/email-already-in-use":
      alertar(`alert-${who}`, "Já existe uma conta neste email.", "warning");
      console.log("Já existe uma conta neste email.");
      break;
    case "auth/weak-password":
      alertar(
        `alert-${who}`,
        "Sua palavra passe é muito fraca, tente outra por favor.",
        "warning"
      );
      console.log("Sua palavra passe é muito fraca, tente outra por favor.");
      break;
    case "auth/operation-not-allowed":
      alertar(`alert-${who}`, "A conta neste email foi desativada.", "warning");
      console.log("A conta neste email foi desativada.");
      break;
    default:
      break;
  }
}

//Login
//Isso é auuto-explicativo, mas tem comentários dentro
function login() {
  //Pegar valores do formulario
  const email = document.getElementById("emailLg").value;
  const password = document.getElementById("passwordLg").value;

  console.log(email, password);
  //validar se nenhum dos campos está nulo
  if (email && password) {
    console.log(firebase);
    //Faz a requisição de login, passando o email e password como parametros
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        //Caso a requisição seja bem sucedida

        // firebase.firestore().collection('users').where('uid','==',)
        alertar("Login efetuado com sucesso!", "success");

        console.log(response);
        document.getElementById("password").value = "";
        document.getElementById("email").value = "";
        authLogin();
      })
      .catch((error) => {
        //Caso a requisição dê erro

        //Reseta campo do formulario
        document.getElementById("password").value = "";

        //Chamada da função validaAuth
        validaAuth(error.code);
      });
  } else {
    //se email nulo mostra o allerta
    email ? "" : alertar("O campo email é obrigatório", "warning");
    //se password nula mostra o allerta
    password ? "" : alertar("O campo palavra passe é obrigatório", "warning");
  }
}

//Registo
//Isso também é auto-eexplicativo, e ainda não tem comeentários dentro, porque ainda não acabei
function register() {
  const username = document.getElementById("usernameRg").value;
  const name = document.getElementById("nameRg").value;
  const surname = document.getElementById("surnameRg").value;
  const email = document.getElementById("emailRg").value;
  const email_conf = document.getElementById("c-emailRg").value;
  const password = document.getElementById("passwordRg").value;
  const password_conf = document.getElementById("c-passwordRg").value;

  if (email != email_conf || password != password_conf) {
    email != email_conf
      ? alertar(
          `alert-Registar`,
          "A confirmaação do email não confere",
          "danger"
        )
      : "";
    password != password_conf
      ? alertar(
          `alert-Registar`,
          "A confirmaação da password não confere",
          "danger"
        )
      : "";
  } else {
    control_Modal("Registar", "close");
    showLoading();

    // console.log(email, password);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        hideLoading();
        window.location.reload(false);

        setTimeout(() => {
          alert("conta criada com sucesso");
          control_Modal("Registar", "close");
        }, [2000]);
      })
      .catch((error) => {
        hideLoading();
        control_Modal("Registar", "open");

        console.log(error.code);
        validaAuth(error.code, "Registar");
      });
  }
}

//Recuperar password
//Oh MAIGODE, pra quê que será isso? (Obviamente estou sendo irónico)
function recoverPassword() {
  const email = document.getElementById("emailLg").value;

  if (email) {
    control_Modal("Entrar", "close");
    showLoading();

    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        hideLoading();
        control_Modal("Entrar", "open");

        alertar(
          `alert-Entrar`,
          "Foi enviado para o seu email o link para recuperação. Por favor verifique o Spam",
          "success"
        );
      })
      .catch((error) => {
        hideLoading();
        control_Modal("Entrar", "open");

        console.log(error.code);
        validaAuth(error.code, "Entrar");
      });
  } else {
    alertar(`alert-Entrar`, "O campo email é obrigatório", "danger");
    console.log("O campo email é obrigatório");
  }
}

//Desisto
//Essa função aqui faz biscoito
function logOut() {
  if (firebase.auth().currentUser) {
    firebase
      .auth()
      .signOut()
      .then(async () => {
        window.location.reload(false);
      });
  }
}
