<?php
        require("connexionBD.php");
        $sql = "SELECT DISTINCT alim_grp_nom_fr
                FROM aliments;";
        try{
            $commande = $pdo->prepare($sql);

            if ($commande->execute()){
                $result = $commande->fetchAll(PDO::FETCH_ASSOC);
                // var_dump($result);
                // die();
            }
        } catch(PDOException $e){
            echo utf8_encode("Echec de la requete SQL dans creerAutoFiltre" . $e->getMessage() . "\n");
            die();
        }
        echo json_encode($result);
?>