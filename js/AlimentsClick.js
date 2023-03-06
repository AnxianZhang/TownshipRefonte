export class AlimentsClick {
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

    static click = () => {
        let liADeplacer = $("#choix > li");
        // liADeplacer.css('cursor', 'pointer');
        liADeplacer.on("click", function () {
            liADeplacer.css('cursor', 'auto');
            $(this).off("click");
            let nouvelEmplacement = $("#resultat");
            $(this).appendTo(nouvelEmplacement).css("display", "flex");
            if (!$(this).find('div:contains("✘")').length) {
                $("<div class='supprimerLi'>✘</div>")
                    .prependTo($(this))
                    .css("flex-direction", "flex-start")
                    .css('cursor', 'pointer')
                    .on("click", function () {
                        // console.log($(this).parent().html());
                        let aliment = $(this).parent().html(); // va chercher la <li>
                        // console.log(aliment);
                        $(this).parent().remove();
                        $('#choix').append("<li>" + aliment + "</li>");
                        $("#choix > li > .supprimerLi").remove();
                        $("#choix > li").removeAttr('style');
                        AlimentsClick.click();
                    });
            }
            // Click.ereaseIndividualButton();
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
            let aliments = $("#resultat > li");
            $('#choix').append(aliments);
            $(" #choix > li > .supprimerLi").remove();
            $("#choix > li").removeAttr('style');
            AlimentsClick.click();
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