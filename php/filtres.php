<?php
    session_start();
    $profil = array();
    // $str_tag = "";
    // $tag=$_POST["categorie"];

    // if($tag!=null)
    // {
    //     for($i=0;$i<count($tag);$i++){

    //         if($i==0)
        
    //         $str_tag = $tag[$i];
        
    //         else
        
    //         $str_tag =$str_tag.",".$tag[$i];
        
    //     }
        
    //     echo $str_tag;
    // }

    $select = 'SELECT *';
    $from = ' FROM workers';
    $where = ' WHERE TRUE';
    $opts = isset($_POST['filterOpts'])?
                $_POST['filterOpts'] :
                array('');

    if (in_array("legumes", $opts)){
        $where .= " AND hasCar = 1";
    }


    function isExistingAcount($username, &$profil){
        require("connexionPDO.php");
        $sql = "SELECT *
                FROM USER_DATA
                WHERE mail=:username;";
        try{
            $commande = $pdo->prepare($sql);
            $commande->bindParam(':username', $username);

            if ($commande->execute()){
                $result = $commande->fetchAll(PDO::FETCH_ASSOC);
                
                if (count($result) != 0){
                    $profil = $result[0];
                    return $result[0]["mdp"];
                }
                return "";
            }
        } catch(PDOException $e){
            echo utf8_encode("Echec de la requete SQL dans creationCompte" . $e->getMessage() . "\n");
            die();
        }
    }

    if ($username == "" || $password == ""){
        echo "Tout les champs sont obligatoires";
        return;
    }

    $bdMdp = isExistingAcount($username, $profil);

    if($bdMdp != ""){ // compte  existe (si le mot de passe du compet et pas vide)
        if(password_verify($password, $bdMdp)){
            $_SESSION["userData"] = $profil;
            echo "Connexion reussi";
        }
        else{
            echo "Mot de passe incorrecte";
        }
    }
    else{
        echo "Le compte n'existe pas";
    }
?>