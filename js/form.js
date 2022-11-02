$(document).ready(function () {
    $("input").on("input", function () {
        $(this).addClass("actif");
        if ($(this).val() == "")
            $(this).removeClass("actif");
    });
});