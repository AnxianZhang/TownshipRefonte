<?php
function sendNumberAlimentNutriscoreOfUsers(){
    require("connexionBD.php");
    $sql = "SELECT
                SUM(CASE WHEN nutriscore BETWEEN 0 AND 2 THEN 1 ELSE 0 END) AS num_nutriscore_0_2,
                SUM(CASE WHEN nutriscore BETWEEN 2 AND 4 THEN 1 ELSE 0 END) AS num_nutriscore_2_4,
                SUM(CASE WHEN nutriscore BETWEEN 4 AND 6 THEN 1 ELSE 0 END) AS num_nutriscore_4_6,
                SUM(CASE WHEN nutriscore BETWEEN 6 AND 8 THEN 1 ELSE 0 END) AS num_nutriscore_6_8,
                SUM(CASE WHEN nutriscore BETWEEN 8 AND 10 THEN 1 ELSE 0 END) AS num_nutriscore_8_10
            FROM ((utilisateur U INNER JOIN sondage S ON U.Id_User = S.Id_User)
            INNER JOIN resultat R ON S.Id_sondage = R.Id_sondage)
            INNER JOIN aliments A ON A.alim_code = R.Id_Aliment;";

    try {
        $commande = $pdo->prepare($sql);

        if ($commande->execute()){
            $result = $commande->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($result[0]);
        }
    }catch(PDOException $e){
        echo utf8_encode("Echec de la requete SQL dans creerAutoAliment" . $e->getMessage() . "\n");
        die();
    }
}

sendNumberAlimentNutriscoreOfUsers();