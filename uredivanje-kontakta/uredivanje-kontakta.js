document.addEventListener("DOMContentLoaded", function(){

    setTimeout(function(){ 
        let spinner = document.getElementById("uredivanje-spinner");
        let body = document.getElementById("uredivanje-body");

        spinner.classList.remove('d-block');
        spinner.classList.add('d-none');

        body.classList.remove('d-none');
        body.classList.add('d-block');
    }, 1500);

    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id');

    let kontakt = getKontakt(id);

    document.getElementById("uredivanje-ime").value = kontakt.Ime;
    document.getElementById("uredivanje-prezime").value = kontakt.Prezime;
    document.getElementById("uredivanje-email").value = kontakt.Email;
    document.getElementById("uredivanje-opis").innerHTML = kontakt.Opis;

    document.getElementById("uredivanje-telefon").value = kontakt.Telefon[0];
    
    (kontakt.Telefon).forEach(tel => {
        if(kontakt.Telefon[0] !== tel) {
            dodajNoviTelefon(tel);
        }
    });

    document.getElementById("dodaj-novi-telefon").onclick = function() {
        dodajNoviTelefon('');
    }

    document.getElementById("uredivanje-natrag-button").onclick = function() {
        window.location = '../detalji-kontakta/detalji-kontakta.html?id=' + kontakt.Id;
    }

    document.getElementById("spremi-kontakt-button").onclick = function() {
        getAndUpdateKontakt(id);
    }
    
  
});


function dodajNoviTelefon(telefonskiBroj) {

    let outerDiv = document.createElement("div");
    outerDiv.classList.add('form-floating', 'mb-3');

    let input = document.createElement("input");
    input.classList.add('form-control');
    input.type = 'text';
    input.placeholder = 'placeholder';
    input.classList.add('dodatni-telefon')
    input.value = telefonskiBroj;

    let label = document.createElement("label");
    label.innerHTML = 'Telefon';

    let innerDiv = document.createElement("div");
    innerDiv.classList.add('text-end');

    let button = document.createElement("button");
    button.innerHTML = 'Obriši';
    button.classList.add('btn', 'btn-danger', 'btn-xs', 'mt-1');

    button.onclick = function () {
        document.getElementById("popis-telefona").removeChild(outerDiv);
    };
    
    outerDiv.appendChild(input);
    outerDiv.appendChild(label);
    innerDiv.appendChild(button);
    outerDiv.appendChild(innerDiv);

    document.getElementById("popis-telefona").appendChild(outerDiv);
    

}


// document.addEventListener("DOMContentLoaded", function(){

//     console.log(kontakt);

//     document.getElementById("detalji-ime").innerHTML = kontakt.Ime + ' ' + kontakt.Prezime;
//     document.getElementById("detalji-telefon").innerHTML = kontakt.Telefon;
//     document.getElementById("detalji-email").innerHTML = kontakt.Email;
//     document.getElementById("detalji-opis").innerHTML = kontakt.Opis;


//     }
// });


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


function getKontakt(id) {

    let kontakti = getKontakti();
    indexKontakta = kontakti.findIndex((k => k.Id == id));

    return kontakti[indexKontakta];

}

function getAndUpdateKontakt(id) {
    
    let telefoni = [];
    telefoni.push(document.getElementById('uredivanje-telefon').value);

    Array.from(document.getElementsByClassName('dodatni-telefon'))
            .forEach((tel) => {
        telefoni.push(tel.value);
    });

    let kontakt = {
        Id: id,
        Ime: document.getElementById("uredivanje-ime").value,
        Prezime: document.getElementById("uredivanje-prezime").value,
        Telefon: telefoni,
        Email: document.getElementById("uredivanje-email").value,
        Opis: document.getElementById("uredivanje-opis").value,
    }

    updateKontakt(kontakt);
    window.location = '../detalji-kontakta/detalji-kontakta.html?id=' + kontakt.Id;

}


function updateKontakt(kontakt) {
    let kontakti = getKontakti();
    indexKontakta = kontakti.findIndex((k => k.Id == kontakt.Id));

    kontakti[indexKontakta].Ime = kontakt.Ime;
    kontakti[indexKontakta].Prezime = kontakt.Prezime;
    kontakti[indexKontakta].Telefon = kontakt.Telefon;
    kontakti[indexKontakta].Email = kontakt.Email;
    kontakti[indexKontakta].Opis = kontakt.Opis;

    saveKontakti(kontakti);
}
