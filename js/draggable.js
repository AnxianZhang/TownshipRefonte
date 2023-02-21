export class Click {
    // static myDraggableAndDroppable = () => {
    //     $("#choix > li").addClass("draggable");
    //     $(".draggable").draggable({
    //         cursor: "move",
    //         containment: "#choixright",
    //         scroll: true,
    //         revert: true
    //     });

    //     $("#resultat").droppable({
    //         classes: { "ui-droppable-hover": "ui-state-hover" },
    //         drop: function (event, ui) {
    //             let dropped = ui.draggable;
    //             let droppedOn = $(this);

    //             $(dropped).detach().css({
    //                 top: 0,
    //                 left: 0
    //             }).appendTo(droppedOn)
    //                 .addClass("dropped-item fas");

    //             $("#resultat > li").removeClass("draggable ui-draggable ui-draggable-handle");
    //         }
    //     });
    // }

    static click = () => {
        var liADeplacer = $("#choix > li");
        liADeplacer.click(function(){
            var nouvelEmplacement = $("#resultat");
            liADeplacer.appendTo(nouvelEmplacement);
            $("<span class='supprimerLi'>X</span>").appendTo(liADeplacer);
        });
    }
    static ereaseIndividualButton = () => {
        $(document).on("click", ".supprimerLi", function() {
            $("#resultat > li").removeClass("supprimerLi");
            var liASupprimer = $(this).parent();
            liASupprimer.appendTo("#choix");
        });
    }

    static ereaseButton = () => {
        $("#effacer").click(function () {
            $("#resultat > li").removeClass("supprimerLi");
            $("#resultat > li").appendTo("#choix");
        });
    }

    // static bin = () => {
    //     $("#poubelle").droppable({
    //         classes: { "ui-droppable-hover": "ui-state-hover2" },
    //         drop: function (event, ui) {
    //             let dropped = ui.draggable;
    //             let droppedOn = $("#choix");
    //             $(dropped).detach().css({ top: 0, left: 0 }).appendTo(droppedOn).removeClass("dropped-item fas fa-times").addClass("draggable ui-draggable ui-draggable-handle");
    //         }
    //     });
    // }
}