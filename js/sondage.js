import { AlimentsClick } from './AlimentsClick.js';

const verifForm = () => {
    document.querySelector("button#env").addEventListener("click", () => {
        $.ajax({
            async: true,
            type: "post",

            url: "./php/verifPersonalData.php",
            data: {
                nom: document.querySelector("input[name=nom]").value,
                prenom: document.querySelector("input[name=prenom]").value,
                age: document.querySelector("input[name=age]").value
            },
            success: data => {
                //alert(data);
                if (data == "GG") {
                    buttonEnv();
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

// const getDefaultAliments = () => {
//     let url = "./php/getDefaultAliment.php";
//     $.ajax({
//         async: true,
//         contentType: "application/x-www-form-urlencoded",
//         type: "POST",
//         url: url,
//         dataType: "json",
//         success: data => {
//             addChoixAliment(data);
//         },
//         error: () => {
//             alert("Problem occured in ajax of Sondage.js 2");
//         }
//     });

//     const addChoixAliment = data => {
//         for (let value of data) {
//             $('#choix').append("<li><div>" + value["alim_nom_fr"] + "</div></li>");
//         }
//     }
// };

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
            console.log($(this).val());
            searchBox(clickedInputId);
        }
        if (event.keyCode == 13 && !hasOneCheckedBox()) {
            $('#choix').html("<h2>Veuillez filtrer avant d'éffectuer une recherche</h2>");
        }
        // else {
        //     $('#choix').html("<li>" + "filtrer avant rechercher" + "</li>");
        // }
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
    // console.log(document.querySelectorAll("input[name='category']").length);
    // let labels = Array.from(document.querySelectorAll("#filtre label"));
    let labels = $("#filtre label").toArray();
    // Array.from(document.querySelectorAll("input[type=checkbox]")).forEach(input => {
    // $("input[type=checkbox]").click(function(){
    $("input[type=checkbox]").on("change", function () {
        previousResearch = " "; // init the var, because in another section we can make the same research with the same string
        removeTips(isRemoved);
        // $("#choix").append("<li><div>" + "aze"+ "</div></li>");
        // $("#choix li").addClass("draggable");
        checkboxOnlyOne($(this));
        clickedInputId = $(this).attr("id");
        // console.log($(this).attr("id"));
        // console.log($("#filtre label").toArray()[$(this).attr("id")].textContent);
        // $("#search").keyup(function (event) {
        //     if (event.keyCode == 13) {
        //         console.log($(this).val());
        //         searchBox(clickedInputId);
        //     }
        // });
        // console.log(previousCkeckedBox);
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
                    // $(".ligne").html(data);
                    // if(data!=null)
                    addFilterchoisi(data);
                    AlimentsClick.click();
                    // Click.ereaseIndividualButton();
                    //searchBox(data);
                    // else
                    // $("#infopers").html(data);
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
                // $("#choix > li").addClass("draggable");
            }
        }
    });
    // });
}

const searchBox = clickedInput => {
    // $("#search").keyup(function (event) {
    //     if (event.keyCode == 13) {
    //TODO
    // console.log("hola qetal");
    let labels = Array.from(document.querySelectorAll("#filtre label"));
    let category = labels[clickedInput].textContent;
    // console.log("input:", motS,", ", category);            
    // console.log("cat = " + category);
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
            AlimentsClick.click();

            // Draggable.myDraggableAndDroppable();
            // $("#infopers").html("output: " + result);
            // console.log("lenght :", result);
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

const buttonEnv = () => {
    $("#env").click(function () {
        $(location).attr("href", "./resultat.html")
    });
}

const startSondage = () => {
    AlimentsClick.ereaseButton();
    //Click.bin();

    getDefaultCates();
    addEventToSeachBox();
    // getDefaultAliments();
    // choixCates();
    verifForm();
    // buttonEnv();
    // searchBox();
    //$("#choix").append("<li><div>" + "X" + "</div></li>"); // ok ça
}

window.addEventListener("DOMContentLoaded", startSondage);