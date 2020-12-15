document.addEventListener("DOMContentLoaded", function(){

    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id');

    let kontakt = getKontakt(id);

    document.getElementById("uredivanje-ime").value = kontakt.Ime;
    document.getElementById("uredivanje-prezime").value = kontakt.Prezime;
    document.getElementById("uredivanje-telefon").value = kontakt.Telefon;
    document.getElementById("uredivanje-email").value = kontakt.Email;
    document.getElementById("uredivanje-opis").innerHTML = kontakt.Opis;

    document.getElementById("uredivanje-natrag-button").onclick = function() {
        window.location = '../detalji-kontakta/detalji-kontakta.html?id=' + kontakt.Id;
    }
  
});

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

function updateKontakt(kontakt) {
    
    let kontakti = getKontakti();
    indexKontakta = kontakti.findIndex((k => k.Id == kontakt.Id));

    kontakti[indexKontakta].Ime = kontakt.Ime;
    kontakti[indexKontakta].Prezime = kontakt.Prezime;

    saveKontakti(kontakti);

}

