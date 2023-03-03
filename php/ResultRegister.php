<?php
$tableau_aliment = isset($_POST['tab']) ? $_POST['tab'] : "pas bon";

$firstName = isset($_POST['nom']) ? $_POST['nom'] : "";
$lastName = isset($_POST['prenom']) ? $_POST['prenom'] : "";
$age = isset($_POST['age']) ? $_POST['age'] : "";

//echo $tableau[0] . "";

require("connexionBD.php");

//$sql = "INSERT INTO table2 (column1, column2, column3, ...)
//SELECT column1, column2, column3,
//FROM table1
//WHERE condition";

function get_unique_id (){
    require("connexionBD.php");
    $sql = "SELECT getID();";

    try{

        $commande = $pdo->prepare($sql);

        if ($commande->execute())
            $resultat = $commande->fetchAll(PDO::FETCH_ASSOC);



        return $resultat[0]['getID()'];


    } catch(PDOException $e){
        echo utf8_encode("Echec de la requete SQL dans ResultRegister.php" . $e->getMessage() . "\n");
        die();
    }
}

function enregistrementAliment($id_sond, $nom_aliment){
    require("connexionBD.php");
    $sql = "INSERT INTO resultat (Id_Aliment, Id_sondage)
    SELECT Id_Aliment, :ID_SOND
    FROM aliments
    WHERE :NOM_ALIM = alim_nom_fr ;";
    try{

        $commande = $pdo->prepare($sql);

        $commande->bindParam(':ID_SOND', $id_sond);
        $commande->bindParam(':NOM_ALIM', $nom_aliment);



        $commande->execute();


    } catch(PDOException $e){
        echo utf8_encode("Echec de la requete SQL dans ResultRegister.php" . $e->getMessage() . "\n");
        die();
    }
}

$id_User = get_unique_id();
//var_dump ($id_requete);

$sql = "INSERT INTO utilisateur VALUES($id_User, :Nom,:Prenom,:Age);";
//$null = null;
try{

    $commande = $pdo->prepare($sql);

    $commande->bindParam(':Nom', $lastName);
    $commande->bindParam(':Prenom', $firstName);
    $commande->bindParam(':Age', $age);

    $commande->execute();


} catch(PDOException $e){
    echo utf8_encode("Echec de la requete SQL dans ResultRegister.php" . $e->getMessage() . "\n");
    die();
}
$id_Sondage = get_unique_id();
$sql = "INSERT INTO sondage VALUES(:ID_SOND,:ID_USER );";
//$null = null;
try{

    $commande = $pdo->prepare($sql);

    $commande->bindParam(':ID_SOND', $id_Sondage);
    $commande->bindParam(':ID_USER', $id_User);


    $commande->execute();


} catch(PDOException $e){
    echo utf8_encode("Echec de la requete SQL dans ResultRegister.php" . $e->getMessage() . "\n");
    die();
}
foreach ($tableau_aliment as $value){
    enregistrementAliment($id_Sondage,$value);

}
