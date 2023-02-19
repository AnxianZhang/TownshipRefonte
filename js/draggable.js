export class Draggable {
    static myDraggableAndDroppable = () => {
        $("#choix > li").addClass("draggable");
        $(".draggable").draggable({
            cursor: "move",
            containment: "#choixright",
            scroll: true,
            revert: true
        });

        $("#resultat").droppable({
            classes: { "ui-droppable-hover": "ui-state-hover" },
            drop: function (event, ui) {
                let dropped = ui.draggable;
                let droppedOn = $(this);

                $(dropped).detach().css({
                    top: 0,
                    left: 0
                }).appendTo(droppedOn)
                    .addClass("dropped-item fas");

                $("#resultat > li").removeClass("draggable ui-draggable ui-draggable-handle");
            }
        });
    }

    static ereaseButton = () => {
        $("#effacer").on("click", function () {
            $("#resultat > div").appendTo("#choix").removeClass("dropped-item fas fa-times").addClass("draggable ui-draggable ui-draggable-handle");
        });
    }

    static bin = () => {
        $("#poubelle").droppable({
            classes: { "ui-droppable-hover": "ui-state-hover2" },
            drop: function (event, ui) {
                let dropped = ui.draggable;
                let droppedOn = $("#choix");
                $(dropped).detach().css({ top: 0, left: 0 }).appendTo(droppedOn).removeClass("dropped-item fas fa-times").addClass("draggable ui-draggable ui-draggable-handle");
            }
        });
    }
}