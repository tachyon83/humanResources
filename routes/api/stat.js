const express = require('express');
const router = express.Router();
const controller = require('../../controllers/controller')('distribution')
// const httpAuth = require('../utils/httpAuth')

router.get('/distribution/above/:salary', controller.getDistributionOverDeptWhenSalaryIsAndAbove)
router.get('/distribution/below/:salary', controller.getDistributionOverDeptWhenSalaryIsAndBelow)
router.get('/distribution/dept/salary', controller.getDistributionOverDeptOverSalaryRange)
router.get('/distribution/emp/salary', controller.getDistributionOverEmpOverSalaryRange)

module.exports = router
