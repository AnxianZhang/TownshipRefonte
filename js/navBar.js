let myMenuButton;
let blobs = [];

const addEventToMenu = () => {
    const menuBox = $("#menu-box");
    menuBox.on("click", () => {
        if (menuBox.hasClass("buttonTriggered"))
            menuBox.removeClass("buttonTriggered");
        else
            menuBox.addClass("buttonTriggered");
    });
}

const startEvent = () => {
    myMenuButton = $("#button-menu");
    blobs[0] = $("#blob-1");
    blobs[1] = $("#blob-2");
    blobs[2] = $("#blob-3");
    blobs[3] = $("#blob-4");
    blobs[4] = $("#blob-5");
    blobs[5] = $("#blob-6");

    addEventToMenu();
}

const myInit = () => {
    startEvent();
}

$(window).on("resize", () => {
    const enableBlobTransition = () => {
        for (let i = 0; i < blobs.length; ++i)
            blobs[i].css("transition", "all .2s ." + (i + 1) + "s ease-in-out");
    }

    const disablBlobTransistion = () => {
        for (let i = 0; i < blobs.length; ++i)
            blobs[i].css("transition", "none");
    }

    if ($(window).width() >= 1150 && blobs[0].css("visibility") == "visible") {
        disablBlobTransistion();
        myMenuButton.click();
    }
    else
        enableBlobTransition();
});

$(window).ready(myInit);