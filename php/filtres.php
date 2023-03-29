<?php
    $tag = isset($_POST['category']) ? $_POST['category'] : "";

    require("connexionBD.php");
    $sql = "SELECT alim_nom_fr
            FROM aliments
            WHERE alim_grp_nom_fr=:tag;";
    try{

        $commande = $pdo->prepare($sql);
        $commande->bindParam(':tag', $tag);
        if ($commande->execute()){
            $result = $commande->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($result);
        }
    } catch(PDOException $e){
        echo utf8_encode("Echec de la requete SQL dans filtres.php" . $e->getMessage() . "\n");
        die();
    }
?>