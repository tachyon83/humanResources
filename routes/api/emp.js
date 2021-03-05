const express = require('express');
const router = express.Router();
const sqlSetter = require('../../utils/sqlSetter')
const controller = require('../../controllers/controller')
// const httpAuth = require('../utils/httpAuth')

router.get('/total', sqlSetter('getTotalEmpCount'), controller)
router.get('/total/left', sqlSetter('getTotalEmpLeftCount'), controller)
router.get('/count/dept', sqlSetter('getEmpCountByDept'), controller)
router.get('/count/title', sqlSetter('getEmpCountByTitle'), controller)
router.get('/dept/:dept/:page', sqlSetter('getEmpListByDept'), controller)
router.get('/title/:title/:page', sqlSetter('getEmpListByTitle'), controller)
router.get('/history/:emp_no', sqlSetter('getEmpHistoryByEmpNo'), controller)
router.get('/rank/salary/:emp_no/:dept_name/:title', sqlSetter('getEmpThreeRankingsBySalary'), controller)
router.get('/rank/period/:emp_no/:dept_name/:title', sqlSetter('getEmpThreeRankingsByPeriod'), controller)
router.get('/:name/:page', sqlSetter('getEmpListByName'), controller)

module.exports = router
