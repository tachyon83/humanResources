const mysql = require('mysql');
const dbSetting = require('./models/settings/dbConnectionSettings')
const sqls = require('./models/settings/sqlDispenser')

let settingObj = {
    host: dbSetting.host,
    port: dbSetting.port,
    user: dbSetting.user,
    password: dbSetting.password,
    multipleStatements: true,
    database: dbSetting.database,
    connectionLimit: dbSetting.connectionLimit,
}

function db_initSetting() {
    return new Promise((resolve, reject) => {
        const conn = mysql.createConnection(settingObj)
        conn.connect();
        conn.query(sqls.create_indexes, (err) => {
            conn.destroy();
            if (err) return reject(err);
            resolve()
        })
    })
}

async function dbSetup() {
    try {
        await db_initSetting()
        console.log('[DB] index setup complete!')
    } catch (err) {
        console.log(err)
    }
}
dbSetup()
