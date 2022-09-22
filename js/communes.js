const countriesKey = new Map();
let countries;
let polygons;

const setCountriesKey = () =>{
    let idx = 0;
    countries.forEach(countrie => {
        countriesKey.set(countrie.textContent, idx);
        ++idx;
    });
}

const addEvent = () =>{
    countries.forEach(countrie => {
        countrie.addEventListener("mouseover", () => {
          polygons[countriesKey.get(countrie.textContent)].classList.add("change-map-color");
        });
        countrie.addEventListener("mouseleave", () => {
          polygons[countriesKey.get(countrie.textContent)].classList.remove("change-map-color");
        });
    });
}

const start = () =>{
    setCountriesKey();
    addEvent();
}

const init = () => {
    countries = Array.from(document.querySelectorAll(".ville-name"));
    polygons = Array.from(document.querySelectorAll(".casbt"));

    if (countries == null || polygons == null) {
        alert("null");
    }
    start();
}

window.addEventListener("DOMContentLoaded", init);