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
            // console.log(value["alim_grp_nom_fr"]);

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
        let i = 0;
        for (let value of data) {
            // if (i != 10)
            $('#choix').append("<li><div>" + value["alim_nom_fr"] + "</div></li>");
            // else
            //     return;
            // ++i;
        }
    }
};

const addFilterchoisi = data => {
    $("#choix > li").remove();
    let i = 0;
    for (let value of data) {
        
            $('#choix').append("<li><div>" + value["alim_nom_fr"] + "</div></li>");
        i = i + 1;
    }
    console.log(i);
}

const choixCates = () => {
    // console.log(document.querySelectorAll("input[name='category']").length);
    let labels = Array.from(document.querySelectorAll("#filtre label"));
    Array.from(document.querySelectorAll("input[type=checkbox]")).forEach(input => {
        // $("input[type=checkbox]").click(function(){

        input.addEventListener("change", function () {
            checkboxOnlyOne(this);
            let clickedInputId = this.getAttribute("id");
            $("#search").keyup(function (event) {
                if (event.keyCode == 13) {
                    searchBox(clickedInputId);
                }})

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
                dataType: "array",
                data: {
                    motSearch: $("#search").val(),
                    filtreChoix: category,
                },
                success: result => {
                    $("#infopers").html("output: "+ result);
                    console.log("lenght :", result);
                    addFilterchoisi(result);
                },
                error: () => {
                    alert("Problem occured in ajax of Sondage.js 4");
                }
            });
    //     }
    // });
}

const startSondage = () => {
    getDefaultCates();
    // getDefaultAliments();
    // choixCates();
    // searchBox();
}

window.addEventListener("DOMContentLoaded", startSondage);