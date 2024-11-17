const database = require('../database/connection');

const checkExistence = async (table, column, value, errorMessage) => {
    const data = await database(table).select().where(column, value);

};

const checkExistenceAnd = async (table, column, value, column2, value2, errorMessage) => {
    const data = await database(table).select().where(column, value);
    if (data.length === 0) {
        throw new Error(errorMessage);
    }
};

module.exports = {checkExistence, checkExistenceAnd};