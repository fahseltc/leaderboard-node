const  pg  = require('pg');

class PgDatabase {
  constructor() {
    var env = process.env.environment;
    var connection_config;

    console.log("env: " + env);

    if(env == 'staging' || env == 'production') {
      connection_config = {
        connectionString: process.env.DATABASE_URL, // heroku environment variable
        ssl: true
      }
    } else {
        connection_config = {
          connectionString: 'postgres://behr:behr@localhost:5432/leaderboard?ssl=false' // local db
    }
  }

  console.log("connection config: " + connection_config.connectionString);

  this.pool = new pg.Pool(connection_config);
  this.pool.connect();
}

  async write(score, username) {
    try {
      const { rows } = await this.query('INSERT INTO scores(name, score, ranking) VALUES($1, $2, 0) RETURNING *', [username, score]);
      console.log(rows);
    } catch (err) {
      console.log('database error: ' + err);
    }
  }

  async get_all_scores(res) {
    try {
      const { rows } = await this.query('SELECT * from scores ORDER BY score desc');
      console.log(rows);
      res.send(rows);
      return rows;
    } catch (err) {
      console.log('database error: ' + err);
    }
  }

  async wipe() {
    try {
      const { rows } = await this.query('TRUNCATE TABLE scores');
    } catch (err) {
      console.log('database wipe error: ' + err);
    }
  }

  async query(q, p='') {
    const client = await this.pool.connect();
    let res;
    try {
      await client.query('BEGIN');
      try {
        res = await client.query(q, p);
        await client.query('COMMIT');
      } catch (err) {
        await client.query('ROLLBACK');
        throw err;
      }
    } finally {
      client.release();
    }
    return res;
  }

}
module.exports = PgDatabase;
