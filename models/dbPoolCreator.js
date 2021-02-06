// singleton

const mysql = require('mysql');
const dbSetting = require('./settings/dbConnectionSettings')

let settingObj = {
    host: dbSetting.host,
    port: dbSetting.port,
    user: dbSetting.user,
    password: dbSetting.password,
    multipleStatements: true,
    database: dbSetting.database,
    connectionLimit: dbSetting.connectionLimit,
}

module.exports = (function () {
    let dbPool;
    const initiate = async () => {
        return await mysql.createPool(settingObj)
    }
    return {
        getPool: async function () {
            if (!dbPool) {
                console.log('this instance creator must be called only once')
                dbPool = await initiate();
            }
            return dbPool;
        }
    }
})();