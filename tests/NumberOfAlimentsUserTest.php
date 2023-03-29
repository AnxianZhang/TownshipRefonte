<?php declare(strict_types=1);

use PHPUnit\Framework\TestCase;

class NumberOfAlimentsUserTest extends TestCase
{
    public function testSendNumberAlimentNutriscoreOfUsers()
    {
        require("connexionBD.php");
        $pdoMock = $this->createMock(PDO::class);
        $pdoStatementMock = $this->createMock(PDOStatement::class);
        $expectedResult = [
            'num_nutriscore_0_2' => 1,
            'num_nutriscore_2_4' => 2,
            'num_nutriscore_4_6' => 3,
            'num_nutriscore_6_8' => 4,
            'num_nutriscore_8_10' => 5,
        ];

        $pdoStatementMock->expects($this->once())
            ->method('fetchAll')
            ->with(PDO::FETCH_ASSOC)
            ->willReturn([$expectedResult]);

        $pdoMock->expects($this->once())
            ->method('prepare')
            ->with($this->equalTo('SELECT
                SUM(CASE WHEN nutriscore BETWEEN 0 AND 2 THEN 1 ELSE 0 END) AS num_nutriscore_0_2,
                SUM(CASE WHEN nutriscore BETWEEN 2 AND 4 THEN 1 ELSE 0 END) AS num_nutriscore_2_4,
                SUM(CASE WHEN nutriscore BETWEEN 4 AND 6 THEN 1 ELSE 0 END) AS num_nutriscore_4_6,
                SUM(CASE WHEN nutriscore BETWEEN 6 AND 8 THEN 1 ELSE 0 END) AS num_nutriscore_6_8,
                SUM(CASE WHEN nutriscore BETWEEN 8 AND 10 THEN 1 ELSE 0 END) AS num_nutriscore_8_10
            FROM ((utilisateur U INNER JOIN sondage S ON U.Id_User = S.Id_User)
            INNER JOIN resultat R ON S.Id_sondage = R.Id_sondage)
            INNER JOIN aliments A ON A.alim_code = R.Id_Aliment;'))
            ->willReturn($pdoStatementMock);

        ob_start();
        sendNumberAlimentNutriscoreOfUsers($pdoMock);
        $actualResult = json_decode(ob_get_clean(), true);

        $this->assertEquals($expectedResult, $actualResult);
    }
}