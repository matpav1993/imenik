document.addEventListener("DOMContentLoaded", function(){

});

function dodajNoviTelefon() {


    let outerDiv = document.createElement("div");
    outerDiv.classList.add('form-floating', 'mb-3');

    let input = document.createElement("input");
    input.classList.add('form-control');
    input.type = 'text';
    input.placeholder = 'placeholder';

    let label = document.createElement("label");
    label.innerHTML = 'Telefon';

    let innerDiv = document.createElement("div");
    innerDiv.classList.add('text-end');

    let button = document.createElement("button");
    button.innerHTML = 'Obriši';
    button.classList.add('btn', 'btn-danger', 'btn-xs', 'mt-2');
    
    outerDiv.appendChild(input);
    outerDiv.appendChild(label);
    innerDiv.appendChild(button);
    outerDiv.appendChild(innerDiv);

    document.getElementById("popis-telefona").appendChild(outerDiv);


}

function dodajKontakt() {

    let kontakt = {
        Id: generateId(),
        Ime: document.getElementById("dodavanje-ime").value,
        Prezime: document.getElementById("dodavanje-prezime").value,
        Telefon: document.getElementById("dodavanje-telefon").value,
        Email: document.getElementById("dodavanje-email").value,
        Opis: document.getElementById("dodavanje-opis").value,
    }

    addKontakt(kontakt);

    window.location = '../detalji-kontakta/detalji-kontakta.html?id=' + kontakt.Id;

}

function getKontakti() {

    let kontakti = localStorage.getItem('kontakti');

    if (kontakti === null){
        saveKontakti([]);
    }

    return JSON.parse(localStorage.getItem('kontakti'));
}

function addKontakt(kontakt) {
    
    let kontakti = getKontakti();
    kontakti.push(kontakt);

    saveKontakti(kontakti);

}

function saveKontakti(kontakti) {
    localStorage.setItem('kontakti', JSON.stringify(kontakti));
}

function generateId() {
    let min = 999;
    let max = 999999;
    return Math.floor(Math.random() * (max - min) ) + min;
}

