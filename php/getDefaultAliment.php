<?php
        require("connexionBD.php");
        $sql = "SELECT DISTINCT alim_nom_fr
                FROM aliments;";
        try{
            $commande = $pdo->prepare($sql);

            if ($commande->execute()){
                $result = $commande->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($result);
                // var_dump($result);
                // die();
            }
        } catch(PDOException $e){
            echo utf8_encode("Echec de la requete SQL dans creerAutoAliment" . $e->getMessage() . "\n");
            die();
        }
?>