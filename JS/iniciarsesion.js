
let userList = [];

function loadUsers() {
    let loadedUsers = localStorage.getItem("user");
    if (loadedUsers !== null) {
        userList = JSON.parse(loadedUsers);
    };
    
}
loadUsers();

function saveUsers() {
    let json = JSON.stringify(userList);
    localStorage.setItem("user", json);
}

function validateEmail(email) {
    if (email == "") {
        alert("The email cannot be left empty");
        return true;
    }
    for (let index = 0; index < userList.length; index++) {
        if (userList[index].email == email) {
            return false;
        }
    }
    alert("el email es incorrecto");
    return true;
}

function validatePassword(password, email) {
    if (password == "") {
        alert("The password cannot be left empty");
        return true;
    }
    for (let index = 0; index < userList.length; index++) {
        if (userList[index].email == email) {
            if (userList[index].password == password) {
                return false;
            }
        }
    }
    alert("la contraseña es incorrecta");
    return true;

}

function updateUser(email){
    for (let index = 0; index < userList.length; index++) {
        if (userList[index].email == email) {
            userList[index].isLogged = true;
        }
    }
    saveUsers();
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