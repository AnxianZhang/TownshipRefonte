<?php
function numberOfUserUnderAge(){
    require("connexionBD.php");
    // $sql = "select count(*) from utilisateur;";
    $sql = "SELECT COUNT(*) as under, (SELECT COUNT(*) FROM utilisateur) as total
            FROM utilisateur
            WHERE age < 18;";

    try {
        $commande = $pdo->prepare($sql);

        if ($commande->execute()){
            $result = $commande->fetchAll(PDO::FETCH_ASSOC);
            // var_dump($result); die();
            echo json_encode($result[0]);
        }
    }catch(PDOException $e){
        echo utf8_encode("Echec de la requete SQL dans creerAutoAliment" . $e->getMessage() . "\n");
        die();
    }
}

numberOfUserUnderAge();