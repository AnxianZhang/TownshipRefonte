$(window).ready(() =>{
    // $(window).width() >= 1150
    const menuButton = $("#menu-box");
    $("#button-menu").on("click", () =>{
        alert($(window).width())
        if (menuButton.hasClass("buttonTriggered"))
            menuButton.removeClass("buttonTriggered");
        else
            menuButton.addClass("buttonTriggered");
    });
});