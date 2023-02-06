$(document).ready(function () {
    $(".draggable").draggable({ cursor: "move", containment: "#choixright", scroll: true, revert: true });


    $("#resultat").droppable({
        classes: { "ui-droppable-hover": "ui-state-hover" },
        drop: function (event, ui) {
            let dropped = ui.draggable;
            let droppedOn = $(this);
            $(dropped).detach().css({ top: 0, left: 0 }).appendTo(droppedOn).addClass("dropped-item fas fa-times");
            $("#resultat > div").draggable("disable");
            $("#resultat > div").removeClass("draggable ui-draggable ui-draggable-handle");

        }
    });

    $("#effacer").on("click", function () {
        $("#resultat > div").draggable("enable");
        $("#resultat > div").appendTo("#choix").removeClass("dropped-item fas fa-times").addClass("draggable ui-draggable ui-draggable-handle");

    });

    $(".draggable").on("click", function () {
        alert("caca");
        /*$(this).draggable("enable");
        $(this).appendTo("#choix").removeClass("dropped-item fas fa-times").addClass("draggable ui-draggable ui-draggable-handle");*/
    });
});
