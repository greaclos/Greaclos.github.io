function login() {
  if (firebase.auth().currentUser) {
    ffirebase.auth().signOut();
  }
  const email = document.getElementById("emailLg").value;
  const password = document.getElementById("passwordLg").value;

  console.log(email, password);
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((response) => {
      setTimeout(() => {
        control_Modal("Entrar", "close");
        console.log(response);
      }, [2000]);
    })
    .catch((error) => {
      console.log(error.code);
      validaLogin(error.code)
    });
}

function validaLogin(code) {
  if (code == "auth/wrong-password") {
    alert("Pass erraada")
  }
  
}
