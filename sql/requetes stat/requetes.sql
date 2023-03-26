-- ======= nombre de mineur alcolique
SELECT COUNT(DISTINCT utilisateur.Id_User) as count_underage_alcohol_consumers
FROM utilisateur
JOIN sondage ON utilisateur.Id_User = sondage.Id_User
JOIN resultat ON sondage.Id_sondage = resultat.Id_sondage
JOIN aliments ON resultat.Id_Aliment = aliments.alim_code
WHERE aliments.alim_nom_fr LIKE '%alcool%' AND utilisateur.Age < 18;

-- ======= nombre alcolique
SELECT COUNT(DISTINCT utilisateur.Id_User) as count_underage_alcohol_consumers
FROM utilisateur
JOIN sondage ON utilisateur.Id_User = sondage.Id_User
JOIN resultat ON sondage.Id_sondage = resultat.Id_sondage
JOIN aliments ON resultat.Id_Aliment = aliments.alim_code
WHERE aliments.alim_nom_fr LIKE '%alcool%';



-- ======= nombre de personne ayant effectuet le sondage < 18 ans
SELECT COUNT(*) as under, (SELECT COUNT(*) FROM utilisateur) as total
FROM utilisateur
WHERE age < 18;
-- ======== nutrie intervale
SELECT
  SUM(CASE WHEN nutriscore BETWEEN 0 AND 2 THEN 1 ELSE 0 END) / COUNT(*) * 100 AS pct_nutriscore_0_2,
  SUM(CASE WHEN nutriscore BETWEEN 2 AND 4 THEN 1 ELSE 0 END) / COUNT(*) * 100 AS pct_nutriscore_2_4,
  SUM(CASE WHEN nutriscore BETWEEN 4 AND 6 THEN 1 ELSE 0 END) / COUNT(*) * 100 AS pct_nutriscore_4_6,
  SUM(CASE WHEN nutriscore BETWEEN 6 AND 8 THEN 1 ELSE 0 END) / COUNT(*) * 100 AS pct_nutriscore_6_8,
  SUM(CASE WHEN nutriscore BETWEEN 8 AND 10 THEN 1 ELSE 0 END) / COUNT(*) * 100 AS pct_nutriscore_8_10
FROM ((utilisateur U INNER JOIN sondage S ON U.Id_User = S.Id_User)
INNER JOIN resultat R ON S.Id_sondage = R.Id_sondage)
INNER JOIN aliments A ON A.alim_code = R.Id_Aliment;
-- a tester