//Para sabem mais sobre as funções, (ctrl + click no nome da função)
const dt = new Date();
const todayDate =
  dt.getFullYear() +
  "-" +
  (dt.getUTCMonth() + 1 < 10
    ? "0" + (dt.getUTCMonth() + 1)
    : "-" + dt.getUTCMonth() + 1) +
  (dt.getDate() < 10 ? "-0" + dt.getDate() : "-" + dt.getDate());

let path = window.location.href;

//constantes
const alarme = {
  im_ticket: "",
  ci: "",
  data: "",
  horario: "",
  title: "",
  user: "",
};

const User = {
  uid: "",
  username: "",
  nome: "",
};

// - - - - - - - - - - - - - - - - - - - - - - - - - -  - - - - - - - - - - - -

function startData() {
  showAlarmes();
}

function startTTT() {
  let divs = document.querySelectorAll(".ps");
  divs.forEach((element) => {
    // console.log(element)
    element.addEventListener("mouseover", (e) => {
      e.target.innerHTML =
        tic_tac_toe.symbols.options[tic_tac_toe.symbols.turn_index];
      // console.log(e.target);
    });

    element.addEventListener("mouseout", (e) => {
      e.target.innerHTML = "";
      // console.log(e.target);
    });
  });

  online_list.gett()


  let tela = document.querySelector(".game");

  // tela.innerHTML=``

  let button = document.querySelector("#action-game");
  button.classList.add("btnn");
  button.setAttribute("onclick", `startGame()`);
  button.setAttribute("title", `Start this game`);
  button.innerHTML = "Start";

  tic_tac_toe.init(document.querySelector(".game"));
  tic_tac_toe.start();
}

function startGame() {
  let button = document.querySelector("#action-game");
  button.classList.add("btn");
  button.setAttribute("onclick", `tic_tac_toe.restart()`);
  button.setAttribute("title", `Restart this game`);
  button.innerHTML = "Restart";

  tic_tac_toe.draw(tic_tac_toe.board);

  const urlParams = new URLSearchParams(window.location.search);

  const player1 = urlParams.get("ply_0");
  const player2 = urlParams.get("ply_1");

  game_database.new(player1, player2, tic_tac_toe.board);
  game_database.listen();
}

function playOnLine() {
  game_database.listen();
  game_database.update(player1, player2, tic_tac_toe.board);
}

//-------------------------------------------------------------------------------------

/* document.addEventListener(visibilityChange, (e) => {
  setTimeout(async () => {
    // console.log(visibilityChange);
    await firebase
      .firestore()
      .collection("users")
      .where("uid", "==", firebase.auth().currentUser.uid)
      .get()
      .then(async (userData) => {
        const dados = await userData.docs.map((doc) => doc.data());
        dados.forEach((element) => {
          element.onLine = false;
        });
      });
  }, 10000);
}); */

document.addEventListener("DOMContentLoaded", async () => {
  // console.log("inicio");
  initFirebase();

  if (path.includes("games/realtime.html")) return false;

  await firebase.auth().onAuthStateChanged(async (user) => {
    if (
      !user &&
      !path.includes("login.html" || !path.includes("register.html"))
    ) {
      if (path.includes("register.html")) {
      } else navigate("/login.html");
      //   console.log(window.location.href);
    } else {
      if (path.includes("login.html")) authLogin();

      // console.log(user.uid);
      console.log(firebase.auth().currentUser.uid);

      await firebase
        .firestore()
        .collection("users")
        .where("uid", "==", user.uid)
        .get()
        .then(async (userData) => {
          const dados = await userData.docs.map((doc) => doc.data());
          console.log(dados);
          dados.forEach((element) => {
            User.nome = element.nome + " " + element.sobrenome;
            User.username = element.username;
            User.uid = element.uid;
          });

          if (path.includes("index.html") || path.includes("denied.html")) {
            // console.log(User);

            navBar("on");
          }

          if (path.includes("/tictactoe.html?npl")) hevaAccess();

          if (path.includes("games/tictactoe.html")) startTTT();

          if (path.includes("Pages/colaboradores.html")) startColab();
          if (path.includes("Pages/history.html")) startHistory();
          if (path.includes("Pages/contas.html")) startContas();
          if (path.includes("Pages/config.html")) startConfig();
          if (path.includes("Pages/clients.html")) startClients();
        });
    }
  });
});

function hevaAccess() {
  const urlParams = new URLSearchParams(window.location.search);
  const num_ply = urlParams.get("npl");
  let have_Access = false;

  for (let idx = 0; idx < num_ply; idx++) {
    if (User.username == urlParams.get("ply_" + idx)) {
      have_Access = true;
    }
  }

  if (!have_Access) navigate("/denied.html");
}

function authLogin() {
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
}

//FireBase Initialization
function initFirebase() {
  console.log("init firebase");
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
}
