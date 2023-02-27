
function getFood() {
    var foods = $("#resultat li div:last-child");
    var result= [] ;

    for (let pas = 0; pas < foods.length; pas++) {

        result.push(foods[pas].innerHTML) ;

    }
    return result;
}

$(document).ready(function(){

   $("#env").on("click",function(){
       //alert(getFood()[0]);
       $.ajax({
           url : "./php/ResultRegister.php",
           type:  "post",

           data : {tab : getFood()},
           success: data => {
               //$("#choix").html(data);

               alert( "gg"+ data);

           },
           error: () => {
               alert("Problem occured in ajax of ton pere anxian ");
           }
       })
   });





});


