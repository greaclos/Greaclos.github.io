//
//
//

//Criar um elemento html
//  nome -      string ""           //Nome do elemento a ser criado
//  des_Attr -  String Array [""]   //Array com as descrições dos atributos (Ex. id, class, etc)
//  v_Attrs -   String Array [""]   //Array com os valores dos atributos acima citados
//      NB: A descrição e o valor devem estar nas mesmas posições em seus respectivos Arrays (Ex. des_Attrs[0] == "id" ! v_Attrs[0] == "myId"  )
//  e_Pai -     string ""           //id do elemento pai para o elemento (apenas testo, sem #)
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

//Criar um elemento html com valor/Conteudo de texto
//  nome -      string ""           //Nome do elemento a ser criado
//  des_Attr -  String Array [""]   //Array com as descrições dos atributos (Ex. id, class, etc)
//  v_Attrs -   String Array [""]   //Array com os valores dos atributos acima citados
//      NB: A descrição e o valor devem estar nas mesmas posições em seus respectivos Arrays (Ex. des_Attrs[0] == "id" ! v_Attrs[0] == "myId"  )
//  e_Pai -     string ""           //id do elemento pai para o elemento (apenas testo, sem #)
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

//Criar um elemento html dentro de uma div com a class "col-md-(md)" do BootStrap
//  nome        string ""           //Nome do elemento a ser criado
//  des_Attr    String Array [""]   //Array com as descrições dos atributos (Ex. id, class, etc)
//  v_Attrs     String Array [""]   //Array com os valores dos atributos acima citados
//      NB: A descrição e o valor devem estar nas mesmas posições em seus respectivos Arrays (Ex. des_Attrs[0] == "id" ! v_Attrs[0] == "myId"  )
//  e_Pai       string ""           //id do elemento pai para a div (apenas testo, sem #)
//  md          number ""           //define o quanto a div vai ocupar a largura do elemento pai
//      NB: É obrigatório que o elemento pai da class "row"
//
//Ex. criarElemento("input", ["type","class"], ["text","form-control"], "box1", 4)
function criarElementoI(nome, des_Attrs, v_Attrs, e_Pai, md) {
  const PAI = document.querySelector(`#${e_Pai}`);
  let n_Attr = des_Attrs.length;

  let div = document.createElement(`div`);
  div.setAttribute("class", `col-md-${md}`);
  PAI.appendChild(div);

  let elemento = document.createElement(`${nome}`);
  for (let e = 0; e < n_Attr; e++) {
    elemento.setAttribute(`${des_Attrs[e]}`, `${v_Attrs[e]}`);
  }
  div.appendChild(elemento);
}




//----------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------
function modalAuth(mode) {
  //Botão
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
    [
      "id",
      "class",
      "data-bs-backdrop",
      "tabindex",
      "aria-labelledby",
      "aria-hidden",
    ],
    [
      `modal-${mode}`,
      "modal fade",
      "static",
      "-1",
      `modal${mode}-Label`,
      "true",
    ],
    "modal"
  );

  //Modal Dialog
  criarElemento(
    "div",
    ["id", "class"],
    [`modal${mode}-dialog`, "modal-dialog modal-dialog-centered"],
    `modal-${mode}`
  );

  //Modal Content
  criarElemento(
    "div",
    ["id", "class"],
    [`modal${mode}-content`, "modal-content"],
    `modal${mode}-dialog`
  );

  //Modal Body
  criarElemento(
    "div",
    ["id", "class"],
    [`modal${mode}-body`, "modal-body"],
    `modal${mode}-content`
  );

  //Modall Row
  criarElemento(
    "div",
    ["id", "class"],
    [`modal${mode}-body-row`, "row g-3 m-3"],
    `modal${mode}-body`
  );

  if (mode == "Registar") {
    criarElementoI(
      "input",
      ["type", "class", "id", "placeholder"],
      ["text", "form-control", "usernameRg", "@username"],
      `modal${mode}-body-row`,
      4
    );

    criarElementoI(
      "input",
      ["type", "class", "id", "placeholder"],
      ["text", "form-control", "nameRg", "Nome"],
      `modal${mode}-body-row`,
      4
    );

    criarElementoI(
      "input",
      ["type", "class", "id", "placeholder"],
      ["text", "form-control", "surnameRg", "Sobrenome"],
      `modal${mode}-body-row`,
      4
    );

    criarElementoI(
      "input",
      ["type", "class", "id", "placeholder"],
      ["email", "form-control", "emailRg", "E-mail"],
      `modal${mode}-body-row`,
      6
    );

    criarElementoI(
      "input",
      ["type", "class", "id", "placeholder"],
      ["email", "form-control", "c-emailRg", "Confirmar E-mail"],
      `modal${mode}-body-row`,
      6
    );

    criarElementoI(
      "input",
      ["type", "minlength", "class", "id", "placeholder"],
      ["password", "6", "form-control", "passwordRg", "Palavra-passe"],
      `modal${mode}-body-row`,
      6
    );

    criarElementoI(
      "input",
      ["type", "minlength", "class", "id", "placeholder"],
      [
        "password",
        "6",
        "form-control",
        "c-passwordRg",
        "Confiirmar Palavra-passe",
      ],
      `modal${mode}-body-row`,
      6
    );

    criarElementoWText(
      "p",
      ["class", "id"],
      ["text-center", "text-entrar"],
      `modal${mode}-body-row`,
      `Já tem conta? Clique <a onclick="control_Modal('Registar', 'troca')">aqui</a> para entrar`
    );
  }

  if (mode == "Entrar") {
    criarElementoI(
      "input",
      ["type", "class", "id", "placeholder"],
      ["text", "form-control", "email-usernameLg", "username ou E-mail"],
      `modal${mode}-body-row`,
      12
    );

    criarElementoI(
      "input",
      ["type", "minlength", "class", "id", "placeholder"],
      ["password", "6", "form-control", "passwordLg", "Palavra-passe"],
      `modal${mode}-body-row`,
      12
    );

    criarElementoWText(
      "p",
      ["class", "id"],
      ["text-center", "text-registar"],
      `modal${mode}-body-row`,
      `Não tem conta? Faça seu registo <a onclick="control_Modal('Entrar', 'troca')">aqui</a>`
    );
  }

  criarElemento(
    "div",
    ["id", "class"],
    [`modal${mode}-body-footer`, "text-center mt-0"],
    `modal${mode}-body`
  );

  criarElemento(
    "input",
    ["type", "class", "data-bs-dismiss", "value", "id"],
    [
      "button",
      "btn btn-secondary m-1",
      "modal",
      "Cancelar",
      `modal-close-${mode}`,
    ],
    `modal${mode}-body-footer`
  );

  criarElemento(
    "input",
    ["type", "class", "value"],
    ["submit", "btn btn-primary m-1", "Enviar"],
    `modal${mode}-body-footer`
  );
}

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
        document.getElementById(`modal-close-${modal}`).click();
        document.getElementById(`button-modal-Registar`).click();
      } else if (modal == "Registar") {
        document.getElementById(`modal-close-${modal}`).click();
        document.getElementById(`button-modal-Entrar`).click();
      }
      break;
    default:
      break;
  }
}
