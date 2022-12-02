const username = document.getElementById("username");
const mainContent = document.getElementById("container");

//Logica del local storage
let userList = [];
let characterList = [];
let favoriteList = [];
let apiList = [];

//Funciones de carga y guardado
function loadUsers() {
    let loadedUsers = localStorage.getItem("user");
    if (loadedUsers !== null) {
        userList = JSON.parse(loadedUsers);
    };
    console.log("load users:", userList);
}
loadUsers(); //primera carga de users

function loadCharacters() {
    let loadedCharacters = localStorage.getItem("character");
    if (loadedCharacters !== null) {
        characterList = JSON.parse(loadedCharacters);
    };
    console.log("load characters:", characterList);
}
//loadCharacters(); //primera carga de characters

function loadFavorites() {
    let user = findLoggedUser();
    let loadedFavorites = user.favoriteList;
    if (loadedFavorites !== null) {
        favoriteList = loadedFavorites;
    };
    console.log("load favorites:", favoriteList);
}
loadFavorites(); //primera carga de favorites

function saveUsers() {
    let json = JSON.stringify(userList);
    localStorage.setItem("user", json);
}

function saveCharacters() {
    let json = JSON.stringify(characterList);
    localStorage.setItem("character", json);
}

function saveApi() {
    let json = JSON.stringify(apiList);
    localStorage.setItem("api", json);
}

function saveFavorites() {
    let json = JSON.stringify(favoriteList);
    localStorage.setItem("favorite", json);
}

//Funciones de logica HUD
function findLoggedUser() {
    let loggedUser
    for (let index = 0; index < userList.length; index++) {
        if (userList[index].isLogged == true) {
            loggedUser = userList[index];
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
    for (let index = 0; index < userList.length; index++) {
        if (userList[index].isLogged == true) {
            userList[index].isLogged = false;
            saveUsers();
            window.location.href = './index.html'
            favoriteList = [];
            saveFavorites();
            localStorage.removeItem("character");
        }
    }

}

//Funciones de logica Personajes
const fetchData = async () => {
    const MD5 = function(d){var r = M(V(Y(X(d),8*d.length)));return r.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}
    const publicKey = "35fa1f489d59da9312e3a83a9e181708"
    const privateKey = "77a5494253c2ae3bdcce766bc2283145a6b49c38"
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    var value = `${timestamp}${privateKey}${publicKey}`;
    var result = MD5(value);
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${result}`
    const data = await fetch(url);
    const dataJson = await data.json();
    apiList = dataJson.results;
    //console.log('fetch apiList', apiList);
    saveApi();
}
fetchData();


function generateContent() {
    //console.log('apiList', apiList);

    if (localStorage.getItem("character")) {
        console.log("characters loaded from memory")
        loadCharacters()
        showCharacters();
    } else {
        if (apiList.length > 0) {
            for (let i = 0; i < apiList.length; i++) {
                let id = apiList[i].id;
                let name = apiList[i].name;
                let description = apiList[i].description;
                let comics = apiList[i].comics;
                let stories = apiList[i].stories;
                let events = apiList[i].events;
                let series = apiList[i].series;
                let favorite = false;
                let image = apiList[i].image;
                let newCharacter = new Character(id, name, description, comics, stories, events, series, favorite, image);
                characterList.push(newCharacter);
            }
            console.log('characerList', characterList);
            saveCharacters();
            showCharacters();
        } else {
            alert("Couldn't fetch from API, retrying...")
            setTimeout(generateContent, 2000);
            showCharacters();
        }
    }
}

if (localStorage.getItem("character")) {
    generateContent();
} else{
    setTimeout(generateContent, 300);
}
//content generation trigger

function showCharacters() {
    for (let i = 0; i < characterList.length; i++) {
        let favFlag = false
        for (let j = 0; j < favoriteList.length; j++) {
            if (characterList[i].id == favoriteList[j].id) {
                favFlag = true;
            }
        }
        let character = new Character(
            characterList[i].id, characterList[i].name, characterList[i].description, characterList[i].comics, characterList[i].stories, characterList[i].events, characterList[i].series, favFlag, characterList[i].image
        )
        if (favFlag == true) {
            character.renderFav(mainContent);
        } else if (favFlag == false) {
            character.renderNoFav(mainContent);
        }
    }
}

function findCharacter(id) {
    for (let i = 0; i < characterList.length; i++) {
        if (characterList[i].id == id) {
            return characterList[i];
        }
    }
    console.log("character not found");
}

function addFavorite(id) {
    for (let i = 0; i < characterList.length; i++) {
        if (characterList[i].id == id) {
            characterList[i].favorite = true;
            favoriteList.push(characterList[i]);
            saveCharacters();
            saveFavorites();
        }
    }
    for (let index = 0; index < userList.length; index++) {
        if (userList[index].isLogged == true) {
            userList[index].favoriteList = favoriteList;
            saveUsers();
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
    for (let i = 0; i < characterList.length; i++) {
        if (characterList[i].id == id) {
            characterList[i].favorite = false;
            saveCharacters();
        }
    }
    for (let index = 0; index < userList.length; index++) {
        if (userList[index].isLogged == true) {
            userList[index].favoriteList = favoriteList;
            saveUsers();
        }
    }
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


function searchCharacter(){
    if (localStorage.getItem("search")) {
        localStorage.removeItem("search");
    }
    const searchHTML = document.getElementById("search");
    let search = searchHTML.value;
    let searchList = [];
    if (search !== "") {
        for (let i = 0; i < characterList.length; i++) {
            if (characterList[i].name.toLowerCase().includes(search.toLowerCase())) {
                searchList.push(characterList[i]);
            }
        }
    }
    if (searchList.length == 0) {
        alert("No Matches For Search")
    } else{
        let json = JSON.stringify(searchList);
        localStorage.setItem("search", json);
        window.location.href = './buscar.html'
    }
}