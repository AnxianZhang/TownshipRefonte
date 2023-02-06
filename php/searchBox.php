<?php
    session_start();
    $motCle = isset($_POST['motSearch']) ? $_POST['motSearch'] : "";
    $filtreCle = isset($_POST['filtreChoix']) ? $_POST['filtreChoix'] : "";

        echo $motCle,$filtreCle;
        require("connexionBD.php");
        $sql = "SELECT alim_nom_fr
                FROM aliments
                WHERE alim_grp_nom_fr=:filtreCle
                AND alim_nom_fr like '%:motCle%';";
        try{
            // if(($motCle != "") && ($filtreCle!="")){
                // $motCle = "%" . $motCle . "%";
                $commande = $pdo->prepare($sql);
                $commande->bindParam(':motCle', $motCle);
                $commande->bindParam(':filtreCle', $filtreCle);
                if ($commande->execute()){
                    $result = $commande->fetchAll(PDO::FETCH_ASSOC);
                    // echo json_encode($result);
                    var_dump($result);
                    die();
                }
            // }
                
        } catch(PDOException $e){
            echo utf8_encode("Echec de la requete SQL dans filtres.php" . $e->getMessage() . "\n");
            die();
        }
    

?>