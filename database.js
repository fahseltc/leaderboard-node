class Database {
    constructor() {
        const low = require('lowdb');
        const FileSync = require('lowdb/adapters/FileSync');
        const adapter = new FileSync('db.json');

        this.db = low(adapter);
        this.db.defaults({ scores: [] }).write();
    }

    write(score, username) {
        this.db.get('scores')
        .push({
            id: this.db.get('scores').size() + 1,
            score: parseInt(score),
            username: username
        }).write()
    }

    read() {
        return this.db.get('scores');
    }

    top_5() {
        return this.db.get('scores').sortBy('score', 'descending').take(5);
    }

    top_10() {
        return this.db.get('scores').sortBy('score', 'descending').take(10);
    }
}
module.exports = Database;
