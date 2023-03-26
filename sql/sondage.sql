CREATE TABLE Utilisateur(
   Id_User INT AUTO_INCREMENT,
   Nom VARCHAR(50) NOT NULL,
   Prenom VARCHAR(50) NOT NULL,
   Age TINYINT,
   CONSTRAINT PK_Users PRIMARY KEY(Id_User)
);

CREATE TABLE Sondage(
   Id_sondage INT,
   Id_User INT NOT NULL,
   CONSTRAINT PK_Sondage PRIMARY KEY(Id_sondage),
   CONSTRAINT AK_Sondage UNIQUE(Id_User),
   CONSTRAINT FK_Sondage_Users FOREIGN KEY(Id_User) REFERENCES Utilisateur(Id_User) ON DELETE CASCADE
);

CREATE TABLE Resultat(
   Id_Aliment INT,
   Id_sondage INT,
   CONSTRAINT PK_Resultat PRIMARY KEY(Id_Aliment, Id_sondage),
   CONSTRAINT FK_Resultat_Aliment FOREIGN KEY(Id_Aliment) REFERENCES Aliments(alim_code) ON DELETE CASCADE,
   CONSTRAINT FK_Resultat_Sondage FOREIGN KEY(Id_sondage) REFERENCES Sondage(Id_sondage) ON DELETE CASCADE
);