const getFood = () => {
    var foods = $("#resultat li div:last-child");
    var result = [];

    for (let pas = 0; pas < foods.length; pas++) {
        result.push(foods[pas].innerHTML);

    }
    
    return result;
}

const verifForm = () => {
    $('button#env').on('click', () => {
        $.ajax({
            async: true,
            type: "post",
            url: "./php/ResultRegister.php",
            data: {
                tab: getFood(),
                nom: $("input[name=nom]").val(),
                prenom: $("input[name=prenom]").val(),
                age: $("input[name=age]").val()
            },
            success: data => {
                if (data == "GG") {
                    $(location).attr("href", "./resultat.html");
                }
                else {
                    alert(data);
                }
            },
            error: () => {
                alert("Problem occurred in ajax of Sondage.js at verifForm");
            }
        });
    });
}

$("ready", () =>{
    verifForm();
});