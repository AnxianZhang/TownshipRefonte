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
        },
        error: () => {
            alert("Problem occured in ajax of Sondage.js 1");
        }
    });

    const addFilterCheckBox = data => {
        for (let value of data) {
            console.log(value["alim_grp_nom_fr"]);
            $('#filtre')
                .append("<input type='checkbox' name='category' value=" + value["alim_grp_nom_fr"] + ">")
                .append("<label>" + value["alim_grp_nom_fr"] + "</label></div>")
                .append(`<br>`);
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
            console.log(value["alim_nom_fr"]);
            $('#choix')
                .append("<button>" + value["alim_nom_fr"] + "</button>");
        }
    }
};

const choixCates = () => {
    document.querySelector("input[type=checkbox]").addEventListener("click", () => {
    // $(":checkbox").on("click", () => {
    let url = "./php/filtres.php";
    let data = {
        category: $('input[name=category]').serialize(),
    };
    $.ajax({
        async: true,
        contentType: "application/x-www-form-urlencoded",
        type: "POST",
        url: url,
        dataType: "json",
        data: data,
        success: data => {
            addFilterchoisi(data);
        },
        error: () => {
            alert("Problem occured in ajax of Sondage.js 3");
        }
    });

    const addFilterchoisi = data => {
        alert(value["alim_nom_fr"]);
        $("#choix button").remove();
        for (let value of data) {
            console.log(value["alim_nom_fr"]);
            $('#choix')
                .append("<button>" + value["alim_nom_fr"] + "</button>");
        }
    }
});
};

$(document).ready(getDefaultCates);
$(document).ready(getDefaultAliments);
$(document).ready(choixCates);