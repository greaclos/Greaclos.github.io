//Data
const dt = new Date();
const today = {
  dia: dt.getDate() < 10 ? "0" + dt.getDate() : dt.getDate() + "",
  mes:
    dt.getUTCMonth() + 1 < 10
      ? "0" + dt.getUTCMonth() + 1
      : "" + (dt.getUTCMonth() + 1),
  ano: dt.getFullYear(),

  date() {
    return this.ano + "-" + this.mes + "-" + this.dia;
  },
};

//Navegação
const Url = {
  path: window.location.href,
  params: new URLSearchParams(window.location.search),
};

//User
const User = {
  uid: "",
  adm: false,
  username: "",
  nome: "",
  sobrenome: "",
  dataNascimento: [],
  amigos: [],
  theme: "dark",
  id: "",
  descricao: "",
  gostos: [],
  new_chat: true,
  chats: [{}],
};

//games
const Games = {
  descricao: "",
  nome: "",
  num_participantes: 0,
  room: {
    rid: "",
  },
  url: "",
};

//rooms
const RoomsFB = {
  game: "",
  name: "",
  data_criacao: "",
  players: [{}],
  num_ply: 0,
  state_game: "",
  room_created: false,
  id: "",
};

//tema
let Theme = {
  backColor: "",
  textColor: "",
  form: {
    textbox: "",
    colorText: "",
  },
  modal: {
    text: "",
    backColor: "",
    closeBtn: "",
  },
  navBar: {
    back: "",
    text: "",
  },
  table: "",
  icons: {
    chat: {
      empty: "",
      fill: "",
    },
    key: "",
  },
};

const fotoVazio =
  "https://firebasestorage.googleapis.com/v0/b/greaclos-world.appspot.com/o/perfil%2Fvazio.jpg?alt=media&token=b444e66b-8d71-4f30-be7f-8ad328c6fec8";

//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------

const theme = {
  setDarkTheme() {
    Theme = {
      backColor: "bg-black",
      textColor: "#cccdb5",
      form: {
        textbox: "#ddd",
        colorText: "#000",
      },
      modal: {
        text: "#ddd",
        backColor: "#111",
        closeBtn: "btn-close-white",
      },
      navBar: {
        back: "bg-black",
        text: "navbar-dark",
      },
      table: "table-dark",
      icons: {
        chat: {
          fill: `
          <svg xmlns="http://www.w3.org/2000/svg" 
            width="20px" height="20px" viewBox="0 0 512 512">
            <path d="M448 312.43c.77-1.11 1.51-2.26 2.27-3.34A174.55 174.55 0 00480 211.85C480.32 112.55 396.54 32 292.94 32c-90.36 0-165.74 61.49-183.4 143.12a172.81 172.81 0 00-4 36.83c0 99.4 80.56 182.11 184.16 182.11 16.47 0 38.66-4.95 50.83-8.29s24.23-7.75 27.35-8.94 8-2.41 11.89-1.29l77.42 22.38a4 4 0 005-4.86l-17.72-67.49c-1.23-5-1.39-5.94 3.53-13.14z"
              fill="#cccdb5"/>
            <path d="M312.54 415.38a165.32 165.32 0 01-23.26 2.05c-42.43 0-82.5-11.2-115-32.2a184.09 184.09 0 01-53.09-49.32c-26.08-34.57-40.3-78.51-40.3-124.49 0-3.13.11-6.14.22-9.16a4.34 4.34 0 00-7.54-3.12 158.76 158.76 0 00-14.86 195.24c2.47 3.77 3.87 6.68 3.44 8.62l-14.09 72.26a4 4 0 005.22 4.53l68-24.24a16.85 16.85 0 0112.92.22c20.35 8 42.86 12.92 65.37 12.92a169.45 169.45 0 00116.63-46 4.29 4.29 0 00-3.66-7.31z"
              fill="#cccdb5"/>
          </svg>`,
          empty: `
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 512 512">
            <path d="M431 320.6c-1-3.6 1.2-8.6 3.3-12.2a33.68 33.68 0 012.1-3.1A162 162 0 00464 215c.3-92.2-77.5-167-173.7-167-83.9 0-153.9 57.1-170.3 132.9a160.7 160.7 0 00-3.7 34.2c0 92.3 74.8 169.1 171 169.1 15.3 0 35.9-4.6 47.2-7.7s22.5-7.2 25.4-8.3a26.44 26.44 0 019.3-1.7 26 26 0 0110.1 2l56.7 20.1a13.52 13.52 0 003.9 1 8 8 0 008-8 12.85 12.85 0 00-.5-2.7z" 
              stroke="#cccdb5" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"/>
            <path d="M66.46 232a146.23 146.23 0 006.39 152.67c2.31 3.49 3.61 6.19 3.21 8s-11.93 61.87-11.93 61.87a8 8 0 002.71 7.68A8.17 8.17 0 0072 464a7.26 7.26 0 002.91-.6l56.21-22a15.7 15.7 0 0112 .2c18.94 7.38 39.88 12 60.83 12A159.21 159.21 0 00284 432.11" 
              stroke="#cccdb5" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"/>
          </svg>`,
        },
        key: `
        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 512 512">
        <path d="M218.1 167.17c0 13 0 25.6 4.1 37.4-43.1 50.6-156.9 184.3-167.5 194.5a20.17 20.17 0 00-6.7 15c0 8.5 5.2 16.7 9.6 21.3 6.6 6.9 34.8 33 40 28 15.4-15 18.5-19 24.8-25.2 9.5-9.3-1-28.3 2.3-36s6.8-9.2 12.5-10.4 15.8 2.9 23.7 3c8.3.1 12.8-3.4 19-9.2 5-4.6 8.6-8.9 8.7-15.6.2-9-12.8-20.9-3.1-30.4s23.7 6.2 34 5 22.8-15.5 24.1-21.6-11.7-21.8-9.7-30.7c.7-3 6.8-10 11.4-11s25 6.9 29.6 5.9c5.6-1.2 12.1-7.1 17.4-10.4 15.5 6.7 29.6 9.4 47.7 9.4 68.5 0 124-53.4 124-119.2S408.5 48 340 48s-121.9 53.37-121.9 119.17zM400 144a32 32 0 11-32-32 32 32 0 0132 32z"
          fill="#cccdb5"/>
        </svg>`,
      },
    };
  },

  setLightTheme() {
    Theme = {
      backColor: "bg-white",
      textColor: "#111",
      form: {
        textbox: "#fff",
        colorText: "#000",
      },
      modal: {
        text: "#000",
        backColor: "#eee",
        closeBtn: "",
      },
      navBar: {
        back: "bg-white",
        text: "navbar-light",
      },
      table: "table-light",
      icons: {
        chat: {
          empty: "",
          fill: "",
        },
      },
    };
  },
};

const banner = {
  files: [
    {
      title: "What is Lorem Ipsum?",
      paragrafo:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
      url: "https://firebasestorage.googleapis.com/v0/b/greaclos-world.appspot.com/o/banner%2Flevel-retro.webm?alt=media&token=a2fe7790-c546-4a97-b88e-6c4ba2388d02&_gl=1*6tc96*_ga*MTI3OTUyOTQ3LjE2OTIzNTc4MzE.*_ga_CW55HF8NVT*MTY5ODY1MjA1Mi40Ny4xLjE2OTg2NTQ4ODIuNjAuMC4w",
      type: "video/webm",
    },
    {
      title: "Why do we use it?",
      paragrafo:
        "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.",
      url: "https://firebasestorage.googleapis.com/v0/b/greaclos-world.appspot.com/o/banner%2Fstart-game-arcade.webm?alt=media&token=64f9b0e6-fea4-4170-b26e-5dcfd43f536c&_gl=1*1fvn0uz*_ga*MTI3OTUyOTQ3LjE2OTIzNTc4MzE.*_ga_CW55HF8NVT*MTY5ODY4NjYzNC41MC4xLjE2OTg2ODY2NTUuMzkuMC4w",
      type: "video/webm",
    },
    {
      title: "Where does it come from?",
      paragrafo:
        "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
      url: "https://firebasestorage.googleapis.com/v0/b/greaclos-world.appspot.com/o/banner%2Fping-pong.webm?alt=media&token=a8bd4b30-6336-46b8-b478-e70fa1ac583a&_gl=1*t7bwsg*_ga*MTI3OTUyOTQ3LjE2OTIzNTc4MzE.*_ga_CW55HF8NVT*MTY5ODY4OTEzNy41MS4wLjE2OTg2ODkxMzcuNjAuMC4w",
      type: "video/webm",
    },
    {
      title: "Where can I get some?",
      paragrafo:
        "It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.",
      url: "https://firebasestorage.googleapis.com/v0/b/greaclos-world.appspot.com/o/banner%2Fsnake-arcade.webm?alt=media&token=01742564-b94b-432b-afcf-ccb897452219&_gl=1*1j21y4o*_ga*MTI3OTUyOTQ3LjE2OTIzNTc4MzE.*_ga_CW55HF8NVT*MTY5ODY4OTEzNy41MS4xLjE2OTg2ODkxODAuMTcuMC4w",
      type: "video/webm",
    },
  ],
  file: {
    title: "",
    paragrafo: ".",
    url: "",
    type: "",
  },
  count: 0,
  video: "",

  setVideo() {
    this.video = `
    <video autoplay muted loop>
        <source src="${this.file.url}" type="${this.file.type}">
    </video>
    <div class="content text-center">
        <h1>${this.file.title}</h1>
            <p>${this.file.paragrafo}</p>
        <!-- <a href="#"><img src=""></a> -->
        <!-- <a href="#"><img src=""></a> -->
    </div>`;
  },

  start() {
    this.file = this.files[0];

    this.setVideo();

    _html.elemento(
      "div",
      ["class", "id"],
      ["banner", "banner"],
      "conteudo",
      this.video
    );

    this.count++;
    setTimeout(() => {
      setInterval(() => {
        this.changeVid();
      }, 10000);
    }, 5000);
  },

  changeVid() {
    this.count >= this.files.length ? (this.count = 0) : "";

    this.file = this.files[this.count];

    // console.log(this.files[this.count]);
    this.setVideo();

    document.querySelector("#banner").innerHTML = this.video;

    this.count++;
  },
};

const html_Comp = {
  rodape() {
    _html.elemento(
      "div",
      ["id", "class"],
      ["rodape", "w-100 bg-dark d-flex"],
      "conteudo",
      `
        <hr class="mt-0">
        <div class="w-100 d-flex justify-content-center">
            <div class="w-75 text-center">
                Todos direitos reservados a Greaclos 2023
            </div>
        </div>
        `
    );
  },

  conteudo(cont) {
    if (cont == "clear") {
      document.querySelector("#conteudo").innerHTML = "";
    } else {
      _html.elemento(
        "div",
        ["id", "class"],
        ["inner-conteudo", "w-100 pt-4 d-flex justify-content-center"],
        "conteudo",
        `<div class="mt-0 m-3" id="cont-cont">
            ${cont}
            </div>
        `
      );
    }
  },

  async adm_CRUD(mode, docId) {
    document.querySelector("#modal").innerHTML = "";

    console.log("in ADM CRUD");
    _html.elemento(
      "button",
      ["id", "type", "class", "data-bs-toggle", "data-bs-target"],
      [
        "adm-modal",
        "button",
        "btn btn-primary visually-hidden",
        "modal",
        "#admModal",
      ],
      "modal",
      "ADM CRUD Modal"
    );

    if (mode === "create") {
      _html.elemento(
        "div",
        [
          "id",
          "class",
          "data-bs-backdrop",
          "data-bs-keyboard",
          "tabindex",
          "aria-labelledby",
          "aria-hidden",
        ],
        [
          "admModal",
          "modal fade",
          "static",
          "false",
          "-1",
          "#admModalLabel",
          "true",
        ],
        "modal",
        `<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div
          class="modal-content rounded-4 shadow"
          style="background-color: ${Theme.modal.backColor}; color: ${Theme.modal.text}"
        >
          <div
            class="modal-header p-5 pb-4 border-bottom-0"
          >
            <h1 class="fw-bold mb-0 fs-2">Adicionar Jogo</h1>
            <button
              type="button"
              class="btn-close ${Theme.modal.closeBtn}"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body p-5 pt-0">
              <div class="w-100"></div>

              <div class="input-group input-group-sm mb-3">
                <div class="form-floating">
                <input
                  required=""
                  type="text"
                  class="form-control"
                  style="background-color: ${Theme.form.textbox}"
                  placeholder="Nome do Jogo"
                  id="nameGAdm"
                /><label for="nameGAdm" style="color: ${Theme.form.colorText}">Nome do Jogo</label>
              </div>
              <div class="form-floating">
                  <input
                    required=""
                    type="number"
                    class="form-control"
                    style="background-color: ${Theme.form.textbox}"
                    placeholder="Nº de players"
                    id="n_plGAdm"
                  /><label for="n_plGAdm" style="color: ${Theme.form.colorText}">Nº de players</label>
                </div>
              </div>

              <div class="form-floating mb-3">
                <textarea class="form-control" style="background-color: ${Theme.form.textbox}; height: 80px;" placeholder="Descrição do jogo" id="tescGAdm"></textarea>
                <label for="tescGAdm" style="color: ${Theme.form.colorText}">Descrição do jogo</label>
              </div>

              <div class="input-group mb-3 w-100 d-flex align-items-stretch">
                <input class="form-control" 
                  style="max-width:8rem; background-color: ${Theme.form.textbox};color:gray" 
                  disabled value="/html/games/" />
                <div class="form-floating">
                  <input
                    required=""
                    type="text"
                    class="form-control"
                    style="background-color: ${Theme.form.textbox}"
                    placeholder="URL"
                    id="urlGAdm"
                  /><label for="urlGAdm" style="color: ${Theme.form.colorText}">Nome do jogo URL</label>
                </div>
                <input class="form-control" 
                  style="max-width:5rem; background-color: ${Theme.form.textbox};color:gray" 
                  disabled value=".html" />
              </div>

              

              <button
                class="w-100 mb-2 btn btn-lg rounded-3 bg-primary text-light"
                type="button"
                onclick="adm_db.setJogo()"
              >
                Adicionar
              </button>
          </div>
        </div>
      </div>`
      );
    } else if (mode === "update") {
      if (docId) {
        const game_db = await Store.getDoc("games", docId);
        console.log("game_db", game_db);
        _html.elemento(
          "div",
          [
            "id",
            "class",
            "data-bs-backdrop",
            "data-bs-keyboard",
            "tabindex",
            "aria-labelledby",
            "aria-hidden",
          ],
          [
            "admModal",
            "modal fade",
            "static",
            "false",
            "-1",
            "#admModalLabel",
            "true",
          ],
          "modal",
          `<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div
          class="modal-content rounded-4 shadow"
          style="background-color: ${Theme.modal.backColor}; color: ${
            Theme.modal.text
          }"
        >
          <div
            class="modal-header p-5 pb-4 border-bottom-0"
          >
            <h1 class="fw-bold mb-0 fs-2">Adicionar Jogo</h1>
            <button
              type="button"
              class="btn-close ${Theme.modal.closeBtn}"
              id="modal-close-up"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body p-5 pt-0">
              <div class="w-100"></div>

              <div class="input-group input-group-sm mb-3">
                <div class="form-floating">
                <input
                  required=""
                  type="text"
                  class="form-control"
                  style="background-color: ${Theme.form.textbox}"
                  placeholder="Nome do Jogo"
                  value="${game_db.nome}"
                  id="nameGAdm"
                /><label for="nameGAdm" style="color: ${
                  Theme.form.colorText
                }">Nome do Jogo</label>
              </div>
              <div class="form-floating">
                  <input
                    required=""
                    type="number"
                    value="${parseInt(game_db.num_participantes)}"
                    class="form-control"
                    style="background-color: ${Theme.form.textbox}"
                    placeholder="Nº de players"
                    id="n_plGAdm"
                  /><label for="n_plGAdm" style="color: ${
                    Theme.form.colorText
                  }">Nº de players</label>
                </div>
              </div>

              <div class="form-floating mb-3">
                <textarea class="form-control" style="background-color: ${
                  Theme.form.textbox
                }; height: 80px;" placeholder="Descrição do jogo" id="tescGAdm">${
            game_db.descricao
          }</textarea>
                <label for="tescGAdm" style="color: ${
                  Theme.form.colorText
                }">Descrição do jogo</label>
              </div>

              <div class="form-floating mb-3">
                  <input
                    required=""
                    type="text"
                    class="form-control"
                    style="background-color: ${Theme.form.textbox}"
                    value="${game_db.url}"
                    placeholder="URL"
                    id="urlGAdm"
                  /><label for="urlGAdm" style="color: ${
                    Theme.form.colorText
                  }">URL</label>
                </div>


                <div class="btn-group w-100 mb-2" role="group" aria-label="Basic mixed styles example">
                  <button type="button" class="btn btn-secondary" onclick="document.getElementById('modal-close-up').click()">Cancelar</button>
                  <button type="button" onclick="adm_db.update('${docId}')" class="btn btn-success">Editar</button>
                </div>

              
          </div>
        </div>
      </div>`
        );
      }
    } else if (mode === "delete") {
      if (docId) {
        _html.elemento(
          "div",
          [
            "id",
            "class",
            "data-bs-backdrop",
            "data-bs-keyboard",
            "tabindex",
            "aria-labelledby",
            "aria-hidden",
          ],
          [
            "admModal",
            "modal fade",
            "static",
            "false",
            "-1",
            "#admModalLabel",
            "true",
          ],
          "modal",
          `<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div
          class="modal-content rounded-4 shadow"
          style="background-color: ${Theme.modal.backColor}; color: ${Theme.modal.text}"
        >
          <div
            class="modal-header p-5 pb-4 border-bottom-0"
          >
            <h1 class="fw-bold mb-0 fs-2">Adicionar Jogo</h1>
            <button
              type="button"
              class="btn-close ${Theme.modal.closeBtn}"
              data-bs-dismiss="modal"
              id="modal-close-del"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body p-5 pt-0">
              <div class="w-100"></div>

              <p class="lead" style="color:${Theme.textColor}">
                Tem certeza que deseja apagar este jogo?
              </p>

              <div class="btn-group w-100 mb-2" role="group" aria-label="Basic mixed styles example">
                <button type="button" class="btn btn-secondary" onclick="document.getElementById('modal-close-del').click()">Cancelar</button>
                <button type="button" onclick="adm_db.delete('${docId}')" class="btn btn-danger">Apagar</button>
              </div>

          </div>
        </div>
      </div>`
        );
      }
    }

    console.log(document.getElementById("adm-modal"));
    document.getElementById("adm-modal").click();
  },

  authModal(type) {
    document.querySelector("#modal").innerHTML = "";

    //Button trigger modal
    _html.elemento(
      "button",
      ["id", "type", "class", "data-bs-toggle", "data-bs-target"],
      [
        "auth-modal",
        "button",
        "btn btn-primary invisible",
        "modal",
        "#authModal",
      ],
      "modal",
      "Auth Modal"
    );

    if (type === "login") {
      _html.elemento(
        "div",
        [
          "id",
          "class",
          "data-bs-backdrop",
          "data-bs-keyboard",
          "tabindex",
          "aria-labelledby",
          "aria-hidden",
        ],
        [
          "authModal",
          "modal fade",
          "static",
          "false",
          "-1",
          "#authModalLabel",
          "true",
        ],
        "modal",
        `<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div
        id="modalEntrar-content"
        class="modal-content rounded-4 shadow"
        style="background-color: ${Theme.modal.backColor}; color: ${Theme.modal.text}"
      >
        <div
          id="modalEntrar-content-header"
          class="modal-header p-5 pb-4 border-bottom-0"
        >
          <h1 class="fw-bold mb-0 fs-2">Entrar na Greaclos</h1>
          <button
            type="button"
            class="btn-close ${Theme.modal.closeBtn}"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="modal-close-Entrar"
          ></button>
        </div>
        <div id="modalEntrar-body" class="modal-body p-5 pt-0">
          <form id="form-Entrar" class="">
            <div class="form-floating mb-3">
              <input
                required=""
                type="email"
                class="form-control"
                style="background-color: ${Theme.form.textbox}"
                placeholder="E-mail"
                id="emailLg"
              /><label for="emailLg" style="color: ${Theme.form.colorText}">E-mail</label>
            </div>
            <div class="form-floating mb-3">
              <input
                required=""
                type="password"
                minlength="6"
                class="form-control"
                style="background-color: ${Theme.form.textbox}"
                placeholder="Palavra-passe"
                id="passwordLg"
              /><label for="passwordLg" style="color: ${Theme.form.colorText}">Palavra-passe</label>
            </div>
            <button
            id="btn-login"
              class="w-100 mb-2 btn btn-lg rounded-3 bg-primary text-light"
              type="submit"
            >
              Entrar</button
            ><button
              class="w-100 mb-2 btn btn-outline-secondary rounded-3" "
              type="button"
              onclick="document.getElementById('modal-close-Entrar').click();html_Comp.authModal('register')"
            >
              Inscrever-se
            </button>
            <div
              class="btn-log text-muted w-100 text-center mt-3"
              onclick="_Auth.recoverPassword()"
              title="Escreva o seu email no campo correspondente e clica aqui"
            >
              Recuperar palavra passe
            </div>
            <hr class="my-4" />
            <h2 class="fs-5 fw-bold mb-3">Ou entre com</h2>
            <button
              class="w-100 py-2 mb-2 btn btn-outline-danger disabled rounded-3"
              type="button"
              id="logar-wGoogle"
            >
              Google
            </button>
            <button
              class="w-100 py-2 mb-2 btn btn-outline-dark text-secondary rounded-3"
              type="button"
              onclick="_Auth.loginAnom()"
              id="logar-wAnonim"
            >
              <svg
                width="20px"
                height="20px"
                xmlns="http://www.w3.org/2000/svg"
                class="ionicon"
                viewBox="0 0 512 512"
              >
                <path
                  d="M332.64 64.58C313.18 43.57 286 32 256 32c-30.16 0-57.43 11.5-76.8 32.38-19.58 21.11-29.12 49.8-26.88 80.78C156.76 206.28 203.27 256 256 256s99.16-49.71 103.67-110.82c2.27-30.7-7.33-59.33-27.03-80.6zM432 480H80a31 31 0 01-24.2-11.13c-6.5-7.77-9.12-18.38-7.18-29.11C57.06 392.94 83.4 353.61 124.8 326c36.78-24.51 83.37-38 131.2-38s94.42 13.5 131.2 38c41.4 27.6 67.74 66.93 76.18 113.75 1.94 10.73-.68 21.34-7.18 29.11A31 31 0 01432 480z"
                />
              </svg>
              Anónimo
            </button>
          </form>
        </div>
      </div>
    </div>`
      );
      listnerEvent.login();
    } else if (type === "register") {
      _html.elemento(
        "div",
        [
          "id",
          "class",
          "data-bs-backdrop",
          "data-bs-keyboard",
          "tabindex",
          "aria-labelledby",
          "aria-hidden",
        ],
        [
          "authModal",
          "modal fade",
          "static",
          "false",
          "-1",
          "#authModalLabel",
          "true",
        ],
        "modal",
        `<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div
          id="modalRegistar-content"
          class="modal-content rounded-4 shadow"
          style="background-color: ${Theme.modal.backColor}; color: ${Theme.modal.text}"
        >
          <div
            id="modalRegistar-content-header"
            class="modal-header p-5 pb-4 border-bottom-0"
          >
            <h1 class="fw-bold mb-0 fs-2">Se inscreva de Graça</h1>
            <button
              type="button"
              class="btn-close ${Theme.modal.closeBtn}"
              data-bs-dismiss="modal"
              aria-label="Close"
              id="modal-close-Registar"
            ></button>
          </div>
          <div id="modalRegistar-body" class="modal-body p-5 pt-0">
            <form id="form-Registar" class="">
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  style="background-color: ${Theme.form.textbox}"
                  placeholder="@username"
                  id="usernameRg"
                /><label for="usernameRg" style="color: ${Theme.form.colorText}">@username</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  style="background-color: ${Theme.form.textbox}"
                  placeholder="Nome"
                  id="nameRg"
                /><label for="nameRg" style="color: ${Theme.form.colorText}">Nome</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  style="background-color: ${Theme.form.textbox}"
                  placeholder="Sobrenome"
                  id="surnameRg"
                /><label for="surnameRg" style="color: ${Theme.form.colorText}">Sobrenome</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="date"
                  class="form-control"
                  style="background-color: ${Theme.form.textbox}"
                  placeholder="Sobrenome"
                  id="dataN"
                /><label for="surnameRg" style="color: ${Theme.form.colorText}">Sobrenome</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  style="background-color: ${Theme.form.textbox}"
                  placeholder="E-mail"
                  id="emailRg"
                /><label for="emailRg" style="color: ${Theme.form.colorText}">E-mail</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  style="background-color: ${Theme.form.textbox}"
                  placeholder="Confirmar E-mail"
                  id="c-emailRg"
                /><label for="c-emailRg" style="color: ${Theme.form.colorText}">Confirmar E-mail</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="password"
                  minlength="6"
                  class="form-control"
                  style="background-color: ${Theme.form.textbox}"
                  placeholder="Palavra-passe"
                  id="passwordRg"
                /><label for="passwordRg" style="color: ${Theme.form.colorText}">Palavra-passe</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="password"
                  minlength="6"
                  class="form-control"
                  style="background-color: ${Theme.form.textbox}"
                  placeholder="Confiirmar Palavra-passe"
                  id="c-passwordRg"
                /><label for="c-passwordRg" style="color: ${Theme.form.colorText}">Confiirmar Palavra-passe</label>
              </div>
              <button
                class="w-100 mb-2 btn btn-lg rounded-3 bg-primary text-light"
                type="button"
                onclick="_Auth.register()"
              >
                Inscrever</button
              ><button
                class="w-100 mb-2 btn btn-outline-secondary rounded-3"
                type="button"
                onclick="document.getElementById('modal-close-Registar').click();html_Comp.authModal('login')"
              >
                Entrar</button
              ><small class="text-muted"
                >Clicando em Inscrever, aceitas os nossos termos de
                utilização de dados</small
              >
            </form>
          </div>
        </div>
      </div>`
      );
    }

    document.getElementById("auth-modal").click();
  },

  navBar(state, page, adm) {
    //Nav
    _html.elemento(
      "nav",
      ["class"],
      [
        `navbar navbar-expand-md p-0 ${Theme.navBar.text} fixed-top ${Theme.navBar.back}`,
      ],
      "nav" /* div com id #nav */
    );

    //Container Fluid
    _html.elemento(
      "div",
      ["class", "id"],
      [`container-fluid`, "cont-menu"],
      "nav > nav"
    );

    //Logo Name
    _html.elemento(
      "a",
      ["class", "href"],
      ["navbar-brand", "/index.html"],
      "nav > nav > div",
      "Greaclos"
    );

    //Botão Hamburguer
    _html.elemento(
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
    _html.elemento(
      "span",
      ["class"],
      [`navbar-toggler-icon`],
      "nav > nav > div > button"
    );

    //NavbarCollapse - Lista de opções
    _html.elemento(
      "div",
      ["class", "id"],
      ["collapse navbar-collapse", "navbarCollapse"],
      "nav > nav > div"
    );

    //Lista
    _html.navbar_list(
      "navbar-nav me-auto mb-2 mb-md-0",
      [
        "Games",
        `${User.username !== "" ? "Amigos" : ""}`,
        "Sobre nós",
        `${adm ? "ADM" : ""}`,
      ],
      [
        `nav-link ${page === "games" ? "active" : ""}`,
        `${
          User.username !== ""
            ? `nav-link ${page === "amigos" ? "active" : ""}`
            : ""
        }`,
        `nav-link disabled`,
        `${adm ? `nav-link ${page === "adm" ? "active" : ""}` : ""}`,
      ],
      [
        "_aux.Navigate('/html/pages/games.html')",
        "_aux.Navigate('/html/pages/amigos.html')",
        "",
        `${adm ? "_aux.Navigate('/html/pages/adm.html')" : ""}`,
      ],
      "navbarCollapse"
    );

    //Div de Opções do lado direito
    _html.elemento("div", ["class"], ["d-flex "], "navbarCollapse");

    if (state == "on") {
      //
      _html.configBut("navbarCollapse > div");
    } else if (state == "off") {
      //
      _html.navbar_list(
        "navbar-nav me-auto mb-2 mb-md-0",
        ["Login"],
        [`nav-link`, `nav-link`],
        ["html_Comp.authModal('login')"],
        "navbarCollapse > div"
      );
    }
  },

  async bandeja() {
    _html.elemento(
      "div",
      ["class", "id"],
      ["w-100 row m-0 ", "bdj"],
      "conteudo"
    );
    _html.elemento(
      "div",
      ["class", "id"],
      ["col-sm p-4 pt-1", "bdj-in"],
      "bdj"
    );
    _html.elemento(
      "div",
      ["class", "id"],
      ["row d-flex justify-content-center col-md-12", "bdj-conteudo"],
      "bdj-in"
    );

    //pegar na firestore as info dos jogos
    const gamesList = await Store.getCollection("games", "", ["nome", "asc"]);
    // console.log(gamesList);

    gamesList.forEach((game) => {
      //   console.log(game.nome);

      _html.elemento(
        "div",
        ["class", "style"],
        [
          "card col-md-3 m-3 p-0",
          `background-color:${Theme.modal.backColor};color:${Theme.textColor}`,
        ],
        "bdj-conteudo",
        `
        <div class="card-body">
          <h5 class="card-title">${game.nome}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${game.num_participantes} participantes</h6>
          <p class="card-text">${game.descricao}</p>
        </div>
        <div class="card-footer w-100">
          <div class="btn-group w-100" role="group" aria-label="Basic mixed styles example">
            <button type="button" class="btn btn-primary w-75" title="Criar Sala"
              onclick="myRoom.openModalGame(${game.num_participantes},'${game.url}')">Jogar</button>
            <button type="button" class="btn btn-primary" title="Entrar em sala"
             onclick="myRoom.openModalGame(${game.num_participantes},'${game.url}',true)">${Theme.icons.key}</button>
          </div>  
        </div>`
      );
    });
  },
};

//Criar um elemento html
const _html = {
  floattingButton(tipo, text, title, funcao) {
    this.elemento(
      "button",
      ["type", "class", "title", "onclick"],
      ["button", `btn btn-${tipo} floattingButton`, title, `${funcao}`],
      "conteudo",
      text
    );
  },

  async configBut(elemento_Pai) {
    // console.log(User);
    const divPai = document.querySelector(`#${elemento_Pai}`);
    const fillC = `
     ${Theme.icons.chat.fill}
        <span class="position-absolute top-50 start-0 translate-middle p-1 bg-danger rounded-circle">
          <span class="visually-hidden">New chat</span>
        </span>`;
    const emptyC = Theme.icons.chat.empty;

    divPai.innerHTML += `
    <span class="float-left">
      <a id="icon-chat" class="btn-usrname mt-0 mb-0 m-1 position-relative">
        ${emptyC}
      </a>
      <a class="btn-link btn-usrname" title="Meu perfil"
        onclick="_aux.Navigate('/html/pages/perfil.html')" style="color:${Theme.textColor}">@${User.username}</a> 
        &nbsp;&nbsp;
      <a class="btn-link btn-log" onclick="_Auth.logOut()">Terminar Sessão</a>
    </span>`;

    await DataB.new_chat("/users/" + User.uid + "/new_chat", [fillC, emptyC]);
  },

  //Criar um elemento html com valor/Conteudo de texto
  //  nome -      string ""           //Nome do elemento a ser criado
  //  des_Attr -  String Array [""]   //Array com as descrições dos atributos (Ex. id, class, etc)
  //  v_Attrs -   String Array [""]   //Array com os valores dos atributos acima citados
  //      NB: A descrição e o valor devem estar nas mesmas posições em seus respectivos Arrays (Ex. des_Attrs[0] == "id" ! v_Attrs[0] == "myId"  )
  //  e_Pai -     string ""           //id do elemento pai para o elemento (apenas texto, sem #)
  //  txtHtml -   string ""           //texto que será inserido no corrpo do elemento
  //
  //Ex. criarElemento("h2", ["id","class"], ["titulo","conteudo"], "box1", "Como faze...")
  elemento(
    nome_tag,
    atributos_tag,
    valores_dos_atributos,
    elemento_Pai,
    innerText_tag
  ) {
    let PAI = document.querySelector(`#${elemento_Pai}`);
    let n_Attr = atributos_tag.length;
    let elemento = document.createElement(`${nome_tag}`);

    if (atributos_tag != "") {
      for (let e = 0; e < n_Attr; e++) {
        elemento.setAttribute(
          `${atributos_tag[e]}`,
          `${valores_dos_atributos[e]}`
        );
      }
    }

    if (innerText_tag) {
      elemento.innerHTML = innerText_tag;
    }
    // console.log("pai", PAI);
    PAI.appendChild(elemento);
  },

  //Cria a lista de navegação, os nomes identificadores das paginas no menu
  //  classUl -   string    [""]      //Classes para a tag Ul
  //  textLi -    array     [""]      //nomes dos li, os titulos que aparecerão na barra
  //  classA -    array     [""]      //classes para cada tag a correspondente aos nomes acima citados
  //  func -                          //função pro onclick (Enviar com "") Ex. "funcao(parametros)"
  //  e_Pai -     string    ""        //id do elemento pai para o elemento (apenas texto, sem #)
  //Ex. navbar_list("navbar-nav ",["Home", "Histórico"],[`nav-link active`, `nav-link disabled`],[" ", " "],"navbarCollapse")
  navbar_list(
    class_navbar,
    lista_de_menu,
    class_p_iten_da_lista,
    funcao_p_iten_da_lista,
    elemento_Pai
  ) {
    let Pai = document.querySelector(`#${elemento_Pai}`);
    let numLi = lista_de_menu.length;

    let ul = document.createElement("ul");
    ul.setAttribute("class", `${class_navbar}`);

    for (let e = 0; e < numLi; e++) {
      let li = document.createElement(`li`);
      li.setAttribute("class", `nav-item`);

      let a = document.createElement("a");
      a.setAttribute("class", `${class_p_iten_da_lista[e]}`);
      a.setAttribute("style", `cursor: pointer;`);
      a.setAttribute("onclick", funcao_p_iten_da_lista[e]);
      a.innerHTML = `${lista_de_menu[e]}`;

      li.appendChild(a);
      ul.appendChild(li);
    }

    Pai.appendChild(ul);
  },

  //Criar um elemento Form-Floating, imput e label dentro de uma div
  //  id          string ""           //id do imput e que vai pro campo "for" da Label
  //  des_Attr    String Array [""]   //Array com as descrições dos outros atributos (fora o id) (Ex. value, class, etc)
  //  v_Attrs     String Array [""]   //Array com os valores dos atributos acima citados
  //      NB: A descrição e o valor devem estar nas mesmas posições em seus respectivos Arrays (Ex. des_Attrs[0] == "type" ! v_Attrs[0] == "text"  )
  //  e_Pai       string ""           //id do elemento pai para a div (apenas texto, sem #)
  //  mb          number 0-5          //margem bottom
  //
  //Ex. criarElemento("input", ["type","class"], ["text","form-control"], "box1", 4)
  criarElementoFF(id, des_Attrs, v_Attrs, e_Pai, mb) {
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
  },
};

/* My Room */
const myRoom = {
  async modalCreateRoom(game) {
    const Pai = document.querySelector("#modal");
    Pai.innerHTML = "";

    const optionSelect = async () => {
      const amigosUid = await Store.getCollection("users", [
        "uid",
        "==",
        User.uid,
      ]);

      let amigosArray = [];
      amigosUid.forEach((element) => {
        // console.log("N1", element);

        element.amigos.forEach((e) => {
          amigosArray.push(e);
        });
      });
      // console.log(amigosUid);

      const amigosUser = await Store.getCollection("users", [
        "uid",
        "in",
        amigosArray,
      ]);

      let text = "";
      let usernames = [];
      let txtArr = "[";
      let index = 1;

      amigosUser.forEach((element) => {
        text += `<input type="checkbox" value="${
          element.username
        }" class="btn-check w-100 m-1 amigo-selected" id="btn-check-${index}-outlined">
              <label class="btn btn-outline-secondary w-100 m-1 btn-check-${index}-outlined"
               for="btn-check-${index}-outlined">
              ${element.nome + " " + element.sobrenome}</label><br/>`;

        usernames.push(element.username);
        index++;
      });

      for (i in usernames) {
        if (i < usernames.length - 1) txtArr += `'${usernames[i]}',`;
        else if (i == usernames.length - 1) txtArr += `'${usernames[i]}']`;
      }

      // console.log(txtArr);

      return { components: text, users: txtArr };
    };

    const OPSEL = await optionSelect();
    // console.log(OPSEL);

    _html.elemento(
      "button",
      ["id", "type", "class", "data-bs-toggle", "data-bs-target"],
      [
        "btn-create-room",
        "button",
        "btn btn-primary visually-hidden",
        "modal",
        "#modal-create-room",
      ],
      "modal"
    );

    let modal = document.createElement("div");
    modal.setAttribute("class", "modal fade");
    modal.setAttribute("id", "modal-create-room");
    modal.setAttribute("data-bs-keyboard", "false");
    modal.setAttribute("tabindex", "-1");
    modal.setAttribute("aria-labelledby", "title-create-room");
    modal.setAttribute("aria-hidden", "true");

    let modal_dialog = document.createElement("div");
    modal_dialog.setAttribute(
      "class",
      "modal-dialog modal-dialog-centered modal-sm"
    );

    modal_dialog.innerHTML = ` 
      <div class="modal-content" style="background-color:${
        Theme.modal.backColor
      }; color:${Theme.modal.text}">
        <div class="modal-body">
          <h4 class="h4 text-center" id="title-create-room">Criar Sala ${
            game.name
          }</h4>
          <p class="text-center">Limite de participantes: +${game.numL - 1}</p>
          <form>
              <label for="escolher-amigo" class="form-label">
                Escolha um nome unico para a Sala (sem acentuação)
              </label><br />
                <input type="text" id="room_name" class="form-control w-100 m-1" placeholder="Escreva o nome" />
              
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
              class="btn btn-primary w-100"
              onclick="myRoom.createRoom(
                ${game.numL - 1},
                '${game.url}')"
            >
              Criar
            </button>
          </form>
        </div>
      </div>`;

    modal.appendChild(modal_dialog);
    Pai.appendChild(modal);

    setTimeout(() => {
      document.getElementById("btn-create-room").click();
    }, 500);
  },

  modalKeyRoom(game) {
    const Pai = document.querySelector("#modal");
    Pai.innerHTML = "";

    let button = document.createElement("button");
    button.setAttribute("id", "btn-key-room");
    button.setAttribute("type", "button");
    button.setAttribute("class", "btn btn-primary visually-hidden");
    button.setAttribute("data-bs-toggle", "modal");
    button.setAttribute("data-bs-target", "#modal-key-room");

    let modal = document.createElement("div");
    modal.setAttribute("class", "modal fade");
    modal.setAttribute("id", "modal-key-room");
    modal.setAttribute("data-bs-keyboard", "false");
    modal.setAttribute("tabindex", "-1");
    modal.setAttribute("aria-labelledby", "title-key-room");
    modal.setAttribute("aria-hidden", "true");

    let modal_dialog = document.createElement("div");
    modal_dialog.setAttribute(
      "class",
      "modal-dialog modal-dialog-centered modal-sm"
    );

    modal_dialog.innerHTML = ` 
      <div class="modal-content" style="background-color:${Theme.modal.backColor}; color:${Theme.modal.text}">
        <div class="modal-body">
          <h4 class="h4 text-center" id="title-key-room">Entrar na Sala ${game.name}</h4>
          <p class="text-center">Introduza aqui a <span title="Esta chave é fornecida pelo criador da sala">chave</span></p>
          <form>
            <div class="d-flex justify-content-center input-group">
              <input type="text" id="chave" class="form-control" placeholder="Cole aqui a chave"/>
              <button class="btn btn-primary pt-1 pb-1 p-3" title="Entrar"
                onclick="event.preventDefault(); myRoom.abrirSala({url:'${game.url}',name:'${game.name}'})">
              ${Theme.icons.key}
              </button>
            </div>
          <form>
        </div>
      </div>`;

    modal.append(modal_dialog);
    Pai.append(button);
    Pai.append(modal);

    setTimeout(() => {
      button.click();
    }, 100);
  },

  async createRoom(numL, url) {
    const roomN = document.querySelector("#room_name").value;
    const amigos = document.querySelectorAll(".amigo-selected");
    let selecionados = 0;
    let amigosSelecionados = [];
    let urldata = "";

    //Valida se nome da sala foi digitado
    if (roomN == "") {
      _aux.alertar("Dê um nome à sala", "danger");
      return;
    }

    // Valida se numero certo de amigos foi selecionado
    amigos.forEach((amigo) => {
      if (amigo.checked) {
        selecionados++;
        amigosSelecionados.push(amigo.value);
      }
    });

    if (selecionados !== numL) {
      _aux.alertar("Selecione o numero certo de jogadores", "warning");
      // console.log("Selecione o numero certo de jogadores");
      return;
    }

    // Valida se nome da sala já existe
    let sala_exist = await Store.getCollection("rooms", ["name", "==", roomN]);
    // console.log(sala_exist)

    if (sala_exist != "") {
      _aux.alertar("Já existe uma sala com este nome", "danger");
      return;
    }

    let num = amigosSelecionados.length + 1;

    RoomsFB.name = roomN;
    RoomsFB.game = _aux.sliceTxt(url, "games/", ".html?");
    RoomsFB.data_criacao = today.date();
    RoomsFB.players = amigosSelecionados;
    RoomsFB.players.push(User.username);
    RoomsFB.num_ply = num;

    console.log(RoomsFB);

    await Store.addDoc("rooms", RoomsFB);

    urldata = `room=${roomN}`;

    _aux.Navigate(url + urldata);
    // Criar sala no RealTime (DataB)
  },

  async abrirSala(game) /*url,name*/ {
    let chave_set = document.getElementById("chave").value;

    let game_name = game.name;
    let room = chave_set;

    let chave = await DataB.get_once(game_name, `${room}`);

    // Validação de chave
    if (chave == undefined || chave == null || chave == "") {
      // console.log("Chave não existe");
      _aux.alertar("Chave errada!", "danger");
      return;
    }

    // console.log(game_name, "room=", room, "chave=", chave ?? true);

    // Verificar se user pertence a sala
    let isIn = false;
    let room_db = await Store.getDocWhere("rooms", ["name", "==", room]);
    room_db.players.forEach((player) => {
      player == User.username ? (isIn = true) : "";
    });

    if (isIn) {
      setTimeout(() => {
        _aux.Navigate(game.url + "room=" + chave_set);
      }, 800);
      _aux.alertar("Chave aceita!", "success");
    } else {
      _aux.alertar("Você não faz parte desta sala!", "danger");
    }
  },

  openModalGame(nLim, url, key) {
    if (key) {
      this.modalKeyRoom({
        url: url,
        name: _aux.sliceTxt(url, "games/", ".html?"),
      });
    } else {
      this.modalCreateRoom({
        name: _aux.sliceTxt(url, "games/", ".html?"),
        numL: nLim,
        url: url,
      });
    }
  },
};

const _Auth = {
  //Valida a autenticação
  //Recebendo os codigos de erro, traduzindo para portugues
  //E criando alertas
  //    code    string    //codigo de erro
  //    who     string    //se refere a pra quem será o alerta, o nome depois de "alert-"
  validaAuth(code) {
    switch (code) {
      case "auth/wrong-password":
        _aux.alertar("Palavra-passe errada!", "danger");
        console.log("Palavra-passe errada!");
        break;
      case "auth/invalid-email":
        _aux.alertar("Endereço de e-mail não válido!", "danger");
        console.log("Endereço de e-mail não válido!");
        break;
      case "auth/user-disabled":
        _aux.alertar("Este utilizador foi desabilitado.", "danger");
        console.log("Este utilizador foi desabilitado.");
        break;
      case "auth/user-not-found":
        _aux.alertar("Utilizador não encontrado.", "danger");
        console.log("Utilizador não encontrado.");
        break;
      case "auth/too-many-requests":
        _aux.alertar(
          "Devida a atividades suspeitas, deverá tentar de novo em alguns minutos",
          "danger"
        );
        console.log(
          "Devida a atividades suspeitas, deverá tentar de novo em alguns minutos."
        );
        break;
      case "auth/email-already-in-use":
        _aux.alertar("Já existe uma conta neste email.", "warning");
        console.log("Já existe uma conta neste email.");
        break;
      case "auth/weak-password":
        _aux.alertar(
          "Sua palavra passe é muito fraca, tente outra por favor.",
          "warning"
        );
        console.log("Sua palavra passe é muito fraca, tente outra por favor.");
        break;
      case "auth/operation-not-allowed":
        _aux.alertar("A conta neste email foi desativada.", "warning");
        console.log("A conta neste email foi desativada.");
        break;
      default:
        break;
    }
  },

  //Login
  loginAnom() {
    firebase
      .auth()
      .signInAnonymously()
      .then(() => {
        // Signed in..
        _aux.Reload();
      })
      .catch((error) => {
        this.validaAuth(error.code);
        // _ _ _ // ... // --- // ''' //
      });
  },

  //Isso é auto-explicativo, mas tem comentários dentro
  login() {
    //Pegar valores do formulario
    const email = document.getElementById("emailLg").value;
    const password = document.getElementById("passwordLg").value;

    // console.log(email, password);
    //validar se nenhum dos campos está nulo
    if (email && password) {
      //Faz a requisição de login, passando o email e password como parametros
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
          //Caso a requisição seja bem sucedida
          _aux.alertar("Login efetuado com sucesso!", "success");
          _aux.Reload();
        })
        .catch((error) => {
          //Caso a requisição dê erro

          //Chamada da função validaAuth
          this.validaAuth(error.code);
        });
    } else {
      //se email nulo mostra o alerta
      email ? "" : _aux.alertar("O campo email é obrigatório", "warning");
      //se password nula mostra o alerta
      password
        ? ""
        : _aux.alertar("O campo palavra passe é obrigatório", "warning");
    }
  },

  //Registo
  //Isso também é auto-eexplicativo, e ainda não tem comeentários dentro, porque ainda não acabei
  register() {
    const username = document.getElementById("usernameRg").value;
    const name = document.getElementById("nameRg").value;
    const surname = document.getElementById("surnameRg").value;
    const email = document.getElementById("emailRg").value;
    const email_conf = document.getElementById("c-emailRg").value;
    const password = document.getElementById("passwordRg").value;
    const password_conf = document.getElementById("c-passwordRg").value;
    const data = [
      document.getElementById("dataN").value.slice(8, 10), //dia
      document.getElementById("dataN").value.slice(5, 7), //mes
      document.getElementById("dataN").value.slice(0, 4), //ano
    ];

    if (!username || !name || !surname || !email || !password || !data) {
      _aux.alertar("Preencha todos o campos", "warning");
      return;
    }

    console.log(
      username,
      name,
      surname,
      email,
      email_conf,
      password,
      password_conf,
      data
    );

    // return
    if (email != email_conf || password != password_conf) {
      email != email_conf
        ? _aux.alertar("A confirmaação do email não confere", "danger")
        : "";
      password != password_conf
        ? _aux.alertar("A confirmaação da password não confere", "danger")
        : "";
    } else {
      // showLoading();

      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((new_) => {
          // hideLoading();
          User.username = username;
          User.nome = name;
          User.sobrenome = surname;
          User.dataNascimento = data;
          User.uid = new_.user.uid;

          firebase
            .firestore()
            .collection("users")
            .add(User)
            .then(() => {
              _aux.alertar("conta criada com sucesso", "success");

              setTimeout(() => {
                _aux.Reload();
              }, 2000);
            });
        })
        .catch((error) => {
          // hideLoading();
          this.validaAuth(error.code);
        });
    }
  },

  //Recuperar password
  //Oh MAIGODE, pra quê que será isso? (Obviamente estou sendo irónico)
  recoverPassword() {
    const email = document.getElementById("emailLg").value;

    if (email) {
      // showLoading();

      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          // hideLoading();

          _aux.alertar(
            "Foi enviado para o seu email o link para recuperação. Por favor verifique o Spam",
            "success"
          );
        })
        .catch((error) => {
          // hideLoading();

          this.validaAuth(error.code);
        });
    } else {
      _aux.alertar("O campo email é obrigatório", "danger");
    }
  },

  //Desisto
  //Essa função aqui faz biscoito
  logOut() {
    if (firebase.auth().currentUser) {
      firebase
        .auth()
        .signOut()
        .then(async () => {
          _aux.alertar("Até a proxima :)", "info");
          setTimeout(() => {
            _aux.Reload();
          }, 2000);
        });
    }
  },
};

const _FIRE = {
  //FireBase Initialization
  initFirebase() {
    const firebaseConfig = {
      apiKey: "AIzaSyAU5eHGUbovgs0xA_qtRgk5rNqjhyi6Fkk",
      authDomain: "greaclos-world.firebaseapp.com",
      projectId: "greaclos-world",
      storageBucket: "greaclos-world.appspot.com",
      messagingSenderId: "803467540486",
      appId: "1:803467540486:web:77b4a9140f436b9e91ab87",
      measurementId: "G-GT0JD0E0WV",
      databaseURL:
        "https://greaclos-world-default-rtdb.europe-west1.firebasedatabase.app/",
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    // const analytics = getAnalytics(app);
  },

  authLogin() {
    // console.log("Login in");
    addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        // console.log("clicou");
        document.getElementById("entrar").click();
      }
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigate("index.html");
      }
    });
  },
};

const Store = {
  //where ["uid","==","dkcnnnue77rhf7rh7"]
  async getCollection(collection, where, order) {
    const db = firebase.firestore();
    let dados = "";

    const dbRe = where
      ? db.collection(collection).where(where[0], where[1], where[2])
      : db.collection(collection);

    const dbRef = order ? dbRe.orderBy(order[0], order[1]) : dbRe;

    const data = await dbRef.get().then((userData) => {
      dados = userData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // console.log("dados", dados);
      // const dados = userData.docs.map((doc) => doc.data());
      let array = [];

      dados.forEach((dt) => {
        array.push(dt);
      });

      // console.log("array", array);

      return array;
    });

    return data;
  },

  async setUserOnline(userUid) {
    // console.log(userUid);
    await firebase
      .firestore()
      .collection("users")
      .where("uid", "==", userUid)
      .get()
      .then(async (userData) => {
        const dados = userData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        // console.log("dados", dados);
        dados.forEach((element) => {
          User.nome = element.nome;
          User.sobrenome = element.sobrenome;
          User.username = element.username;
          User.uid = element.uid;
          User.adm = element.adm;
          User.amigos = element.amigos;
          User.dataNascimento = element.dataNascimento;
          User.theme = element.theme;
          User.id = element.id;
        });
      });
  },

  async setRoomAct(rid) {
    // console.log(userUid);
    const dados = await this.getDoc(`rooms`, rid, true);

    RoomsFB.game = dados.game;
    RoomsFB.name = dados.name;
    RoomsFB.players = dados.players;
    RoomsFB.state_game = dados.state_gameme;
    RoomsFB.id = dados.id;
  },

  async getDoc(collection, doc, withId) {
    const db = firebase.firestore();

    const dbRef = db.collection(collection).doc(doc);

    const DOC = await dbRef.get().then((docc) => {
      if (withId) {
        let fich = {
          ...docc.data(),
          id: docc.id,
        };
        return fich;
      }
      // console.log(docc.data());
      return docc.data();
    });

    return DOC;
  },

  async getDocWhere(collection, where, who) {
    const db = firebase.firestore();
    let dados = "";

    const dbRef = where
      ? db.collection(collection).where(where[0], where[1], where[2])
      : db.collection(collection);

    const data = await dbRef.get().then((userData) => {
      dados = userData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      return dados[0];
    });

    // console.log(data)
    if (who) {
      switch (who) {
        case "id":
          return data.id;
          break;
        case "name":
          return data.name;
          break;

        default:
          break;
      }
    }
    return data;
  },

  async updateDoc(collection, doc, data) {
    const db = firebase.firestore();

    const dbRef = db.collection(collection).doc(doc);

    const updated = await dbRef.update(data).then(() => {
      return true;
    });

    return updated;
  },

  async addDoc(collection, data) {
    const db = firebase.firestore();

    const dbRef = db.collection(collection);

    await dbRef.add(data).then(() => {
      console.log(data);
      return true;
    });
  },

  async deleteDoc(collection, doc) {
    const db = firebase.firestore();

    const dbRef = db.collection(collection).doc(doc);

    const isDel = await dbRef.delete().then(() => {
      return true;
    });

    return isDel;
  },
};

const DataB = {
  // `/users/${User.uid}`,{new_chat:false})
  async set(ref, data) {
    const db = firebase.database();

    const dbRef = db.ref(ref);

    let done = await dbRef.set(data).then(() => {
      return true;
    });
    // console.log(done);
    return done;
  },

  last_page() {
    return this.get_once("users/" + User.username + "/last_page");
  },

  async get_once(main, ref) {
    //ex ref ["users",User.uid,"new_chat"]
    const db = firebase.database();

    console.log(User.username);
    const dbRe = db.ref(main);

    const dbRef = ref ? dbRe.child(ref) : dbRe;

    let done = await dbRef
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          // console.log(snapshot.val());
          return snapshot.val();
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return done;
  },

  async new_chat(ref, fun) {
    const db = firebase.database();

    const dbRef = db.ref(ref);

    const DOC = await dbRef.on("value", (snapshot) => {
      const data = snapshot.val();
      data
        ? (document.getElementById("icon-chat").innerHTML = fun[0])
        : (document.getElementById("icon-chat").innerHTML = fun[1]);
      // console.log(data);
      // return data;
    });

    return DOC;
  },

  async addPlayer(game, ref, data) {
    const db = firebase.database();

    const dbRe = db.ref(game);

    const dbRef = ref ? dbRe.child(ref) : dbRe;

    let done = await dbRef.set(data).then(() => {
      return true;
    });
    // console.log(done);
    return done;
  },

  async update(ref, data) {
    const db = firebase.database();

    const dbRef = db.ref(ref);

    let done = await dbRef.update(data).then(() => {
      return true;
    });
    console.log(done);
    return done;
  },

  async sair_da_sala(game, room) {
    const db = firebase.database();

    const dbRef = db.ref(`${game}/${room}/players`);

    let playrs = [];
    let newList = [];
    playrs = await this.get_once(dbRef);

    playrs.forEach((ply) => {
      if (ply != User.username) newList.push(ply);
    });

    if (newList == []) {
      let done = await dbRef.set([0]).then(() => {
        return true;
      });
      return done;
    }

    let done = await dbRef.set(newList).then(() => {
      return true;
    });
    // console.log(playrs[1] === User.username);
    return done;
  },

  async delete(collection, doc) {},
};

const Storage = {
  st: "",
  stRef: "",

  ini() {
    const storage = firebase.storage();
    this.st = storage;
    this.stRef = this.st.ref();
  },

  console() {
    console.log(this.st);
  },

  //   stRef.child('banner/ping-pong.webm').getMetadata().then((meta)=>{console.log(meta)})
};

const _aux = {
  Reload() {
    window.location.reload(false);
  },

  sliceTxt(textToSlice, indexStart, indexEnd) {
    let idx = textToSlice.indexOf(indexStart) + indexStart.length;
    let texto = textToSlice;

    if (indexEnd) {
      let idx2 = textToSlice.indexOf(indexEnd);
      return texto.slice(idx, idx2);
    }

    return texto.slice(idx);
  },

  Copiar(targetType, elementToCopy) {
    if (targetType === "chave") {
      let el = _aux.sliceTxt(elementToCopy, "room=");
      console.log(el);

      navigator.clipboard.writeText(el).then(() => {
        _aux.alertar("Copiado!", "success");
      });
    } else {
      navigator.clipboard.writeText(elementToCopy).then(() => {
        _aux.alertar("Copiado!", "success");
      });
    }
  },

  async Navigate(url) {
    let last = "";
    let urlx = "";

    if (!window.location.href.includes("/html")) {
      urlx = "/index.html";
    } else {
      urlx = _aux.sliceTxt(window.location.href, "/html");
    }
    last = await DataB.set("users/" + User.username + "/last_page", urlx);

    if (!last) {
      return;
    }

    setTimeout(() => {
      window.location.href = url;
      // console.log("Mudado");
    }, 200);
  },

  async N_Voltar() {
    const last = await DataB.get_once([`users/${User.username}/last_page`]);
    console.log(last);
    this.Navigate(last);
  },

  changeVisibility(id_elemento) {
    const ids = ["session_jogos", "session_users"];
    const ids_Btn = ["adm_mn_jogos", "adm_mn_users"];

    ids.forEach((id, index) => {
      if (id != id_elemento) {
        document.querySelector(`#${id}`).classList.add("visually-hidden");
        document
          .querySelector(`#${ids_Btn[index]}`)
          .classList.remove("disabled");
      } else {
        document.querySelector(`#${id}`).classList.remove("visually-hidden");
        document.querySelector(`#${ids_Btn[index]}`).classList.add("disabled");
      }
    });
  },

  conlog(value, ref) {
    console.log(value, ref);
  },

  toCaptalize(string) {
    let newString = "";
    let stUpper = string.toLocaleUpperCase();

    for (var i = 0; i < string.length; i++) {
      i == 0 ? (newString += stUpper[i]) : (newString += string[i]);
    }
    // console.log(newString);
    return newString;
  },

  setPageTheme(mode) {
    // set theme page
    if (mode == "dark") theme.setDarkTheme();

    if (mode == "light") theme.setLightTheme();
  },

  async checkChangeState(isAdm) {
    // definição de variaveis
    const game_pages = ["tictactoe", "paocom", "ovo"];
    let isGamePage = false;
    let idxIni, idxFin, page;
    let l_page = "";

    for (i = Url.path.length; i >= 0; i--) {
      if (Url.path[i] == ".") {
        idxFin = i;
      }
      if (idxFin && Url.path[i] == "/") {
        idxIni = i + 1;
        break;
      }
      // console.log(idxFin);
    }

    page = _aux.sliceTxt(Url.path, idxIni, idxFin);

    /* Page configs */
    User.theme == "dark" ? theme.setDarkTheme() : theme.setLightTheme();

    const body = document.querySelector("body");

    body.classList.add(`${Theme.backColor}`);
    body.setAttribute("style", `color:${Theme.textColor}`);

    //set page name
    document.querySelector("title").innerHTML =
      page == "index" ? "Greaclos" : "Greaclos | " + this.toCaptalize(page);

    function checkSize() {
      setInterval(() => {
        document.querySelector("#cont-menu").classList.contains("w-100")
          ? document.querySelector("#cont-menu").classList.remove("w-100")
          : "";

        document.querySelector("#cont-menu").classList.contains("w-75")
          ? document.querySelector("#cont-menu").classList.remove("w-75")
          : "";

        if (page == "adm") {
          document.querySelector("#session_jogos").classList.contains("w-75")
            ? document.querySelector("#session_jogos").classList.remove("w-75")
            : "";

          document.querySelector("#session_jogos").classList.contains("w-100")
            ? document.querySelector("#session_jogos").classList.remove("w-100")
            : "";
        }

        if (window.screen.width < 795) {
          document.querySelector("#cont-menu").classList.add("w-100");
          page == "adm"
            ? document.querySelector("#session_jogos").classList.add("w-100")
            : "";
        } else {
          document.querySelector("#cont-menu").classList.add("w-75");
          page == "adm"
            ? document.querySelector("#session_jogos").classList.add("w-75")
            : "";
        }
      }, 500);
    }
    /* Page configs */

    await firebase.auth().onAuthStateChanged(async (user) => {
      function checkGamePage() {
        game_pages.forEach((page) => {
          if (Url.path.includes(`games/${page}.html`)) isGamePage = true;
        });
      }
      function callNavBar(mode, adm) {
        html_Comp.navBar(mode, page, adm);
        if (window.screen.width < 795) {
          document.querySelector("#cont-menu").classList.add("w-100");
        } else {
          document.querySelector("#cont-menu").classList.add("w-75");
        }
        checkSize();
      }
      if (user) {
        const use = await Store.getCollection("users", ["uid", "==", user.uid]);

        if (use == "") {
          //user anonimo
          User.uid = user.uid;
          User.username = "Anónimo";
        } else {
          //User cadastrado
          //preenche a const User
          await Store.setUserOnline(user.uid);
          User.theme == "dark" ? theme.setDarkTheme() : theme.setLightTheme();
        }

        checkGamePage();
        if (isGamePage) {
        } else {
          User.adm ? callNavBar("on", true) : callNavBar("on");
        }
        //   console.log(firebase.auth().currentUser.uid);
      } else {
        checkGamePage();
        if (isGamePage) {
        } else {
          callNavBar("off");
        }
      }

      User.theme == "dark" ? theme.setDarkTheme() : theme.setLightTheme();

      body.classList.add(`${Theme.backColor}`);
      body.setAttribute("style", `color:${Theme.textColor}`);

      if (page == "index") {
        const conteudo = document.querySelector("#inner-conteudo");
        conteudo.classList.add(`${Theme.backColor}`);
        conteudo.setAttribute("style", `color:${Theme.textColor}`);
      }
    });

    // check last Page
    setTimeout(async () => {
      l_page = await DataB.last_page();
      // console.log(l_page);
      if (l_page.includes("games/")) {
        let rn_game = _aux.sliceTxt(l_page, "room=");

        game_pages.forEach(async (game) => {
          if (l_page.includes(game)) {
            if (await DataB.sair_da_sala(game, rn_game))
              _aux.alertar("Saiu do Jogo", "info");
          }
        });
      }
    }, 3000);
  },

  //Cria os alestas dentro de divs
  //    devem haver divs no codigo com id "alert-..." exclusivamente para serem usadas pelos alertas
  //  idTarget    string      //se reefere ao id da div alert
  //  meessage    string      //mensagem que aparecerá no alerta
  //  type        string      //tipo de alerta
  //                            success - para alertas de sucesso
  //                            warning - para alertas de aviso
  //                            danger - para alertas de erro
  alertar(message, type) {
    let Pai = document.querySelector(`#alert`);

    // console.log(Pai);
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
  },

  // Loading
  //Cria a tela de Loadeing e a mostra
  showLoading() {
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
  },

  //Remove a tela de loading - chamada logo depois da primeira (show)
  hideLoading() {
    const loadings = document.getElementsByClassName("LOAD");
    if (loadings.length) {
      loadings[0].remove();
    }
  },
};

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function auth_page_check() {
  const pages_on_Logged = ["adm", "amigos", "perfil", "games"];

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // _aux.Navigate("/index.html");
    } else {
      pages_on_Logged.forEach((page) => {
        if (Url.path.includes(`pages/${page}.html`))
          _aux.Navigate("/index.html");
      });
    }
  });
}

const listnerEvent = {
  // Login
  login() {
    document.getElementById("btn-login").addEventListener("click", (event) => {
      event.preventDefault();

      _Auth.login();
    });
  },
};

// ^////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ^////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ^////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ^////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ^////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ^////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ^////////////////////////////////////////////////////////////////////////////////////////////////////////////
const game_dataB = {};

(() => {
  let game_id = false;

  function new_room(game, room_name, ply_max) {
    //Modelo de chamada
    // game_dataB.room("tictactoe","Casaa",["matt98","lui345"],2)
    //Cria uma nova sala com o noeme especifico recebido por parametro
    //nome tem que ser unico
    const room_data = {
      players: [User.username],
      max_ply: ply_max,
      createdat: firebase.database.ServerValue.TIMESTAMP,
    };

    if (!game_id) {
      game_id = room_name;
    }

    let updates = {};
    updates[`/${game}/` + game_id] = room_data;

    let room_ref = firebase.database().ref();

    room_ref
      .update(updates)
      .then(() => {
        return { success: true, message: "Room created" };
      })
      .catch((error) => {
        return { success: false, message: "Creation failed: ", error };
      });

    return game_id;
  }

  function start_game(game, room_name, board, gameover) {
    //Começa o jogo com a configuração da board recebida por parametro

    game_id = room_name;
    let game_ref = firebase.database().ref(`${game}/` + game_id);

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

  game_dataB.room = new_room;
  game_dataB.start = start_game;
  game_dataB.remove = remove_game;
  game_dataB.update = update_game;
  game_dataB.reset = reset_game;
  game_dataB.listen = listen_game;
})();
