import { AlimentsClick } from './AlimentsClick.js';

/**
 * Verifis si le nombre de li se trouvant dans
 * la div #resultat et inferieur a 10
 * @returns 
 */
const verifLength = () => {
    if ($("#resultat").children().length == 10) {
        $("#choix > li").off("click");
        return;
    }

    AlimentsClick.click();
}

/**
 * Initialise les check box des categorie d'aliment
 */
const getDefaultCates = () => {
    let url = "./php/getDefaultFiltre.php";
    $.ajax({
        async: true,
        type: "POST",
        url: url,
        dataType: "json",
        success: data => {
            addFilterCheckBox(data);
            choixCates();
        },
        error: () => {
            alert("Problem occured in ajax of Sondage.js 1");
        }
    });

    /**
     * Met en visuel les check box sur la page
     * @param {*} data - les categorie d'aliment retourne par la requete ajax
     */
    const addFilterCheckBox = data => {
        let i = 0;
        for (const value of data) {
            $('#filtre')
                .append("<div><input type='checkbox' name='category' " + "id=" + i + ">"
                 + "<label for=" + i + ">" + value["alim_grp_nom_fr"] + "</label></div>");
            ++i;
        }
    }
};

/**
 * Rend qu'un seul checkbox active, lorsqu'un est coche, les autres se decochent
 * @param {String} clickedInput 
 */
const checkboxOnlyOne = clickedInput => {
    $("input[type=checkbox]").each(function () {
        $(this).prop("checked", false);
    });

    clickedInput.prop("checked", true);
    $("#search").val("");
}

let clickedInputId;

/**
 * Verifis s'il y a au moins une checkbox qui a ete coche
 * @returns vrais si c'est le cas, sinon faux
 */
const hasOneCheckedBox = () => {
    let is = false;

    $("input[type=checkbox]").each(function () {
        if ($(this).is(":checked")) {
            is = true;
        }
    });

    return is;
}

let previousResearch = " ";

/**
 * Met a disposition la barre de recherche
 */
const addEventToSeachBox = () => {
    $("#search").keyup(function (event) {
        if (event.keyCode == 13 && $.trim($(this).val()) != "" && hasOneCheckedBox() && $(this).val() != previousResearch) {
            previousResearch = $(this).val();
            searchBox(clickedInputId);
        }

        if (event.keyCode === 13 && !hasOneCheckedBox()) {
            $('#choix').html("<h2>Veuillez filtrer avant d'éffectuer une recherche</h2>");
        }
    });
}
/**
 * Enleve le message 'Veuillez filtrer avant d'éfectuer une recherche'
 * lorsqu'une checkbox est clique
 * @param {boolean} isRemoved 
 */
const removeTips = isRemoved => {
    if (!isRemoved) {
        $("div#choix h2").remove();
    }
}

let previousCkeckedBox = " ";

/**
 * Charge tous les aliments correspondant a la categoris choisis via les checkbox
 */
const choixCates = () => {
    let isRemoved = false;
    let labels = $("#filtre label").toArray();

    $("input[type=checkbox]").on("change", function () {
        previousResearch = " "; // init the var, because in another section we can make the same research with the same string
        removeTips(isRemoved);
        checkboxOnlyOne($(this));
        clickedInputId = $(this).attr("id");

        if (previousCkeckedBox != labels[clickedInputId].textContent) {
            previousCkeckedBox = labels[clickedInputId].textContent;
            let url = "./php/filtres.php";
            let allCategory = labels[clickedInputId].textContent;
            let data1 = {
                category: allCategory,
            };

            $.ajax({
                async: true,
                type: "POST",
                url: url,
                dataType: "json",
                data: data1,
                success: data => {
                    addFilterchoisi(data);
                    verifLength();
                },
                error: () => {
                    alert("Problem occured in ajax of Sondage.js 3");
                }
            });

            const addFilterchoisi = data => {
                $("#choix > li").remove();
                for (let value of data) {
                    $('#choix').append("<li><div>" + value["alim_nom_fr"] + "</div></li>");
                }
            }
        }
    });
}

/**
 * Charge les donnees correspondant a la chaine entre dans la barre de cherche,
 * pour une categorie d'aliment choisis
 * @param {String} clickedInput - la categorie choisis
 */
const searchBox = clickedInput => {
    let labels = Array.from($("#filtre label"));
    let category = $(labels[clickedInput]).text();

    $.ajax({
        async: true,
        contentType: "application/x-www-form-urlencoded",
        type: "POST",
        url: "./php/searchBox.php",
        dataType: "json",
        data: {
            motSearch: $("#search").val(),
            filtreChoix: category,
        },
        success: result => {
            addChoixAliment(result);
            verifLength();
        },
        error: () => {
            alert("Problem occurred in ajax of Sondage.js 4");
        }
    });

    const addChoixAliment = data => {
        $("#choix > li").remove();
        for (let value of data) {
            $('#choix').append("<li><div>" + value["alim_nom_fr"] + "</div></li>");
        }
    };
};

/**
 * Initialise tout les evenements de la page de sondage
 */
const startSondage = () => {
    AlimentsClick.ereaseButton();
    getDefaultCates();
    addEventToSeachBox();
    // verifForm();

    $("#resultat").on("DOMNodeInserted", function () {
        if ($(this).children().length == 10) {
            $("#choix > li").off("click");
        }
    });
}

$(document).ready(() => {
    startSondage();
});