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

  //validar se nenhum dos campos está nulo
  if (email && password) {
    //Fecha a modal
    control_Modal("Entrar", "close");
    //Abre o loading
    showLoading();

    // console.log(email, password);

    //Faz a requisição de login, passando o email e password como parametros
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        //Caso a requisição seja bem sucedida
        //Esconde o loadiing
        hideLoading();
        window.location.reload(false);

        setTimeout(() => {
          control_Modal("Entrar", "close");
          document.getElementById("passwordLg").value = "";
          document.getElementById("emailLg").value = "";
          console.log(response);
        }, [2000]);
      })
      .catch((error) => {
        //Caso a requisição dê erro
        //Esconde o loadiing
        hideLoading();
        //Reabre a Modall
        control_Modal("Entrar", "open");

        //Resetacampo do formulario
        document.getElementById("passwordLg").value = "";

        console.log(error.code);
        //Chamada da função validaAuth
        validaAuth(error.code, "Entrar");
      });
  } else {
    //se email nulo mostra o allerta
    email
      ? ""
      : alertar(`alert-Entrar`, "O campo email é obrigatório", "warning");
    //se password nula mostra o allerta
    password
      ? ""
      : alertar(
          `alert-Entrar`,
          "O campo palavra passe é obrigatório",
          "warning"
        );
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
      .then(() => {
        window.location.reload(false);
      });
  }
}
