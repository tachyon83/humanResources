// singleton

const mysql = require('mysql');
const dbSetting = require('./settings/dbConnectionSettings')
const sqls = require('./settings/sqlDispenser')

let settingObj = {
    host: dbSetting.host,
    port: dbSetting.port,
    user: dbSetting.user,
    password: dbSetting.password,
    multipleStatements: true,
    database: dbSetting.database,
    connectionLimit: dbSetting.connectionLimit,
}

const viewCreator = () => {
    return new Promise((resolve, reject) => {
        const conn = mysql.createConnection(settingObj)
        conn.connect()
        conn.query(sqls.create_views, (err) => {
            conn.destroy()
            if (err) return reject(err)
            console.log('[DB]: View Setup has been completed.')
            console.log()
            resolve()
        })
    })
}

module.exports = (function () {
    let dbPool;
    const initiate = async () => {
        await viewCreator()
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