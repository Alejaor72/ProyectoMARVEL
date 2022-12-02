const username = document.getElementById("username");
const mainContent = document.getElementById("container");

let ListaUsuarios = [];
let ListaPersonajes = [];
let favoriteList = [];
let searchListRender = [];

function UsuariosCargados() {
    let loadedSearch = localStorage.getItem("search");
    if (loadedSearch !== null) {
        searchListRender = JSON.parse(loadedSearch);
    };
    
}
UsuariosCargados();

function loadUsers() {
    let loadedUsers = localStorage.getItem("user");
    if (loadedUsers !== null) {
        ListaUsuarios = JSON.parse(loadedUsers);
    };
    
}
loadUsers(); 

function loadCharacters() {
    let loadedCharacters = localStorage.getItem("character");
    if (loadedCharacters !== null) {
        ListaPersonajes = JSON.parse(loadedCharacters);
    };
    console.log("load characters:", ListaPersonajes);
}
loadCharacters(); 

function loadFavorites() {
    let user = findLoggedUser();
    let loadedFavorites = user.favoriteList;
    if (loadedFavorites !== null) {
        favoriteList = loadedFavorites;
    };
    
}
loadFavorites(); 

function GuardarUsuario() {
    let json = JSON.stringify(ListaUsuarios);
    localStorage.setItem("user", json);
}

function saveCharacters() {
    let json = JSON.stringify(ListaPersonajes);
    localStorage.setItem("character", json);
}

function saveFavorites() {
    let json = JSON.stringify(favoriteList);
    localStorage.setItem("favorite", json);
}

//Funciones de logica HUD
function findLoggedUser() {
    let loggedUser
    for (let index = 0; index < ListaUsuarios.length; index++) {
        if (ListaUsuarios[index].isLogged == true) {
            loggedUser = ListaUsuarios[index];
            return loggedUser;
        }
    }
}

function updateHUD() {
    loggedUser = findLoggedUser();
    username.innerHTML = loggedUser.name;
}
updateHUD();

function logout() {
    for (let index = 0; index < ListaUsuarios.length; index++) {
        if (ListaUsuarios[index].isLogged == true) {
            ListaUsuarios[index].isLogged = false;
            GuardarUsuario();
            window.location.href = './index.html'
            favoriteList = [];
            saveFavorites();
            localStorage.removeItem("character");
        }
    }

}

//Funciones de logica Personajes

function showCharacters() {
    for (let i = 0; i < searchListRender.length; i++) {
        let character = new Character(
            ListaPersonajes[i].id, ListaPersonajes[i].name, ListaPersonajes[i].description, ListaPersonajes[i].comics, ListaPersonajes[i].stories, ListaPersonajes[i].events, ListaPersonajes[i].series, favFlag, ListaPersonajes[i].image
        )
        if (character.favorite == true) {
            character.renderFavoritos(mainContent);
        } else if (character.favorite == false) {
            character.renderNoFavoritos(mainContent);

        }
    }
}

function findCharacter(id) {
    for (let i = 0; i < ListaPersonajes.length; i++) {
        if (ListaPersonajes[i].id == id) {
            return ListaPersonajes[i];
        }
    }
    console.log("character not found");
}

function addFavorite(id) {
    for (let i = 0; i < ListaPersonajes.length; i++) {
        if (ListaPersonajes[i].id == id) {
            ListaPersonajes[i].favorite = true;
            ListaPersonajes.push(ListaPersonajes[i]);
            saveCharacters();
            saveFavorites();
        }
    }
    for (let index = 0; index < ListaUsuarios.length; index++) {
        if (ListaUsuarios[index].isLogged == true) {
            ListaUsuarios[index].favoriteList = favoriteList;
            GuardarUsuario();
        }
    }
}

function removeFavorite(id) {
    for (let i = 0; i < favoriteList.length; i++) {
        if (favoriteList[i].id == id) {
            favoriteList.splice(i, 1);
            saveFavorites();
        }
    }
    for (let i = 0; i < ListaPersonajes.length; i++) {
        if (ListaPersonajes[i].id == id) {
            ListaPersonajes[i].favorite = false;
            saveCharacters();
        }
    }
    for (let index = 0; index < ListaUsuarios.length; index++) {
        if (ListaUsuarios[index].isLogged == true) {
            ListaUsuarios[index].favoriteList = favoriteList;
            GuardarUsuario();
        }
    }
    mainContent.innerHTML = "";
    showCharacters();
}

function favorite(id) {
    const star = document.getElementById(`star${id}`);
    let starContain = star.src;
    if (starContain.includes("Fill")) {
        star.src = "../images/starHollow.png";
        removeFavorite(id);
    } else if (starContain.includes("Hollow")) {
        star.src = "../images/starFill.png";
        addFavorite(id);
    }
}

function details(id) {
    let character = null;
    for (let i = 0; i < ListaPersonajes.length; i++) {
        if (ListaPersonajes[i].id == id) {
            character = ListaPersonajes[i];
        }
    }
    if (character == null) {
        alert("Could not get details for this character.")
    } else {
        window.location.href = './details.html?id=' + character.id
    }
}

function searchCharacter(){
    if (localStorage.getItem("search")) {
        localStorage.removeItem("search");
    }
    const searchHTML = document.getElementById("search");
    let search = searchHTML.value;
    let searchList = [];
    if (search !== "") {
        for (let i = 0; i < ListaPersonajes.length; i++) {
            if (ListaPersonajes[i].name.toLowerCase().includes(search.toLowerCase())) {
                searchList.push(ListaPersonajes[i]);
            }
        }
    }
    if (searchList.length == 0) {
        alert("No Matches For Search")
    } else{
        let json = JSON.stringify(searchList);
        localStorage.setItem("search", json);
        window.location.href = './search.html'
    }
}

showCharacters();