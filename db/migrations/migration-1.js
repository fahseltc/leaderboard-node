const { Client } = require('pg');
const connection_config = {
  connectionString: 'postgres://behr:behr@localhost:5432/leaderboard?ssl=false' // local db
};

const client = new Client(connection_config);
client.connect();
const query = client.query(
  'CREATE TABLE scores(id SERIAL PRIMARY KEY, name VARCHAR(40) not null, score INT, ranking INT)');
query.on('end', () => { client.end(); });