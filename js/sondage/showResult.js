$(document).ready(function () {
    showNumberAlimentNutriscoreOfUsers();
    shownumberOfUserUnderAge();
    showNumberOfPersonDrinkAlcohol();
});

const showNumberOfPersonDrinkAlcohol = () =>{
    $.ajax({
        async: true,
        type: "post",
        url: "./php/numberOfPersoneDrinkAlcohol.php",
        success: dataR => {
            // récupération de l'élément canvas
            var ctx = $('#histogramme3');
            // création de l'objet Chart
            let dataRP = JSON.parse(dataR);
            var myChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['+18 alcohol', '-18 alcohol'],
                    datasets: [{
                        data: [
                            dataRP[1].total - dataRP[0].under, 
                            dataRP[0].under,
                        ],
                        backgroundColor: [
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                        ],
                        borderColor: [
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: false,
                    maintainAspectRatio: false
                }
            });
        },
        error: () => {
            alert("Problem occured in ajax of Sondage.js at histo1");
        }
    });
}

const shownumberOfUserUnderAge = () =>{
    $.ajax({
        async: true,
        type: "post",
        url: "./php/numberOfUserUnderAge.php",
        success: dataR => {
            // récupération de l'élément canvas
            var ctx = $('#histogramme2');
            // création de l'objet Chart
            let dataRP = JSON.parse(dataR);
            var myChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['+18', '-18'],
                    datasets: [{
                        data: [
                            dataRP.total - dataRP.under, 
                            dataRP.under,
                        ],
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.5)',
                            'rgba(153, 102, 255, 0.5)',
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: false,
                    maintainAspectRatio: false,
                }
            });
        },
        error: () => {
            alert("Problem occured in ajax of Sondage.js at histo1");
        }
    });
}

const showNumberAlimentNutriscoreOfUsers = () => {
    $.ajax({
        async: true,
        type: "post",
        url: "./php/numberOfAlimentsUser.php",
        success: dataR => {
            // récupération de l'élément canvas
            var ctx = $('#histogramme1');
            // création de l'objet Chart
            let dataRP = JSON.parse(dataR);
            var myChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['0-2', '2-4', '4-6', '6-8', '8-10'],
                    datasets: [{
                        data: [
                            dataRP.num_nutriscore_0_2, 
                            dataRP.num_nutriscore_2_4, 
                            dataRP.num_nutriscore_4_6,
                            dataRP.num_nutriscore_6_8,
                            dataRP.num_nutriscore_8_10,
                        ],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                            'rgba(153, 102, 255, 0.5)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: false,
                    maintainAspectRatio: false
                }
            });
        },
        error: () => {
            alert("Problem occured in ajax of Sondage.js at histo1");
        }
    });
}