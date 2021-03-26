const dao = require('../models/dao')
const resHandler = require('../utils/responseHandler')
const errHandler = require('../utils/errorHandler')

module.exports = (req, res) => {
    dao.sqlHandler(req.sql)
        .then(list => {
            switch (req.option) {
                case 'getEmpHistoryByEmpNo':
                    let result = []
                    result.push(list[0].length)
                    list[0].sort(function (a, b) {
                        return (a.from_date > b.from_date) ? 1 : (a.from_date < b.from_date) ? -1 : (a.to_date > b.to_date) ? 1 : (a.to_date < b.to_date) ? -1 : 0
                    })
                    list[1].sort(function (a, b) {
                        return (a.from_date > b.from_date) ? 1 : (a.from_date < b.from_date) ? -1 : (a.to_date > b.to_date) ? 1 : (a.to_date < b.to_date) ? -1 : 0
                    })
                    for (let e of list[0]) result.push(e)
                    for (let e of list[1]) result.push(e)
                    list = result
                    break

                case 'getEmpThreeRankingsBySalary':
                    list = {
                        entire: list[1][0].ranking,
                        dept: list[3][0].ranking,
                        title: list[5][0].ranking
                    }
                    break

                case 'getEmpThreeRankingsByPeriod':
                    list = {
                        entire: list[1][0].ranking,
                        dept: list[3][0].ranking,
                        title: list[5][0].ranking
                    }
                    break

                default:
                    break
            }
            console.log('[Controller]: processed list', list)
            console.log()
            res.status(200).json(resHandler(list))
        })
        .catch(err => res.status(500).json(errHandler(err)))
}