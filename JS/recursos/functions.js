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

  userID.innerHTML = "@username";

  let aBtn = document.createElement("a");
  aBtn.setAttribute("class", "nav-link dropdown-toggle mt-0 mb-0 m-2");
  aBtn.setAttribute("id", "perfilDropM");
  aBtn.setAttribute("role", "button");
  aBtn.setAttribute("data-bs-toggle", "dropdown");
  aBtn.setAttribute("aria-expanded", "false");
  aBtn.appendChild(userID);

  console.log(aBtn);

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

//Controla a visualização das Modals
//  modal   string  "" - se refera a que Modal vai mudar
//    valores possiveis: "Entrar"/"Registar"
//  comand  string  "" - se refera ao tipo de ação a executar
//    valores: "open","close","troca"
//Ex. controol_Modal("Entrar","open") -  abre a modal de Login (Entrar)
function control_Modal(modal, comand) {
  switch (comand) {
    case "open":
      document.getElementById(`button-modal-${modal}`).click();
      break;
    case "close":
      document.getElementById(`modal-close-${modal}`).click();
      break;
    case "troca":
      if (modal == "Entrar") {
        control_Modal("Entrar", "close");
        control_Modal("Registar", "open");
      } else if (modal == "Registar") {
        control_Modal("Registar", "close");
        control_Modal("Entrar", "open");
      }
      break;
    default:
      break;
  }
}
//----------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------

//Components

//Cria as Modals de autenticação (Login e Registo)
//  mode - se refere ao tipo de Modal ("Entrar"/"Registar")
function modalAuth(mode) {
  //Botão de ativação
  criarElemento(
    "button",
    ["id", "type", "class", "data-bs-toggle", "data-bs-target"],
    [
      `button-modal-${mode}`,
      "button",
      "btn btn-primary visually-hidden",
      "modal",
      `#modal-${mode}`,
    ],
    "modal"
  );

  //Modal
  criarElemento(
    "div",
    ["id", "class", "tabindex", "aria-labelledby", "aria-hidden", "role"],
    [
      `modal-${mode}`,
      "modal fade py-5",
      "-1",
      `modal${mode}-Label`,
      "false",
      "dialog",
    ],
    "modal"
  );

  //Modal Dialog
  criarElemento(
    "div",
    ["id", "class", "role"],
    [`modal${mode}-dialog`, "modal-dialog", "document"],
    `modal-${mode}`
  );

  //Modal Content
  criarElemento(
    "div",
    ["id", "class", "style"],
    [
      `modal${mode}-content`,
      "modal-content rounded-4 shadow",
      `background-color: ${_tema.backColor}; color:${_tema.textColor};`,
    ],
    `modal${mode}-dialog`
  );

  //Modal Header
  criarElemento(
    "div",
    ["id", "class"],
    [`modal${mode}-content-header`, "modal-header p-5 pb-4 border-bottom-0"],
    `modal${mode}-content`
  );

  //Modal Title
  criarElementoWText(
    "h1",
    ["class"],
    ["fw-bold mb-0 fs-2"],
    `modal${mode}-content-header`,
    "Se inscreva de Graça"
  );

  //Button Close
  criarElemento(
    "button",
    ["type", "class", "data-bs-dismiss", "aria-label", "id"],
    ["button", "btn-close", "modal", "Close", `modal-close-${mode}`],
    `modal${mode}-content-header`
  );

  //Modal Body
  criarElemento(
    "div",
    ["id", "class"],
    [`modal${mode}-body`, "modal-body p-5 pt-0"],
    `modal${mode}-content`
  );

  //Form
  criarElemento(
    "form",
    ["id", "class"],
    [`form-${mode}`, ""],
    `modal${mode}-body`
  );

  //Exclusivo de Registo
  if (mode == "Registar") {
    //Alert
    criarElemento(
      "div",
      ["id", "class"],
      ["alert-Registar", "w-100"],
      `form-${mode}`
    );
    // Caixa de texto - Nome
    criarElementoFF(
      "usernameRg",
      ["type", "class", "style", "placeholder"],
      [
        "text",
        "form-control",
        `background-color: ${_tema.form.backText};`,
        "@username",
      ],
      `form-${mode}`,
      3
    );

    //Caixa de texto - Nome
    criarElementoFF(
      "nameRg",
      ["type", "class", "style", "placeholder"],
      [
        "text",
        "form-control",
        `background-color: ${_tema.form.backText};`,
        "Nome",
      ],
      `form-${mode}`,
      3
    );

    //Caixa de texto - Sobrenome
    criarElementoFF(
      "surnameRg",
      ["type", "class", "style", "placeholder"],
      [
        "text",
        "form-control",
        `background-color: ${_tema.form.backText};`,
        "Sobrenome",
      ],
      `form-${mode}`,
      3
    );

    //Caixa de texto - email
    criarElementoFF(
      "emailRg",
      ["type", "class", "style", "placeholder"],
      [
        "email",
        "form-control",
        `background-color: ${_tema.form.backText};`,
        "E-mail",
      ],
      `form-${mode}`,
      3
    );

    //Caixa de texto - Confirmar email
    criarElementoFF(
      "c-emailRg",
      ["type", "class", "style", "placeholder"],
      [
        "email",
        "form-control",
        `background-color: ${_tema.form.backText};`,
        "Confirmar E-mail",
      ],
      `form-${mode}`,
      3
    );

    //Caixa de texto - Password
    criarElementoFF(
      "passwordRg",
      ["type", "minlength", "class", "style", "placeholder"],
      [
        "password",
        "6",
        "form-control",
        `background-color: ${_tema.form.backText};`,
        "Palavra-passe",
      ],
      `form-${mode}`,
      3
    );

    //Caixa de texto - confirmar Password
    criarElementoFF(
      "c-passwordRg",
      ["type", "minlength", "class", "style", "placeholder"],
      [
        "password",
        "6",
        "form-control",
        `background-color: ${_tema.form.backText};`,
        "Confiirmar Palavra-passe",
      ],
      `form-${mode}`,
      3
    );

    //Botão submit
    criarElementoWText(
      "button",
      ["class", "type", "onclick"],
      [
        `w-100 mb-2 btn btn-lg rounded-3 ${_tema.form.submit}`,
        "submit",
        "register()",
      ],
      `form-${mode}`,
      "Inscrever"
    );

    //Botão de Entra (trocar)
    criarElementoWText(
      "button",
      ["class", "type", "onclick"],
      [
        `w-100 mb-2 btn btn-lg rounded-3 ${_tema.form.secondaryBtn}`,
        "button",
        `control_Modal('${mode}', "troca")`,
      ],
      `form-${mode}`,
      "Entrar"
    );

    //Confirmação de Termos
    criarElementoWText(
      "small",
      ["class"],
      ["text-muted"],
      `form-${mode}`,
      "Clicando em Inscrever, tu aceitas os termos de utilização"
    );
  }

  //Exclusivo de Entrar
  if (mode == "Entrar") {
    //Alert
    criarElemento(
      "div",
      ["id", "class"],
      ["alert-Entrar", "w-100"],
      `form-${mode}`
    );
    //Caixa de texto - email
    criarElementoFF(
      "emailLg",
      ["required", "type", "class", "style", "placeholder"],
      [
        "",
        "email",
        "form-control",
        `background-color: ${_tema.form.backText};`,
        "E-mail",
      ],
      `form-${mode}`,
      3
    );

    //Caixa de texto - Password
    criarElementoFF(
      "passwordLg",
      ["required", "type", "minlength", "class", "style", "placeholder"],
      [
        "",
        "password",
        "6",
        "form-control",
        `background-color: ${_tema.form.backText};`,
        "Palavra-passe",
      ],
      `form-${mode}`,
      3
    );

    //Botão submit
    criarElementoWText(
      "button",
      ["class", "type", "onclick"],
      [
        `w-100 mb-2 btn btn-lg rounded-3 ${_tema.form.submit}`,
        "submit",
        "login()",
      ],
      `form-${mode}`,
      "Entrar"
    );

    //Botão para inscrever (trocar)
    criarElementoWText(
      "button",
      ["class", "type", "onclick"],
      [
        `w-100 mb-2 btn btn-lg rounded-3 ${_tema.form.secondaryBtn}`,
        "button",
        `control_Modal('${mode}', "troca")`,
      ],
      `form-${mode}`,
      "Inscrever-se"
    );

    //Recuperar palavra-passe
    criarElementoWText(
      "div",
      ["class", "style", "onclick"],
      [
        "text-muted w-100 text-center mt-3",
        `cursor: pointer;`,
        "recoverPassword()",
      ],
      `form-${mode}`,
      "<a>Recuperar palavra passe</a>"
    );

    //Barra divisoria
    criarElemento("hr", ["class"], ["my-4"], `form-${mode}`);

    //Text another
    criarElementoWText(
      "h2",
      ["class"],
      ["fs-5 fw-bold mb-3"],
      `form-${mode}`,
      "Ou entre com"
    );

    //Botão Google
    criarElemento(
      "button",
      ["class", "type", "id"],
      [
        "w-100 py-2 mb-2 btn btn-outline-danger rounded-3",
        "button",
        "logar-wGoogle",
      ],
      `form-${mode}`
    );
    //Icone Google
    criarElemento("ion-icon", ["name"], ["logo-google"], `logar-wGoogle`);
  }
}

//Cria a barra de Navegção
//  state   string    //on para caso o utilizador esteja logado
//                    //off para o caso de não haver ninguem loggado
function navBar(state) {
  //Nav
  criarElemento(
    "nav",
    ["class"],
    [
      `navbar navbar-expand-md ${_tema.navBar.text} fixed-top ${_tema.navBar.back}`,
    ],
    "nav" /* div com id #nav */
  );

  //Container Fluid
  criarElemento("div", ["class"], [`container-fluid`], "nav > nav");

  //Logo Name
  criarElementoWText(
    "a",
    ["class", "href"],
    ["navbar-brand", "#"],
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
    [" ", " "],
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
