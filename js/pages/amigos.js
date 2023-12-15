document.addEventListener("DOMContentLoaded", () => {
  // console.log("inicio");
  _FIRE.initFirebase();

  _aux.checkChangeState();

  auth_page_check()
  
  setTimeout(() => {
    adm_games();
    nao_amigos();
  }, 2000);
});

function adm_games() {
  _html.elemento(
    "div",
    ["id", "class", "style"],
    ["session_amigos", "m-auto w-75", "margin-bottom:35%"],
    "conteudo",
    `
    <span class="d-block text-center pt-3">
      <h1 class="h1">
        Meus amigos
      </h1>
    </span>
    <span id="amigosList" class="d-block"></span>
    
    `
  );

  async function lista() {
    const amigosList = await Store.getCollection("users", [
      "uid",
      "in",
      User.amigos,
    ]);
    console.log(amigosList);

    amigosList.forEach((amigo) => {
      _html.elemento(
        "div",
        ["class", "style"],
        [
          `card mb-3`,
          `max-width: 75vw; background-color:${Theme.modal.backColor}; color:${Theme.modal.text}`,
        ],
        "amigosList",
        `
      <div class="row g-0 d-flex align-items-center">
        <div class="col-md-4">
          <img src="${fotoVazio}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${amigo.nome + " " + amigo.sobrenome}</h5>
            <p class="card-text">${
              amigo.descricao ? amigo.descricao : " - Perfil sem descrição."
            }</p>
            <p class="card-text">Gostos: ${
              amigo.gostos ? amigo.gostos : " - Gostos não especificados."
            }</p>
            <div class="btn-group" role="group" aria-label="Third group">
              <button type="button" class="btn btn-info m-1">Enviar Mensagem</button>
            
              <button type="button" class="btn btn-danger m-1" onclick="removerAmizade('${
                amigo.id
              }')">Remover Amizade</button>
            </div>
            <p class="card-text"><small class="text-muted">Online a 3 mins atrás</small></p>
          </div>
        </div>
      </div>
    `
      );
    });
  }

  lista();
}

function nao_amigos() {
  _html.elemento(
    "div",
    ["id", "class", "style"],
    ["session_amigos", "m-auto w-75", "margin-bottom:35%"],
    "conteudo",
    `
    <span class="d-block text-center pt-3">
      <h1 class="h1">
        Fazer novas amizades
      </h1>
    </span>
    <span id="nAmigosList" class="d-block"></span>
    
    `
  );

  async function lista() {
    const n_amigosList = await Store.getCollection("users", [
      "uid",
      "not-in",
      User.amigos,
    ]);
    console.log(n_amigosList);

    n_amigosList.forEach((n_amigo) => {
      if (n_amigo.uid == User.uid) {
      } else {
        _html.elemento(
          "div",
          ["class", "style"],
          [
            `card mb-3`,
            `max-width: 75vw; background-color:${Theme.modal.backColor}; color:${Theme.modal.text}`,
          ],
          "nAmigosList",
          `
      <div class="row g-0 d-flex align-items-center">
        <div class="col-md-4">
          <img src="${fotoVazio}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${
              n_amigo.nome + " " + n_amigo.sobrenome
            }</h5>
            <p class="card-text">${
              n_amigo.descricao ? n_amigo.descricao : " - Perfil sem descrição."
            }</p>
            <p class="card-text">Gostos: ${
              n_amigo.gostos ? n_amigo.gostos : " - Gostos não especificados."
            }</p>
            <div class="btn-group" role="group" aria-label="Third group">
              <button type="button" class="btn btn-info m-1">Enviar Mensagem</button>
            
              <button type="button" class="btn btn-success m-1" onclick="fazerAmizade('${
                n_amigo.id
              }')">Fazer Amizade</button>
            </div>
          </div>
        </div>
      </div>
    `
        );
      }
    });
  }

  lista();
}

function enviarMensagem() {}
async function fazerAmizade(id_new_amigo) {
  const new_amigo = await Store.getDoc("users", id_new_amigo);

  User.amigos.push(new_amigo.uid);
  new_amigo.amigos.push(User.uid);

  let user = await Store.updateDoc("users", User.id, User);
  let amigo = await Store.updateDoc("users", new_amigo.id, new_amigo);

  if (user && amigo) {
    setTimeout(() => {
      _aux.Reload();
    }, 200);
  }
}

async function removerAmizade(id_new_namigo) {
  const new_amigo = await Store.getDoc("users", id_new_namigo);

  let idx1 = User.amigos.indexOf(new_amigo.uid);
  User.amigos.splice(idx1, 1);

  let idx2 = new_amigo.amigos.indexOf(User.uid);
  new_amigo.amigos.splice(idx2, 1);

  let user = await Store.updateDoc("users", User.id, User);
  let amigo = await Store.updateDoc("users", new_amigo.id, new_amigo);

  if (user && amigo) {
    setTimeout(() => {
      _aux.Reload();
    }, 200);
  }
}
