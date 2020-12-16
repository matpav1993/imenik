document.addEventListener("DOMContentLoaded", function () {

    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id');

    let kontakt = getKontakt(id);

    (kontakt.Telefon).forEach(tel => {

        let label = document.createElement("a");
        label.classList.add('d-block');
        label.href = 'tel:' + tel;
        label.innerHTML = tel;

        document.getElementById("detalji-telefon").appendChild(label);
    });

    napraviOpisPrazanAlert(kontakt);

    let label = document.createElement("a");
    label.classList.add('d-block');
    label.href = 'mailto:' + kontakt.Email;
    label.innerHTML = kontakt.Email;

    document.getElementById("detalji-email").appendChild(label);

    document.getElementById("detalji-ime").innerHTML = kontakt.Ime + ' ' + kontakt.Prezime;

    document.getElementById("uredi-kontakt-button").onclick = function () {
        window.location = '../uredivanje-kontakta/uredivanje-kontakta.html?id=' + kontakt.Id;
    }

    document.getElementById("modal-delete-potvrdi").onclick = function () {
        deleteKontakt(kontakt.Id);
        window.location = '../popis-kontakta/popis-kontakta.html?id=' + kontakt.Id;
    }

});

function getKontakti() {

    let kontakti = localStorage.getItem('kontakti');

    if (kontakti === null) {
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

function saveKontakti(kontakti) {
    localStorage.setItem('kontakti', JSON.stringify(kontakti));
}

function napraviOpisPrazanAlert(kontakt) {

    if (kontakt.Opis === null || kontakt.Opis === "") 
    {
        document.getElementById("detalji-opis").innerHTML = 'Opis je prazan...';
    }
    else
    {
        document.getElementById("detalji-opis").innerHTML = kontakt.Opis;
    }
}
