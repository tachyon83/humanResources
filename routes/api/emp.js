const express = require('express');
const router = express.Router();
const empController = require('../../controllers/controller')('emp')
// const httpAuth = require('../utils/httpAuth')

router.get('/dept/:dept/:page', empController.getEmpListByDept)
router.get('/title/:title/:page', empController.getEmpListByTitle)
router.get('/history/:emp_no', empController.getEmpHistoryByEmpNo)
router.get('/rank/:emp_no/:dept_name/:title', empController.getEmpThreeRankings)
router.get('/:name/:page', empController.getEmpListByName)

module.exports = router
