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

//classUl - string
//textLi - array - nomes dos li
//classLi - array - classe pra cada nome acima citado
//classA - array -
//func - função pro onclick (Enviar com "")
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

//----------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------

//Controla a visualização das Modals
function control_Modal(modal, comand) {
  // console.log("comand", comand);
  // console.log("modal", modal);
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
      ["class", "type"],
      [`w-100 mb-2 btn btn-lg rounded-3 ${_tema.form.submit}`, "submit"],
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
    //Caixa de texto - email
    //
    criarElemento("div", ["id"], ["alert-email-Entrar"], `form-${mode}`);
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
    //
    criarElemento("div", ["id"], ["alert-password-Entrar"], `form-${mode}`);
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

function navBar(/* state: on / off;  */) {
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
  criarElemento("div", ["class"], ["d-flex"], "navbarCollapse");

  //
  navbar_list(
    "navbar-nav me-auto mb-2 mb-md-0",
    ["Login", "Inscrever-se"],
    [`nav-link`, `nav-link`],
    ["control_Modal('Entrar', 'open');", "control_Modal('Registar', 'open');"],
    "navbarCollapse > div"
  );
}

//----------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------

// Alert

function alertar(idTarget, message, type) {
  let Pai = document.querySelector(`#${idTarget}`);

  let wrapper = document.createElement("div");
  wrapper.setAttribute("class", `alert alert-${type} alert-dismissible`);
  wrapper.setAttribute("role", "alert");

  let mensagem = document.createElement("div");
  mensagem.innerHTML = `${message}`;

  wrapper.appendChild(mensagem);

  let botão = document.createElement("button");
  botão.setAttribute("type", "button");
  botão.setAttribute("class", "btn-close");
  botão.setAttribute("data-bs-dismiss", "alert");
  botão.setAttribute("aria-label", "Close");

  wrapper.appendChild(botão);

  Pai == null ? console.log("Deu pau") : Pai.appendChild(wrapper);
}

alertar("alert-email-Entrar", "Será que funciona um dia?", "success");
