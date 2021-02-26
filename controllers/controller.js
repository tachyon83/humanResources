const dao = require('../models/dao')
const dbSetting = require('../models/settings/dbConnectionSettings')
const sqls = require('../models/settings/sqlDispenser')
const resHandler = require('../utils/responseHandler')
const errHandler = require('../utils/errorHandler')
const qs = require('querystring')

// controllers could be separated...
// in this project, they are all gathered together
// not sure which way is better...
// guessing that if there is no cost requiring modules, better separate controllers.

module.exports = (keyword) => {
    switch (keyword) {
        case 'emp':
            return {
                getEmpListByName: (req, res) => {
                    console.log('[empController]: Getting Employees List By Name...')
                    console.log()
                    req.params.name = qs.unescape(req.params.name)
                    // req.params.name2 = qs.escape(req.params.name)
                    // console.log(req.params.name)
                    // console.log(req.params.name2)
                    dao.sqlHandler(sqls.getEmpListByName, [req.params.name, req.params.name, (req.params.page - 1) * dbSetting.queryLimit])
                        .then(list => res.status(200).json(resHandler(list)))
                        .catch(err => res.status(500).json(errHandler(err)))
                },

                getEmpListByDept: (req, res) => {
                    console.log('[empController]: Getting Employees List By Dept...')
                    console.log()
                    req.params.dept = qs.unescape(req.params.dept)
                    dao.sqlHandler(sqls.getEmpListByDept, [req.params.dept, (req.params.page - 1) * dbSetting.queryLimit])
                        .then(list => res.status(200).json(resHandler(list)))
                        .catch(err => res.status(500).json(errHandler(err)))
                },

                getEmpListByTitle: (req, res) => {
                    console.log('[empController]: Getting Employees List By Title...')
                    console.log()
                    req.params.title = qs.unescape(req.params.title)
                    dao.sqlHandler(sqls.getEmpListByTitle, [req.params.title, (req.params.page - 1) * dbSetting.queryLimit])
                        .then(list => res.status(200).json(resHandler(list)))
                        .catch(err => res.status(500).json(errHandler(err)))
                },

                getEmpHistoryByEmpNo: (req, res) => {
                    console.log(`[empController]: Getting Employee's History...`)
                    console.log()
                    dao.sqlHandler(sqls.getEmpHistoryByEmpNo, req.params.emp_no)
                        .then(list => res.status(200).json(resHandler(list)))
                        .catch(err => res.status(500).json(errHandler(err)))
                },

                getEmpThreeRankings: (req, res) => {
                    console.log(`[empController]: Getting an Employee's three rankings...`)
                    console.log()
                    req.params.dept_name = qs.unescape(req.params.dept_name)
                    req.params.title = qs.unescape(req.params.title)
                    // console.log(req.params.title)
                    dao.sqlHandler(sqls.getEmpThreeRankings, [req.params.emp_no, req.params.dept_name, req.params.emp_no, req.params.title, req.params.emp_no])
                        .then(result => {
                            result = {
                                entire: result[1][0].ranking,
                                dept: result[3][0].ranking,
                                title: result[5][0].ranking
                            }
                            res.status(200).json(resHandler(result))
                        })
                        .catch(err => res.status(500).json(errHandler(err)))
                },
            }

        case 'dept':
            return {
                getDeptNames: (req, res) => {
                    console.log('[deptController]: Getting Dept Name List...')
                    console.log()
                    dao.sqlHandler(sqls.getDeptNames)
                        .then(list => res.status(200).json(resHandler(list)))
                        .catch(err => res.status(500).json(errHandler(err)))
                }
            }

        case 'title':
            return {
                getTitleNames: (req, res) => {
                    console.log('[titleController]: Getting Title Name List...')
                    console.log()
                    dao.sqlHandler(sqls.getTitleNames)
                        .then(list => res.status(200).json(resHandler(list)))
                        .catch(err => res.status(500).json(errHandler(err)))
                }
            }

        case 'distribution':
            return {
                getDistributionOverDeptWhenSalaryIsAndAbove: (req, res) => {
                    console.log(`[distributionController]: Getting Distribution Over Dept When Salary Is And Above ${req.params.salary}...`)
                    console.log()
                    dao.sqlHandler(sqls.getDistributionOverDeptWhenSalaryIsAndAbove, req.params.salary)
                        .then(list => res.status(200).json(resHandler(list)))
                        .catch(err => res.status(500).json(errHandler(err)))
                },

                getDistributionOverDeptWhenSalaryIsAndBelow: (req, res) => {
                    console.log(`[distributionController]: Getting Distribution Over Dept When Salary Is And Below ${req.params.salary}...`)
                    console.log()
                    dao.sqlHandler(sqls.getDistributionOverDeptWhenSalaryIsAndBelow, req.params.salary)
                        .then(list => res.status(200).json(resHandler(list)))
                        .catch(err => res.status(500).json(errHandler(err)))
                },

                getDistributionOverDeptOverSalaryRange: (req, res) => {
                    console.log(`[distributionController]: Getting Distribution Over Dept And Over Salary Range...`)
                    console.log()
                    dao.sqlHandler(sqls.getDistributionOverDeptOverSalaryRange)
                        .then(list => res.status(200).json(resHandler(list)))
                        .catch(err => res.status(500).json(errHandler(err)))
                },

                getDistributionOverEmpOverSalaryRange: (req, res) => {
                    console.log(`[distributionController]: Getting Distribution Over Emp And Over Salary Range...`)
                    console.log()
                    dao.sqlHandler(sqls.getDistributionOverEmpOverSalaryRange)
                        .then(list => res.status(200).json(resHandler(list)))
                        .catch(err => res.status(500).json(errHandler(err)))
                }
            }

        default:
        // 
    }
}
