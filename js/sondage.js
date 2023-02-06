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
                alert(data);
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
            $('#choix').append("<li><div>" + value["alim_nom_fr"] + "</div></li>");
        }
    }
};

const choixCates = () => {
    // console.log(document.querySelectorAll("input[name='category']").length);
    let labels = Array.from(document.querySelectorAll("#filtre label"));
    Array.from(document.querySelectorAll("input[type=checkbox]")).forEach(input => {
        // $("input[type=checkbox]").click(function(){

        input.addEventListener("change", function () {
            checkboxOnlyOne(this);
            let url = "./php/filtres.php";
            let allCategory = labels[this.getAttribute("id")].textContent;
            console.log(allCategory);
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
                    // else
                    //     console.log(data);


                },
                error: () => {
                    alert("Problem occured in ajax of Sondage.js 3");
                }
            });

            const addFilterchoisi = data => {
                $("#choix > li").remove();
                for (let value of data) {
                    {
                        $('#choix').append("<li><div>" + value["alim_nom_fr"] + "</div></li>");
                    }
                }
            }
        });
    });
}

const startSondage = () => {
    getDefaultCates();
    // getDefaultAliments();
    // choixCates();
    verifForm();
}

window.addEventListener("DOMContentLoaded", startSondage);