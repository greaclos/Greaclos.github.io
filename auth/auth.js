function logar() {
  var user = document.getElementById("user").value;
  var pass = document.getElementById("pssword").value;

  var colec = users;
  var colecLength = colec.length;

  for (var i = 0; i < colecLength; i++) {
    if (colec[i].name == user && colec[i].pass == pass) {
      localStorage.setItem("username", user);
      localStorage.setItem("password", pass);
      alert("User existente");
    }
  }
}

$(document).ready(() => {});

const hasUpper = (str) => /[A-Z]/.test(str);
const hasLower = (str) => /[a-z]/.test(str);
const hasNumber = (str) => /[0-9]/.test(str);
