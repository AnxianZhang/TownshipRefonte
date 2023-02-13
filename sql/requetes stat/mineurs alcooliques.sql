select count(*)/(SELECT count(utilisateur.Id_User)
                 FROM utilisateur
                 WHERE utilisateur.age < 18)
FROM utilisateur,aliments,sondage,resultat
where utilisateur.Id_User = sondage.Id_User
  and sondage.Id_sondage = resultat.Id_sondage
  and resultat.Id_Aliment = aliments.Id_Aliment
  AND aliments.alim_nom_fr LIKE '%eau%'
  AND utilisateur.Age < 18;