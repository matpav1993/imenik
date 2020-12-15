document.addEventListener("DOMContentLoaded", function(){
    
    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id');

    let kontakt = getKontakt(id);
    console.log(kontakt);

    document.getElementById("detalji-ime").innerHTML = kontakt.Ime + ' ' + kontakt.Prezime;
    document.getElementById("detalji-telefon").innerHTML = kontakt.Telefon;
    document.getElementById("detalji-email").innerHTML = kontakt.Email;
    document.getElementById("detalji-opis").innerHTML = kontakt.Opis;

    document.getElementById("uredi-kontakt-button").onclick = function() {
        window.location = '../uredivanje-kontakta/uredivanje-kontakta.html?id=' + kontakt.Id;
    }
});

function getKontakti() {

    let kontakti = localStorage.getItem('kontakti');

    if (kontakti === null){
        saveKontakti([]);
    }

    return JSON.parse(localStorage.getItem('kontakti'));

}

function getKontakt(id) {

    let kontakti = getKontakti();
    indexKontakta = kontakti.findIndex((k => k.Id == id));

    return kontakti[indexKontakta];

}

function deleteKontakt(id) {
    
    let kontakti = getKontakti();
    kontakti = kontakti.filter(k => k.Id !== id)

    saveKontakti(kontakti);

}
document.addEventListener("DOMContentLoaded", function(){
    
    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id');

    let kontakt = getKontakt(id);
    console.log(kontakt);

    document.getElementById("detalji-ime").innerHTML = kontakt.Ime + ' ' + kontakt.Prezime;
    document.getElementById("detalji-telefon").innerHTML = kontakt.Telefon;
    document.getElementById("detalji-email").innerHTML = kontakt.Email;
    document.getElementById("detalji-opis").innerHTML = kontakt.Opis;

    document.getElementById("obrisi-kontakt-button").onclick = function() {
        window.location = '../detalji-kontakta/detalji-kontakta.html?id=' + kontakt.Id;
    }
});


function deleteKontakt(kontakt) {
    
    let kontakti = getKontakti();
    indexKontakta = kontakti.findIndex((k => k.Id == kontakt.Id));

    kontakti[indexKontakta].Ime = kontakt.Ime;
    kontakti[indexKontakta].Prezime = kontakt.Prezime;

    deleteKontakt(kontakti);

}
