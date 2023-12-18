document.addEventListener("DOMContentLoaded", async () => {
  // console.log("inicio");

  _FIRE.initFirebase();

  await _aux.checkChangeState(true);

  auth_page_check();

  _html.elemento(
    "div",
    ["class", "style"],
    ["d-flex justify-content-center w-100 mb-2 pt-4", ""],
    "conteudo",
    `
    <button id="adm_mn_jogos" class="btn btn-primary disabled m-2" type="button" 
    onclick="_aux.changeVisibility('session_jogos')">
      Jogos
    </button>

    <button id="adm_mn_users" class="btn btn-primary m-2" type="button" 
    onclick="_aux.changeVisibility('session_users')">
      Administradores
    </button>
    `
  );

  adm_games();
  adm_Users();
});

const adm_db = {
  setJogo() {
    Games.nome = document.querySelector("#nameGAdm").value;
    Games.descricao = document.querySelector("#tescGAdm").value;
    Games.num_participantes = document.querySelector("#n_plGAdm").value;
    let url =
      "/html/games/" + document.querySelector("#urlGAdm").value + ".html?";
    Games.url = url;

    if (
      !Games.nome ||
      !Games.descricao ||
      !Games.num_participantes ||
      !Games.url
    )
      _aux.alertar("Preencha os campos", "warning");
    else {
      /* if (Games.num_participantes < 2) {
        _aux.alertar("Numero de participantes tem de ser maior que 1", "warning");
        return;
      } */
      Store.addDoc("games", Games);
      setTimeout(() => {
        _aux.Reload();
      }, 1000);
    }
  },

  async delete(docId) {
    if (await Store.deleteDoc("games", docId)) _aux.Reload();
  },

  async update(docId) {
    Games.nome = document.querySelector("#nameGAdm").value;
    Games.descricao = document.querySelector("#tescGAdm").value;
    Games.num_participantes = document.querySelector("#n_plGAdm").value;
    Games.url = document.querySelector("#urlGAdm").value;

    if (
      !Games.nome ||
      !Games.descricao ||
      !Games.num_participantes ||
      !Games.url
    )
      _aux.alertar("Preencha os campos", "warning");
    else {
      /* if (Games.num_participantes < 2) {
        _aux.alertar("Numero de participantes tem de ser maior que 1", "warning");
        return;
      } */
      if (await Store.updateDoc("games", docId, Games)) _aux.Reload();
    }
  },
};

function adm_games() {
  _html.elemento(
    "div",
    ["id", "class", "style"],
    ["session_jogos", "session_ m-auto w-75", "margin-bottom:35%"],
    "conteudo",
    `
    <span id="tableJogos" class="d-block bg-primary text-white"></span>
    <span class="d-block bg-dark text-white">
      <button type="button" class="btn btn-secondary 
      btn-sm m-1" onclick="html_Comp.adm_CRUD('create')"
        >
          Adicionar novo jogo
        </button>
    </span>
    `
  );

  async function tabela() {
    let index = 0;
    const gamesList = await Store.getCollection("games", "", ["nome", "asc"]);
    // console.log(gamesList);

    _html.elemento(
      "table",
      ["class"],
      [`table ${Theme.table} table-striped table-hover mb-1`],
      "tableJogos"
    );
    _html.elemento(
      "thead",
      [""],
      [""],
      "tableJogos > table",
      `
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nome</th>
        <th scope="col">Descrição</th>
        <th scope="col" title="Número de Participantes">Nº</th>
        <th scope="col"></th>
      </tr>
    `
    );
    _html.elemento("tbody", [""], [""], "tableJogos > table");

    gamesList.forEach((game) => {
      // console.log(game);
      _html.elemento(
        "tr",
        ["class"],
        ["align-middle"],
        "tableJogos > table > tbody",
        `
      <th scope="row">${++index}</th>
      <td>${game.nome}</td>
      <td>${game.descricao.slice(0, 20) + "..."}</td>
      <td>${game.num_participantes}</td>
      <td class="p-0"><span class="float-end"><button float-end class="btn btn-danger m-1 rounded" onclick="html_Comp.adm_CRUD('delete','${
        game.id
      }')">Apagar</button></span>
        <span><button class="btn float-end btn-primary m-1 rounded" onclick="html_Comp.adm_CRUD('update','${
          game.id
        }')">Editar</button></span>
        
      </td>
    `
      );
    });
  }

  // document.getElementById('urlGAdm').
  tabela();
}

function adm_Users() {
  _html.elemento(
    "div",
    ["id", "class", "style"],
    [
      "session_users",
      "session_ w-75 m-auto visually-hidden",
      "margin-bottom:35%",
    ],
    "conteudo",
    `
    <div class="d-flex bg-secondary" style="color:${Theme.textColor}">
      <input class="form-control me-2 m-2" type="search" style="background-color:${Theme.textColor}" placeholder="Perquisar" aria-label="Search">
      <button class="btn m-2" type="button" style="background-color:${Theme.textColor}" title="Perquisar">Perquisar</button>
    </div>
    <span id="tableUsers" class="d-block bg-dark" style="color:${Theme.textColor}"></span>
    `
  );

  function tabela() {
    let index = 0;

    setTimeout(async () => {
      // console.log("Uid", User.uid == "");
      // console.log("Uid", User.id);

      const usersList = await Store.getCollection(
        "users",
        ["uid", "not-in", [User.uid]],
        ""
      );

      // const teste = await Store.getDoc(
      //   "users",
      //   User.docId
      // );
      // console.log("Teste",teste);

      _html.elemento(
        "table",
        ["class"],
        [`table ${Theme.table} table-striped table-hover mb-1`],
        "tableUsers"
      );
      _html.elemento(
        "thead",
        [""],
        [""],
        "tableUsers > table",
        `
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nome Completo</th>
          <th scope="col">Administrador</th>
          <th scope="col"></th>
        </tr>
      `
      );
      _html.elemento("tbody", [""], [""], "tableUsers > table");

      usersList.forEach((user) => {
        // console.log("user", user);
        _html.elemento(
          "tr",
          ["class"],
          ["align-middle"],
          "tableUsers > table > tbody",
          `
        <th scope="row">${++index}</th>
        <td>${user.nome + " " + user.sobrenome}</td>
        <td id="${user.username}">${user.adm ? "Sim" : "Não"}</td>
        <td><button class="btn w-100 btn-primary btn-sm" 
          onclick="mudarEstado('${user.id}')" style="${
            user.adm ? "background-color:#922" : "background-color:#292"
          }; border:none"
          >Mudar Estado</button></td>
      `
        );
      });
    }, 3000);
  }

  tabela();
}

async function mudarEstado(user_id) {
  const userUp = await Store.getDoc("users", user_id);

  let stats = userUp.adm == false ? true : false;
  userUp.adm = stats;
  // console.log('userUp',userUp)

  if (Store.updateDoc("users", user_id, userUp)) {
    document.querySelector(`#tableUsers`).innerHTML = "";
    adm_Users();

    setTimeout(()=>{
      _aux.alertar("Estado mudado", "info");
    },2000)

  }
}
