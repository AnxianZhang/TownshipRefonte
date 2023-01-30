const getDefaultCates = () => {
    let url = "./php/creerAutoFiltre.php";
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
            alert("Problem occured in ajax of Map.js");
        }
    });

    const addFilterCheckBox = data => {
        for (let value of data) {
            console.log(value["alim_grp_nom_fr"]);
            $('#filtre')
                .append("<input type='checkbox' name='choix' value=" + value["alim_grp_nom_fr"] + ">")
                .append("<label>" + value["alim_grp_nom_fr"] + "</label></div>")
                .append(`<br>`);
        }
    }
};

$(document).ready(getDefaultCates);