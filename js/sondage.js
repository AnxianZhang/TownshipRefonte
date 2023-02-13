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
                if(data =="GG"){
                buttonEnv();}
                else{
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
    document.querySelectorAll("input[type=checkbox]").forEach(input => {
        input.checked = false;
    });
    clickedInput.checked = true;
    $("#search").val("");
}

const getDefaultAliments = () => {
    let url = "./php/getDefaultAliment.php";
    $.ajax({
        async: true,
        contentType: "application/x-www-form-urlencoded",
        type: "POST",
        url: url,
        dataType: "json",
        success: data => {
            addChoixAliment(data);
        },
        error: () => {
            alert("Problem occured in ajax of Sondage.js 2");
        }
    });

    const addChoixAliment = data => {
        for (let value of data) {
            $('#choix').append("<li><div>" + value["alim_nom_fr"] + "</div></li>");
        }
    }
};

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

const addEventToSeachBox = () => {
    $("#search").keyup(function (event) {
        if (event.keyCode == 13 && $.trim($(this).val()) != "" && hasOneCheckedBox()) {
            console.log($(this).val());
            searchBox(clickedInputId);
        }
        if (event.keyCode == 13 && !hasOneCheckedBox()) {
            $('#choix').html("<li>" + "filtrer avant rechercher" + "</li>");
        }
    });
}

const choixCates = () => {
    let previousResearch = " ";
    // console.log(document.querySelectorAll("input[name='category']").length);
    let labels = Array.from(document.querySelectorAll("#filtre label"));
    Array.from(document.querySelectorAll("input[type=checkbox]")).forEach(input => {
        // $("input[type=checkbox]").click(function(){

        input.addEventListener("change", function () {
            checkboxOnlyOne(this);
            clickedInputId = this.getAttribute("id");
            // $("#search").keyup(function (event) {
            //     if (event.keyCode == 13) {
            //         console.log($(this).val());
            //         searchBox(clickedInputId);
            //     }
            // });

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
            }
        });
    });
}

const searchBox = clickedInput => {
    // $("#search").keyup(function (event) {
    //     if (event.keyCode == 13) {
    //TODO
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
    })

}

const startSondage = () => {
    getDefaultCates();
    addEventToSeachBox();
    // getDefaultAliments();
    // choixCates();
    verifForm();
    // buttonEnv();
    // searchBox();
}

window.addEventListener("DOMContentLoaded", startSondage);