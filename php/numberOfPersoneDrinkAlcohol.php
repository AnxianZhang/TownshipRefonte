<?php
function numberOfPersoneDrinkAlcohol(){
    require("connexionBD.php");
    $sqlUnder = "SELECT COUNT(DISTINCT utilisateur.Id_User) as under
            FROM utilisateur
            JOIN sondage ON utilisateur.Id_User = sondage.Id_User
            JOIN resultat ON sondage.Id_sondage = resultat.Id_sondage
            JOIN aliments ON resultat.Id_Aliment = aliments.alim_code
            WHERE aliments.alim_nom_fr LIKE '%alcool%' AND utilisateur.Age < 18;";
    $sqlTotal = "SELECT COUNT(DISTINCT utilisateur.Id_User) as total
                FROM utilisateur
                JOIN sondage ON utilisateur.Id_User = sondage.Id_User
                JOIN resultat ON sondage.Id_sondage = resultat.Id_sondage
                JOIN aliments ON resultat.Id_Aliment = aliments.alim_code
                WHERE aliments.alim_ssgrp_nom_fr LIKE '%alcool%';";

    try {
        $under;
        $commande = $pdo->prepare($sqlUnder);
        $commande2 = $pdo->prepare($sqlTotal);

        if ($commande->execute()){
            $result = $commande->fetchAll(PDO::FETCH_ASSOC);
            $under = $result[0];

            if ($commande2->execute()){
                $result = $commande2->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode(array($under, $result[0]));
            }
        }
    }catch(PDOException $e){
        echo utf8_encode("Echec de la requete SQL dans creerAutoAliment" . $e->getMessage() . "\n");
        die();
    }
}

numberOfPersoneDrinkAlcohol();