<?php
$tableau = isset($_POST['tab']) ? $_POST['tab'] : "pas bon";

//echo $tableau[0] . "";

require("connexionBD.php");

$sql = "INSERT INTO table2 (column1, column2, column3, ...)
SELECT column1, column2, column3,
FROM table1
WHERE condition";


$sql = "INSERT INTO utilisateur VALUES(:id, :Nom,:Prenom,:Age);";
$null = null;
try{

    $commande = $pdo->prepare($sql);
    $commande->bindParam(':id', $null);
    $commande->bindParam(':Nom', $null);
    $commande->bindParam(':Prenom', $null);
    $commande->bindParam(':Age', $null);

    $commande->execute();


} catch(PDOException $e){
    echo utf8_encode("Echec de la requete SQL dans ResultRegister.php" . $e->getMessage() . "\n");
    die();
}

$sql = "INSERT INTO utilisateur VALUES(:id, :Nom,:Prenom,:Age);";
$null = null;
try{

    $commande = $pdo->prepare($sql);
    $commande->bindParam(':id', $null);
    $commande->bindParam(':Nom', $null);
    $commande->bindParam(':Prenom', $null);
    $commande->bindParam(':Age', $null);

    $commande->execute();


} catch(PDOException $e){
    echo utf8_encode("Echec de la requete SQL dans ResultRegister.php" . $e->getMessage() . "\n");
    die();
}




