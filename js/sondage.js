const getDefaultCates = () => {
    let url = "./PHP/creerAutoFiltre.php";
    $.ajax({
        async: true,
        contentType: "application/x-www-form-urlencoded",
        type: "POST",
        url: url,
        dataType: "json",
        success: data => {
            CreerFilter(data);
        },
        error: () => {
            alert("Problem occured in ajax of Map.js");
        }
    });

    const CreerFilter = data => {
        var list = data;
        for (var value of list) {
            $('#filtre')
                .append(`<input type="checkbox" id="${value}" name="choix" value="${value}">`)
                .append(`<label for="${value}">${value}</label></div>`)
                .append(`<br>`);
        }



    }
};

$(document).ready(getDefaultCates);