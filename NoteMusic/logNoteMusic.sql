CREATE LOGIN logNoteMusic WITH PASSWORD = 'notemusic24';

USE NOTEMUSIC;
CREATE USER ADM FOR LOGIN logNoteMusic;

ALTER ROLE db_datareader ADD MEMBER ADM;
ALTER ROLE db_datawriter ADD MEMBER ADM;
