$(window).ready(() => {
    const menuButton = $("#menu-box");
    $("#button-menu").on("click", () => {
        if (menuButton.hasClass("buttonTriggered"))
            menuButton.removeClass("buttonTriggered");
        else
            menuButton.addClass("buttonTriggered");
    });
});
  
$(window).on("resize", () => {
    if ($(window).width() > 1150 && $("#menu-box .blob").eq(0).css("visibility") == "visible")
        $("#button-menu").click();
});
  