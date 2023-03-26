import { AlimentsClick } from './AlimentsClick.js';

const getFood = () => {
    var foods = $("#resultat li div:last-child");
    var result = [];

    for (let pas = 0; pas < foods.length; pas++) {

        result.push(foods[pas].innerHTML);

    }
    return result;
}

const verifLength = () => {
    if ($("#resultat").children().length == 10) {
        $("#choix > li").off("click");
        return;
    }
    
    AlimentsClick.click();
}

const verifForm = () => {
    document.querySelector("button#env").addEventListener("click", () => {
        $.ajax({
            async: true,
            type: "post",

            url: "./php/ResultRegister.php",
            data: {
                tab: getFood(),
                nom: document.querySelector("input[name=nom]").value,
                prenom: document.querySelector("input[name=prenom]").value,
                age: document.querySelector("input[name=age]").value
            },
            success: data => {
                //alert(data);
                if (data == "GG") {
                    $(location).attr("href", "./resultat.html");
                }
                else {
                    alert(data);
                }
            },
            error: () => {
                alert("Problem occured in ajax of Sondage.js at verifForm");
            }
        });
    });
}

const getDefaultCates = () => {
    let url = "./php/getDefaultFiltre.php";
    $.ajax({
        async: true,
        contentType: "application/x-www-form-urlencoded",
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

    const addFilterCheckBox = data => {
        let i = 0;
        for (let value of data) {
            $('#filtre')
                .append("<div><input type='checkbox' name='category' " + "id=" + i + ">" + "<label for=" + i + ">" + value["alim_grp_nom_fr"] + "</label></div>")
                ;
            ++i
        }
    }
};


const checkboxOnlyOne = clickedInput => {
    $("input[type=checkbox]").each(function () {
        $(this).prop("checked", false);
    });
    clickedInput.prop("checked", true);
    $("#search").val("");
}

let clickedInputId;

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

const addEventToSeachBox = () => {
    $("#search").keyup(function (event) {
        if (event.keyCode == 13 && $.trim($(this).val()) != "" && hasOneCheckedBox() && $(this).val() != previousResearch) {
            previousResearch = $(this).val();
            searchBox(clickedInputId);
        }
        if (event.keyCode == 13 && !hasOneCheckedBox()) {
            $('#choix').html("<h2>Veuillez filtrer avant d'éffectuer une recherche</h2>");
        }
    });
}

const removeTips = isRemoved => {
    if (!isRemoved) {
        $("div#choix h2").remove();
    }
}

let previousCkeckedBox = " ";

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
            // console.log(allCategory);

            let data1 = {
                category: allCategory,
            };
            $.ajax({
                async: true,
                contentType: "application/x-www-form-urlencoded",
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
    // });
}

const searchBox = clickedInput => {
    let labels = Array.from(document.querySelectorAll("#filtre label"));
    let category = labels[clickedInput].textContent;

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
            alert("Problem occured in ajax of Sondage.js 4");

        }
    });
    const addChoixAliment = data => {
        $("#choix > li").remove();
        for (let value of data) {
            $('#choix').append("<li><div>" + value["alim_nom_fr"] + "</div></li>");
        }
    }
}

const startSondage = () => {
    AlimentsClick.ereaseButton();
    getDefaultCates();
    addEventToSeachBox();
    verifForm();

    $("#resultat").on("DOMNodeInserted", function (){
        if ($(this).children().length == 10) {
            $("#choix > li").off("click");
        }
    });
}

window.addEventListener("DOMContentLoaded", startSondage);