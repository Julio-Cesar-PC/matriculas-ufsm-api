const database = require('../database/connection');

class SalaController {

    get(req, res) {
        database.select().from('Sala').then((data) => {
            console.log(data);

            res.send(data);
        });
    }
}

module.exports = new SalaController();