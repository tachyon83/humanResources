const dao = require('../models/dao')
const sqls = require('../models/settings/sqlDispenser')
const resHandler = require('../utils/responseHandler')
const errHandler = require('../utils/errorHandler')

module.exports = (keyword) => {
    switch (keyword) {
        case 'emp':
            return {
                getEmpListByName: (req, res) => {
                    console.log('[empController]: Getting Employees List...')
                    console.log()
                    dao.sqlHandler(sqls.getEmpListByName, [req.params.name, req.params.name])
                        .then(list => res.status(200).json(resHandler(list)))
                        .catch(err => res.status(500).json(errHandler(err)))
                },

                getEmpHistoryByEmpNo: (req, res) => {

                },

                getEmpRanksByEmpNo: (req, res) => {

                },

            }
        case 'dept':
            return {}
        default:
        // 
    }
}