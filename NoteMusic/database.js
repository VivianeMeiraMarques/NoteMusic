const odbc = require('odbc');

const connectionString = 'Driver={ODBC Driver 18 for SQL Server};Server=localhost;Database=NoteMusic;UID=logNoteMusic;PWD=notemusic24;TrustServerCertificate=Yes';

async function main() {
  let connection;

  try {
    connection = await odbc.connect(connectionString);
    console.log('Connected to SQL Server!');

    const query = 'SELECT * FROM TB_MUSICAS';
    const result = await connection.query(query);
    console.log(result);

  } catch (error) {
    console.error('Error connecting to SQL Server:', error);
  } finally {
    if (connection) {
      await connection.close();
      console.log('Connection closed.');
    }
  }
}

main();