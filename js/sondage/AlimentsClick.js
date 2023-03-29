export class AlimentsClick {
    static changeCursor = (cursorname) => {
        $(".supprimerLi").style.cursor = cursorname;
    }

    static click = () => {
        let liADeplacer = $("#choix > li");
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
                        let aliment = $(this).parent().html(); // va chercher la <li>
                        $(this).parent().remove();
                        $('#choix').append("<li>" + aliment + "</li>");
                        $("#choix > li > .supprimerLi").remove();
                        $("#choix > li").removeAttr('style');
                        AlimentsClick.click();
                    });
            }
        });

        function adjustHeight() {
            const height = 40 + ($('#resultat > li').length * 40); // hauteur minimale + hauteur de chaque élément
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
}