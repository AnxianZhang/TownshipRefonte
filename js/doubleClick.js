let objectToDouble;
let objectToDoubleMap = new Map();
const homeLinks = [
    "https://www.lesilesdeguadeloupe.com/tourisme/fr-ca/activites/6728-parc-floral",
    "https://www.lesilesdeguadeloupe.com/tourisme/fr-fr/activites/5946-archipel-plongee---plongee-adulte?destination=Territoire+Grand+Sud+Cara%c3%afbe",
    "https://www.lesilesdeguadeloupe.com/tourisme/fr-fr/activites/5420-zoo-de-guadeloupe-parc-des-mamelles---pass-visite-a-partir-de-13-ans"
];

const communesLinkts = [
    "https://ville-baillif.fr/",
    "https://ville-basseterre.fr/",
    "https://www.ville-bouillante.fr/",
    "https://capesterrebelleeau.fr/",
    "http://ville-gourbeyre.fr/",
    "https://www.saint-claude.fr/",
    "https://www.terredebas.com/",
    "https://terredehaut.org/",
    "https://villetroisrivieres.fr/",
    "https://www.guadeloupe.fr/basse-terre/vieux-fort/",
    "https://guadeloupe.net/vieux-habitants"
];

const addDoubleClick = () => {
    objectToDouble.forEach(object => {
        object.addEventListener("dblclick", () => {
            if (objectToDouble.length == 3) // the 3 means there are 3 images on the home page
                window.open(homeLinks[objectToDoubleMap.get(object)], "_blank");
            else
                window.open(communesLinkts[objectToDoubleMap.get(object)], "_blank");
        });
    });
}

const addMyEvent = () => {
    let idx = 0;
    objectToDouble.forEach(object => {
        objectToDoubleMap.set(object, idx);
        ++idx;
    });
    addDoubleClick();
}

const myStart = () => {
    addMyEvent();
}

const myDoubleClickInit = () => {
    objectToDouble = Array.from(document.querySelectorAll(".doubleClick"));
    myStart();
}

window.addEventListener("DOMContentLoaded", myDoubleClickInit);