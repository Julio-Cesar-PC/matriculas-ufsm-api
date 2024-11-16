const database = require('../database/connection');

class ProfessorController {

    get(req, res) {
        database.select().from('Professor').then((data) => {
            console.log(data);

            res.send(data);
        });
    }
}

module.exports = new ProfessorController();