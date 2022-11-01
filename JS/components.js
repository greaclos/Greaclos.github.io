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

    //Botão submit
    criarElementoWText(
      "button",
      ["class", "type"],
      [`w-100 mb-2 btn btn-lg rounded-3 ${_tema.form.submit}`, "submit"],
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
        "submit",
        "logar-wGoogle",
      ],
      `form-${mode}`
    );
    //Icone Google
    criarElemento("ion-icon", ["name"], ["logo-google"], `logar-wGoogle`);
  }
}
