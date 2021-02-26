const express = require('express');
const router = express.Router();
const empController = require('../../controllers/controller')('emp')
// const httpAuth = require('../utils/httpAuth')

router.get('/dept/:dept/:page', empController.getEmpListByDept)
router.get('/title/:title/:page', empController.getEmpListByTitle)
router.get('/history/:emp_no', empController.getEmpHistoryByEmpNo)
router.get('/rank/salary/:emp_no/:dept_name/:title', empController.getEmpThreeRankingsBySalary)
router.get('/rank/period/:emp_no/:dept_name/:title', empController.getEmpThreeRankingsByPeriod)
router.get('/:name/:page', empController.getEmpListByName)

module.exports = router
