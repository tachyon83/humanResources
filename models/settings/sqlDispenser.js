const dbSetting = require('./dbConnectionSettings')

// '%' vs 'localhost'

let getEmpListByName =
    `select * from ${dbSetting.table_employees} 
    where first_name like concat('%',?,'%') or 
    last_name like concat('%',?,'%') limit ${dbSetting.queryLimit};`

module.exports = {
    getEmpListByName,
}