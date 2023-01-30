$(document).ready(function () {
    $(".draggable").draggable({ cursor: "move", containment: "#choixright", scroll: true, revert: true });

    $("#resultat").droppable({
        drop: function (event, ui) {
            let dropped = ui.draggable;
            let droppedOn = $(this);
            $(dropped).detach().css({ top: 0, left: 0 }).appendTo(droppedOn).addClass("dropped-item fas fa-times");
        }
    });
});



