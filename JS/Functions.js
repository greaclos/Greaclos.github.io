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
