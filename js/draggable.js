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

    static changeCursor = (cursorname) => {
        $(".supprimerLi").style.cursor = cursorname;
    }

    static ereaseIndividualButton = () => {
        $(".supprimerLi").click(function () {
            let caca = $(this).parent().parent().html();
            $(this).parent().remove();
            $('#choix').append(caca);
            $(" #choix > li > .supprimerLi").remove();
            $("#choix > li").removeAttr('style');
            Click.click();
        });
    }

    static click = () => {
        var liADeplacer = $("#choix > li");
        liADeplacer.css('cursor', 'pointer');
        liADeplacer.click(function () {
            var nouvelEmplacement = $("#resultat");
            $(this).appendTo(nouvelEmplacement).css("display", "flex");
            if (!$(this).find('div:contains("X")').length) {
                $("<div class='supprimerLi'>X</div>").prependTo($(this)).css("flex-direction", "flex-start");
                $('.supprimerLi').css('cursor', 'pointer');
            }
            Click.ereaseIndividualButton();
            $(this).off("click");
        });

        function adjustHeight() {
            const height = 100 + ($('#resultat > li').length * 40); // hauteur minimale + hauteur de chaque élément
            $('#resultat').height(height);
        }
        adjustHeight();
        $('#resultat').on('DOMNodeInserted DOMNodeRemoved', adjustHeight);
    }

    static ereaseButton = () => {
        $('#effacer').css('cursor', 'pointer');
        $('#env').css('cursor', 'pointer');
        $("#effacer").click(function () {
            let caca = $("#resultat > li");
            $('#choix').append(caca);
            $(" #choix > li > .supprimerLi").remove();
            $("#choix > li").removeAttr('style');
            Click.click();
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