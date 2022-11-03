//Para sabem mais sobre as funções, (ctrl + click no nome da função)
//Roda assim que a oagina toda for carregada
document.addEventListener("DOMContentLoaded", () => {
  //Função ModalAuth
  modalAuth("Registar");
  modalAuth("Entrar");

  //Verifica se tem utilizador logado
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      navBar("on");
    } else {
      navBar("off");
    }
  });

});
