<?php
    session_start();

    $tag = isset($_POST['category']) ? $_POST['category'] : "";

        require("connexionBD.php");
        $sql = "SELECT alim_nom_fr
                FROM aliments
                WHERE alim_grp_nom_fr=:tag;";
        try{

            $commande = $pdo->prepare($sql);
            $commande->bindParam(':tag', $tag);
            // if($tag == "")
            // {
            //     echo"ko";
            //     die();
            // }
          
            // else{
                if ($commande->execute()){
                    $result = $commande->fetchAll(PDO::FETCH_ASSOC);
                    // if (count($result) != 0){
                        echo json_encode($result);
                    // }
                }
            // }
        } catch(PDOException $e){
            echo utf8_encode("Echec de la requete SQL dans filtres.php" . $e->getMessage() . "\n");
            die();
        }
    

?>