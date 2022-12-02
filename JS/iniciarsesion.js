
let ListaUsuarios = [];

function UsuariosCargados() {
    let loadedUsers = localStorage.getItem("user");
    if (loadedUsers !== null) {
        ListaUsuarios = JSON.parse(loadedUsers);
    };
    
}
UsuariosCargados();

function GuardarUsuario() {
    let json = JSON.stringify(ListaUsuarios);
    localStorage.setItem("user", json);
}

function validateEmail(email) {
    if (email == "") {
        alert("ingrese un correo correcto");
        return true;
    }
    for (let index = 0; index < ListaUsuarios.length; index++) {
        if (ListaUsuarios[index].email == email) {
            return false;
        }
    }
    alert("el email es incorrecto");
    return true;
}

function validatePassword(password, email) {
    if (password == "") {
        alert("ingrese una contraseña correcta");
        return true;
    }
    for (let index = 0; index < ListaUsuarios.length; index++) {
        if (ListaUsuarios[index].email == email) {
            if (ListaUsuarios[index].password == password) {
                return false;
            }
        }
    }
    alert("la contraseña es incorrecta");
    return true;

}

function updateUser(email){
    for (let index = 0; index < ListaUsuarios.length; index++) {
        if (ListaUsuarios[index].email == email) {
            ListaUsuarios[index].isLogged = true;
        }
    }
    GuardarUsuario();
}

function login() {

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    if (validateEmail(email)) {
        return;
    } else if (validatePassword(password, email)) {
        return;
    } else {
        updateUser(email);
        window.location.href = './index2.html'
    }
        

}
