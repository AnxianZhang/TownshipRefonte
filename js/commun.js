$(window).ready(() =>{
    const menuButton = $("#menu-box");
    $("#button-menu").on("click", () =>{
        if (menuButton.hasClass("buttonTriggered"))
            menuButton.removeClass("buttonTriggered");
        else
            menuButton.addClass("buttonTriggered");
    });
});