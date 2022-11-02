const countriesKey = new Map();
const polygonsKey = new Map();

let countries;
let polygons;

const setCountriesKey = () => {
    let idx = 0;
    countries.forEach(countrie => {
        countriesKey.set(countrie.textContent, idx);
        polygonsKey.set(polygons[idx], idx);
        ++idx;
    });
}

const toCountries = () => {
    countries.forEach(countrie => {
        countrie.addEventListener("mouseover", () => {
            polygons[countriesKey.get(countrie.textContent)].classList.add("change-map-color");
        });
        countrie.addEventListener("mouseleave", () => {
            polygons[countriesKey.get(countrie.textContent)].classList.remove("change-map-color");
        });
    });
}

const toPolygons = () => {
    let countrieLinks = Array.from(document.querySelectorAll(".ville-name a"));
    polygons.forEach(polygon => {
        polygon.addEventListener("mouseover", () => {
            countrieLinks[polygonsKey.get(polygon)].classList.add("triggered");
        });
        polygon.addEventListener("mouseleave", () => {
            countrieLinks[polygonsKey.get(polygon)].classList.remove("triggered");
        });
    });
}

const addEvent = () => {
    toCountries();
    toPolygons();
}

const start = () => {
    setCountriesKey();
    addEvent();
}

const init = () => {
    countries = Array.from(document.querySelectorAll(".ville-name"));
    polygons = Array.from(document.querySelectorAll(".casbt"));

    if (countries == null || polygons == null)
        alert("null");

    start();
}

window.addEventListener("DOMContentLoaded", init);