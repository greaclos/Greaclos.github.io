document.addEventListener("DOMContentLoaded", () => {
  // console.log("inicio");

  _FIRE.initFirebase();

  _aux.checkChangeState();

  auth_page_check()
  
  // setTimeout(() => {
  //   editPerfil();
  // }, 8000);

  setTimeout(() => {
    showPerfil();
  }, 2000);
});

function showPerfil() {
  html_Comp.conteudo('clear')
  
  html_Comp.conteudo(`
  <div class="position-absolute top-50 start-50 translate-middle">
    <div class="row  perfil-box p-3 rounded
      d-flex align-items-start" style="width:90vw">
          <div class="text-center col">
            <img src="${fotoVazio}" title="Foto do Usuário" 
              class="img-fluid img-thumbnail rounded-circle mb-4" width="200">
            <h1>@${User.username}</h1>
          </div>
          <div class="col mt-5">
              <h2>Informações Pessoais</h2>
              <p>Nome: ${User.nome + " " + User.sobrenome}</p>
              <p>Data de Nascimento:
               ${
                 User.dataNascimento[0] +
                 "/" +
                 User.dataNascimento[1] +
                 "/" +
                 User.dataNascimento[2]
               }</p>
          </div>
          <div class="col mt-5" id="dados-da-conta">
              <h2>Dados da conta</h2>
              <p>Email: ${firebase.auth().currentUser.email}</p>
              <p>Password: *********</p>
              <button class="btn btn-light btn-sm float-end" onclick="editPerfil()">Editar</button>  
          </div>
      </div>
    </div>
  `);
}

function editPerfil() {
  html_Comp.conteudo('clear')

  let data =
    User.dataNascimento[2] +
    "-" +
    User.dataNascimento[1] +
    "-" +
    User.dataNascimento[0];

    
  html_Comp.conteudo(`
  <div class="position-absolute top-50 start-50 translate-middle">
    <div class="row  perfil-box p-3 rounded
      d-flex align-items-start" style="width:90vw">
          <div class="text-center col">
            <img onclick="_aux.alertar('mudar foto','info')" src="${fotoVazio}" title="Trocar foto" 
              class="img-fluid img-thumbnail rounded-circle bg-info mb-4" width="200">
            <h1>@${User.username}</h1>
          </div>
          <div class="col mt-5">
              <h2>Informações Pessoais</h2>
              <p>Nome: <input type="text" class="form-control" value="${
                User.nome + " " + User.sobrenome
              }"/></p>
              <p>Data de Nascimento:
              <input type="date" class="form-control" id="datr" 
              value='${data}'
                />
               </p>
          </div>
          <div class="col mt-5">
              <h2>Dados da conta</h2>
              <p>Email: ${firebase.auth().currentUser.email}</p>
              <p>Password: *********</p>
              <button class="btn btn-primary btn-sm float-end m-1" onclick="guardar()">Guardar</button>  
              <button class="btn btn-light btn-sm float-end m-1" onclick="showPerfil()">Cancelar</button>  
          </div>
      </div>
    </div>
  `);
}


function guardar(){

  // ------------
  _aux.alertar("Alterações guardadas","success")
  showPerfil()
}