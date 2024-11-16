const database = require('../database/connection');

class CentroController {

    get(req, res) {
        database.select().from('Centro').then((data) => {
            console.log(data);

            res.send(data);
        });
    }
}

module.exports = new CentroController();