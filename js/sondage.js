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
        for (let value of data) {
            // console.log(value["alim_grp_nom_fr"]);
            $('#filtre')
                .append("<div><input type='checkbox' name='category' id=" + value["alim_grp_nom_fr"] + ">" + "<label for=" + value["alim_grp_nom_fr"] + ">" + value["alim_grp_nom_fr"] + "</label></div>")
                // .append(`<br>`)
                ;
        }
    }
};

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
            // console.log(value["alim_nom_fr"]);
            $('#choix')
                .append("<button>" + value["alim_nom_fr"] + "</button>");
        }
    }
};

const choixCates = () => {
    // console.log(document.querySelectorAll("input[name='category']").length);
    Array.from(document.querySelectorAll("input[type=checkbox]")).forEach(input => {
// $("input[type=checkbox]").click(function(){
        console.log('xt');
        input.addEventListener("click", () => {
            
            // alert($("input[name='category']").serializeArray());
            // $(":checkbox").on("click", () => {
            let url = "./php/filtres.php";
            let allCategory = document.querySelectorAll("#filtre label");
            // console.log(allCategory.length);
            // allCategory.forEach(xt =>{
            //     // console.log(xt.textContent);
            // });
            allCategory
            let data1 = {
                category: allCategory
            };
            $.ajax({
                async: true,
                contentType: "application/x-www-form-urlencoded",
                type: "POST",
                url: url,
                dataType: "json",
                data: data1,
                success: data => {
                    // console.log(data);
                    addFilterchoisi(data);
                },
                error: () => {
                    alert("Problem occured in ajax of Sondage.js 3");
                }
            });

            const addFilterchoisi = data => {
                // alert(value["alim_nom_fr"]);<
                $("#choix button").remove();
                for (let value of data) {
                    console.log(value["alim_nom_fr"]);
                    $('#choix')
                        .append("<button>" + value["alim_nom_fr"] + "</button>");
                }
            }
        });
    });
}

const startSondage = () => {
    getDefaultCates();
    getDefaultAliments();
    // choixCates();
}

window.addEventListener("DOMContentLoaded", startSondage);