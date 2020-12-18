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

        let imePrezime = (kontakt.Ime.length > 0) ? kontakt.Ime + ' ' : '';
        imePrezime += (kontakt.Prezime.length > 0) ? kontakt.Prezime : '';

        let inicijali = (kontakt.Ime.length > 0) ? kontakt.Ime[0] : '';
        inicijali += (kontakt.Prezime.length > 0) ? kontakt.Prezime[0] : '';

        let node = document.createElement("button");

        node.classList.add('list-group-item');
        node.classList.add('list-group-item-action');

        let div1 = document.createElement('div');
        div1.classList.add('row', 'p-0');

        let div2 = document.createElement('div');
        div2.classList.add('col-2', 'pt-1', 'col-lg-1');

        div1.appendChild(div2);

        let div3 = document.createElement('div');
        div3.classList.add('user-circle');
        div3.appendChild(document.createTextNode(inicijali));

        div2.appendChild(div3);

        let div4 = document.createElement('div');
        div4.classList.add('col-10', 'col-lg-11', 'p-0');

        let div5 = document.createElement('span');
        div5.classList.add('user-name');
        div5.appendChild(document.createTextNode(imePrezime));

        div4.appendChild(div5);
        div1.appendChild(div4);
        node.appendChild(div1);

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
