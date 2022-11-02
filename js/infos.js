const defaultWidth = "30em", defaultHeight = "3em";
let auto, tarifs, compteur, conseil;
let allSubBox;

const initToDefault = () => {
    allSubBox.on("mouseleave", () => {
        allSubBox.css("width", defaultWidth);
        allSubBox.css("height", defaultHeight);
    });
}

const addHoverEventToInfos = () => {
    initToDefault();
    auto.on("mouseenter", () => {
        auto.css("width", "38em");
        auto.css("height", "13em");

        tarifs.css("width", "22em");
        tarifs.css("height", "13em");
        compteur.css("width", "38em");
        conseil.css("width", "22em");

        conseil.css("height", "6em");
        compteur.css("height", "6em");
        conseil.css("height", "3em");
        compteur.css("height", "3em");
    });

    tarifs.on("mouseenter", () => {
        tarifs.css("width", "38em");
        tarifs.css("height", "13em");

        auto.css("width", "22em");
        auto.css("height", "13em");
        conseil.css("width", "38em");
        compteur.css("width", "22em");

        conseil.css("height", "6em");
        compteur.css("height", "6em");
        conseil.css("height", "3em");
        compteur.css("height", "3em");
    });

    compteur.on("mouseenter", () => {
        compteur.css("width", "38em");
        compteur.css("height", "13em");

        conseil.css("width", "22em");
        conseil.css("height", "13em");
        auto.css("width", "38em");
        tarifs.css("width", "22em");

        tarifs.css("height", "6em");
        auto.css("height", "6em");
        tarifs.css("height", "3em");
        auto.css("height", "3em");
    });

    conseil.on("mouseenter", () => {
        conseil.css("width", "38em");
        conseil.css("height", "13em");

        compteur.css("width", "22em");
        compteur.css("height", "13em");
        tarifs.css("width", "38em");
        auto.css("width", "22em");

        tarifs.css("height", "6em");
        auto.css("height", "6em");
        tarifs.css("height", "3em");
        auto.css("height", "3em");
    });
}

const removeEvent = item => {
    item.off("mouseenter");
    item.mouseleave();
    item.off("mouseleave");
    item.css("width", "auto");
}

const initInfos = () => {
    auto = $("#auto");
    tarifs = $("#tarifs");
    compteur = $("#compteur");
    conseil = $("#conseil");
    allSubBox = $(".sub-content-box");

    if ($(window).width() > 1001)
        addHoverEventToInfos();
    else {
        allSubBox.css("height", "10em");
    }

    $(window).on("resize", () => {
        if ($(window).width() < 1001) {
            removeEvent(auto);
            removeEvent(tarifs);
            removeEvent(compteur);
            removeEvent(conseil);
            allSubBox.css("width", "auto");
            allSubBox.css("height", "10em");
        }
        else {
            addHoverEventToInfos();
            allSubBox.css("height", "3em");
            allSubBox.css("width", defaultWidth);
        }
    });
}

$(window).ready(initInfos);