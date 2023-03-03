<?php
$tableau = isset($_POST['tab']) ? $_POST['tab'] : "pas bon";

$firstName = isset($_POST['nom']) ? $_POST['nom'] : "";
$lastName = isset($_POST['prenom']) ? $_POST['prenom'] : "";
$age = isset($_POST['age']) ? $_POST['age'] : "";

//echo $tableau[0] . "";

require("connexionBD.php");

//$sql = "INSERT INTO table2 (column1, column2, column3, ...)
//SELECT column1, column2, column3,
//FROM table1
//WHERE condition";



$sql = "INSERT INTO utilisateur VALUES(getID(), :Nom,:Prenom,:Age);";
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






