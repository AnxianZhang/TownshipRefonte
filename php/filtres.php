<?php
    session_start();

   
    
    $tag = isset($_POST['category']) ? $_POST['category'] : "nothing in category";

    
    function choixFiltre($str_tag){
        require("connexionBD.php");
        $sql = "SELECT alim_nom_fr
                FROM aliments
                WHERE alim_grp_nom_fr=:str_tag;";
        try{
            $commande = $pdo->prepare($sql);
            $commande->bindParam(':str_tag', $str_tag);

            if ($commande->execute()){
                $result = $commande->fetchAll(PDO::FETCH_ASSOC);
                if (count($result) != 0){
                    $profil = $result[0];
                    return $result[0]["mdp"];
                }
                return "";
            }
        } catch(PDOException $e){
            echo utf8_encode("Echec de la requete SQL dans filtres.php" . $e->getMessage() . "\n");
            die();
        }
    }

    if($tag != "")
    {
        for($i=0;$i<count($tag);$i++){
            $str_tag = $tag[$i];
            choixFiltre($str_tag);
            echo "fait";
        }
    }
    else{
        echo"null";
    }
    

?>