
document.addEventListener("DOMContentLoaded", function(){

    addKontakt({'Id': generateId(), 'Ime':'Bruno', 'Prezime': 'Loncar'});
    addKontakt({'Id': generateId(), 'Ime':'Matea', 'Prezime': 'Pavic'});
    addKontakt({'Id': generateId(), 'Ime':'Vedran', 'Prezime': 'Drenski'});

    // updateKontakt({'Id': 798581, 'Ime':'Novo ime', 'Prezime': 'Novo prezime'})

    console.log(getKontakti());
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

function addKontakt(kontakt) {
    
    let kontakti = getKontakti();
    kontakti.push(kontakt);

    saveKontakti(kontakti);

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

function deleteKontakt(id) {
    
    let kontakti = getKontakti();
    kontakti = kontakti.filter(k => k.Id !== id)

    saveKontakti(kontakti);

}



function generateId() {
    let min = 999;
    let max = 999999;
    return Math.floor(Math.random() * (max - min) ) + min;
}

