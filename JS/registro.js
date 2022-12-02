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

function validateUsername(user) {
    if (user == "") {
        alert("Your username cannot be left empty");
        return true;
    }
    for (let index = 0; index < userList.length; index++) {
        if (userList[index].name == user) {
            alert("Este usuario ya existe");
            return true
        }
    }
}

function validateEmail(email) {
    if (email == "") {
        alert("Your email cannot be left empty");
        return true;
    }
    if (email.includes("@") && email.includes(".")) {
        for (let index = 0; index < userList.length; index++) {
            console.log(index, userList[index].email)
            if (userList[index].email == email) {
                alert("Este correo ya ha sido utilizado")
                return true
            }
        }
        return false
    } else
        alert("Correo incorrecto")
    return true
}

function validatePassword(password) {
    if (password == "") {
        alert("Your password cannot be left empty");
        return true;
    } else if (password.length < 4) {
        alert("Tu contraseña debe tener mas de 4 digitos");
        return true;
    } else {
        return false;
    }
}

function createNewUser(name, email, password, favoriteList) {
    const newUser = {
        name: name,
        email: email,
        password: password,
        isLogged: true,
        favoriteList: null
    }
    userList.push(newUser);
    saveUsers();
    console.log("new user", newUser.name, "saved")
}

function signup() {
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    if (validateUsername(name)) {
        return;
    } else if (validateEmail(email)) {
        return;
    } else if (validatePassword(password)) {
        return;
    } else {
        createNewUser(name, email, password);
        window.location.href = './index2.html'
    }

}