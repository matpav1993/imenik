document.addEventListener("DOMContentLoaded", function () {

    let kontakti = getKontakti();
    sortirajKontakte(kontakti);
    kontakti = filtrirajKontaktePoKeywordu(kontakti);

    postaviPretragaClick();

    if (kontakti.length > 0) napraviListuKontakta(kontakti);
    else napraviImenikPrazanAlert();

});



//Pomoćne funkcije
function sortirajKontakte(kontakti) {
    let urlParams = new URLSearchParams(window.location.search);
    let sort = urlParams.get('sort');

    if (sort === 'desc') {
        kontakti.sort((a, b) => (a.Ime > b.Ime) ? -1 : ((b.Prezime > a.Prezime) ? 1 : 0));

        document.getElementById("sortirano-po-imenu").innerHTML = 'Sortirano po imenu: DESC';
        document.getElementById("sortirano-po-imenu").onclick = function () {
            window.location = '?sort=asc';
        };
    }
    else {
        kontakti.sort((a, b) => (a.Ime > b.Ime) ? 1 : ((b.Prezime > a.Prezime) ? -1 : 0));

        document.getElementById("sortirano-po-imenu").innerHTML = 'Sortirano po imenu: ASC';
        document.getElementById("sortirano-po-imenu").onclick = function () {
            window.location = '?sort=desc';
        };
    }
}

function postaviPretragaClick() {

    var pretragaInput = document.getElementById("pretraga-input");

    pretragaInput.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("pretraga-button").click();
        }
        else if (event.keyCode === 27) {
            event.preventDefault();
            document.getElementById("pretraga-input").value = '';
            document.getElementById("pretraga-button").click();
        }
    });

    document.getElementById("pretraga-button").onclick = function () {
        let keyword = document.getElementById("pretraga-input").value;
        window.location = '?keyword=' + keyword;
    };
}

function filtrirajKontaktePoKeywordu(kontakti) {
    let urlParams = new URLSearchParams(window.location.search);
    let keyword = urlParams.get('keyword');

    if (keyword !== null && keyword.length > 0) {
        kontakti = filterKontakti(keyword);
        document.getElementById("pretraga-input").value = keyword;

        let ocistiButton = document.getElementById("ocisti-pretragu-button");
        ocistiButton.classList.remove('d-none');
        ocistiButton.classList.add('d-block');

        document.getElementById("ocisti-pretragu-button").onclick = function () {
            window.location = '../popis-kontakta/popis-kontakta.html';
        };

    }
    return kontakti;
}

function napraviListuKontakta(kontakti) {
    kontakti.forEach(kontakt => {

        let node = document.createElement("button");

        node.classList.add('list-group-item');
        node.classList.add('list-group-item-action');

        node.appendChild(document.createTextNode(kontakt.Ime + ' ' + kontakt.Prezime));
        node.onclick = function () {
            window.location = '../detalji-kontakta/detalji-kontakta.html?id=' + kontakt.Id;
        };

        document.getElementById("lista-kontakta").appendChild(node);
    });
}

function napraviImenikPrazanAlert() {
    let node = document.createElement("p");
    node.classList.add('alert', 'alert-danger');

    node.appendChild(document.createTextNode('Nema rezultata za prikaz.'));
    document.getElementById("lista-kontakta").appendChild(node);

    document.getElementById("lista-kontakta").classList.remove('card');
}


// Funkcije za upravljanje kontaktima
function getKontakti() {

    let kontakti = localStorage.getItem('kontakti');

    if (kontakti === null) {
        saveKontakti([]);
    }

    return JSON.parse(localStorage.getItem('kontakti'));
}

function filterKontakti(keyword) {

    let kontakti = getKontakti();
    kontakti = kontakti.filter(
        k => k.Ime.toLowerCase().includes(keyword.toLowerCase()) ||
            k.Prezime.toLowerCase().includes(keyword.toLowerCase())
    )

    return kontakti;

}

function saveKontakti(kontakti) {
    localStorage.setItem('kontakti', JSON.stringify(kontakti));
}

function firstletter(kontakti)
{
    // "<li class='list-group-item d-flex flex-row'>" + 
    // "<div class='p-2 round-icon rounded-circle'>" + <val.Ime.charAt(0).ToUpperCase() +
    // val.Prezime.charAt(0).ToUpperCase() + "</div>" +
    // "div class='text-break w-75 p-2'><h4 class='mt-2 float-start'>" + val.Ime
    // + " " + val.Prezime + "</h4></div>" +
    // "<div class='text-break w-25'><a title='Pogledaj više' class='view btn btn-primary float-end'
    // kontakt.Id='" + val.id + "'><src=..//assets/icons/info.svg
    // </a></div>" +
    // "</li>";


}