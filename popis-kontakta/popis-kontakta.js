document.addEventListener("DOMContentLoaded", function(){

    let kontakti = getKontakti();

    kontakti.forEach(kontakt => {
        
        let node = document.createElement("button"); 

        node.classList.add('list-group-item');
        node.classList.add('list-group-item-action');
        
        node.appendChild(document.createTextNode(kontakt.Ime + ' ' + kontakt.Prezime));
        node.onclick = function() {
            window.location = '../detalji-kontakta/detalji-kontakta.html?id=' + kontakt.Id;
        }
    
        document.getElementById("lista-kontakta").appendChild(node);

    });

});

function getKontakti() {

    let kontakti = localStorage.getItem('kontakti');

    if (kontakti === null){
        saveKontakti([]);
    }

    return JSON.parse(localStorage.getItem('kontakti'));
}

function saveKontakti(kontakti) {
    localStorage.setItem('kontakti', JSON.stringify(kontakti));
}

