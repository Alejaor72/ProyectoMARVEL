class character{
    constructor(id, name, image,description,comics,stories,events,series){
        this.id = id;
        this.name = name;
        this.image = thumbnail.path;
        this.description = description;
        this.comics = comics;
        this.stories = stories;
        this.events = events;
        this.series = series;
        this.favorite = false;
    }

    renderFav(container) {
        let card = document.createElement('div');
        card.classList.add('item');

        let html = `<div class="superheroe">
                     <a href="javascript:abrir(${this.id})">
                     <div  class="contenedor">
                       <img src="${this.image}">
                       <img class="star" id="star${this.id}" src="../images/starFill.png" alt="starHollow" onclick="favorite(${this.id})" role="button">
                     </div>
                     </a>
                     <h2>"${this.name}"</h2>
                    </div>
                    <button id="like${this.id}" class="unliked">FAVORITE</product>
     
                     <div class="ventana" id="vent${this.id}">
                       <img src="${this.image}">
                     <div class="texto">
                       <h1>${this.name}</h1>
                       <a href="javascript:cerrar()">
                         <img src="images/cerrar.png" alt="">
                       </a>
                       <div class="datos">
                          <h3>DESCRIPCION</h3>
                          <p>${this.description}</p>
                          <h3>COMICS</h3>
                          <p>${this.comics}</p>
                          <h3>HISTORIAS</h3>
                          <p>${this.stories}</p>
                          <h3>EVENTOS</h3>
                          <p>${this.events}</p>
                          <h3>SERIES</h3>
                          <p>${this.series}</p>
                       </div>
                     </div>
                    </div>`;

        card.innerHTML += html;
        container.appendChild(card);
    }

    renderNoFav(container){
        let card = document.createElement('div');
        card.classList.add('item');

        let html = `<div class="superheroe">
                     <a href="javascript:abrir(${this.id})">
                     <div  class="contenedor">
                       <img src="${this.image}">
                       <img class="star" id="star${this.id}" src="../images/starHollow.png" alt="starHollow" onclick="favorite(${this.id})" role="button">
                     </div>
                     </a>
                     <h2>"${hero.name}"</h2>
                    </div>
                    <button id="like${this.id}" class="unliked">FAVORITE</product>
     
                     <div class="ventana" id="vent${this.id}">
                       <img src="${this.image}">
                     <div class="texto">
                       <h1>${this.name}</h1>
                       <a href="javascript:cerrar()">
                         <img src="images/cerrar.png" alt="">
                       </a>
                       <div class="datos">
                          <h3>DESCRIPCION</h3>
                          <p>${this.description}</p>
                          <h3>COMICS</h3>
                          <p>${this.comics}</p>
                          <h3>HISTORIAS</h3>
                          <p>${this.stories}</p>
                          <h3>EVENTOS</h3>
                          <p>${this.events}</p>
                          <h3>SERIES</h3>
                          <p>${this.series}</p>
                       </div>
                     </div>
                    </div>`;

        card.innerHTML += html;
        container.appendChild(card);
    }
    

}

function abrir(vent){
    document.getElementById(`vent${vent}`).style.display="flex";
}
function cerrar(vent){
    document.getElementById(`vent${vent}`).style.display="none";
}
