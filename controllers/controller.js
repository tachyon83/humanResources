const dao = require('../models/dao')
const dbSetting = require('../models/settings/dbConnectionSettings')
const sqls = require('../models/settings/sqlDispenser')
const resHandler = require('../utils/responseHandler')
const errHandler = require('../utils/errorHandler')

// controllers could be separated...
// in this project, they are all gathered together
// not sure which way is better...
// guessing that if there is no cost requiring modules, better separate controllers.

module.exports = (keyword) => {
    switch (keyword) {
        case 'emp':
            return {
                getEmpListByName: (req, res) => {
                    console.log('[empController]: Getting Employees List...')
                    console.log()
                    dao.sqlHandler(sqls.getEmpListByName, [req.params.name, req.params.name, (req.params.page - 1) * dbSetting.queryLimit])
                        .then(list => res.status(200).json(resHandler(list)))
                        .catch(err => res.status(500).json(errHandler(err)))
                },

                getEmpHistoryByEmpNo: (req, res) => {

                },

                getEmpRanksByEmpNo: (req, res) => {

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
        default:
        // 
    }
}
