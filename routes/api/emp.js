const express = require('express');
const router = express.Router();
const empController = require('../../controllers/controller')('emp')
// const httpAuth = require('../utils/httpAuth')

router.get('/:name/:page', empController.getEmpListByName)
router.get('/dept/:dept/:page', empController.getEmpListByDept)
router.get('/title/:title/:page', empController.getEmpListByTitle)
router.get('/history', empController.getEmpHistoryByEmpNo)
router.get('/rank', empController.getEmpRanksByEmpNo)

module.exports = router
