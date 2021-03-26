const mysql = require('mysql');
const db = require('./dbPoolCreator')

class Dao {

    // arrow function is needed to have an access to this.dbpool
    // because in class, written in 'strict mode'

    sqlHandler = (sql, q, fn) => {
        if (q) sql = mysql.format(sql, q)
        // console.log(sql)
        return new Promise(async (resolve, reject) => {
            try {
                const dbPool = await db.getPool()
                dbPool.getConnection((err, conn) => {
                    if (err) {
                        if (conn) conn.release();
                        return reject(err)
                    }
                    conn.query(sql, (err, rows, fields) => {
                        conn.release();
                        if (err) return reject(err)

                        console.log('[DAO]: A Query Processed...')
                        console.log()
                        console.log('[DAO]: SQL=', sql)
                        console.log()
                        console.log('[DAO]: Process Result=', rows)
                        console.log()
                        resolve(rows)
                    })
                })
            } catch (err) {
                return reject(err)
            }
        })
    }
}

module.exports = new Dao()