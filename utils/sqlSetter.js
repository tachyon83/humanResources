const sqls = require('../models/settings/sqlDispenser')
const dbSetting = require('../models/settings/dbConnectionSettings')
const qs = require('querystring')
const mysql = require('mysql');

module.exports = option => {
    console.log(`[Controller]: ${option}...`)
    console.log()

    return (req, res, next) => {
        let q
        req.option = option
        req.sql = sqls[option]
        if (req.params) for (let e of Object.keys(req.params)) req.params[e] = qs.unescape(req.params[e])
        switch (option) {
            case 'getEmpListByDept':
                q = [req.params.dept, (req.params.page - 1) * dbSetting.queryLimit]
                break

            case 'getEmpListByTitle':
                q = [req.params.title, (req.params.page - 1) * dbSetting.queryLimit]
                break

            case 'getEmpHistoryByEmpNo':
                q = [req.params.emp_no, req.params.emp_no]
                break

            case 'getEmpThreeRankingsBySalary':
                q = [req.params.emp_no, req.params.dept_name, req.params.emp_no, req.params.title, req.params.emp_no]
                break

            case 'getEmpThreeRankingsByPeriod':
                q = [req.params.emp_no, req.params.dept_name, req.params.emp_no, req.params.title, req.params.emp_no]
                break

            case 'getEmpListByName':
                q = [req.params.name, req.params.name, (req.params.page - 1) * dbSetting.queryLimit]
                break

            case 'getDistributionOverDeptWhenSalaryIsAndAbove':
                q = req.params.salary
                break

            case 'getDistributionOverDeptWhenSalaryIsAndBelow':
                q = req.params.salary
                break

            default:

                break
        }
        if (q) req.sql = mysql.format(req.sql, q)
        next()
    }
}