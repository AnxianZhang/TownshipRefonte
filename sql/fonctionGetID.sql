DELIMITER //

CREATE OR REPLACE FUNCTION getID() RETURNS int DETERMINISTIC
BEGIN

insert into userseq(num) values(default) ;
RETURN (select max(num) from UserSeq);
END

//

DELIMITER ;