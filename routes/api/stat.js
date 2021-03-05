const express = require('express');
const router = express.Router();
const sqlSetter = require('../../utils/sqlSetter')
const controller = require('../../controllers/controller')
// const httpAuth = require('../utils/httpAuth')

router.get('/distribution/above/:salary', sqlSetter('getDistributionOverDeptWhenSalaryIsAndAbove'), controller)
router.get('/distribution/below/:salary', sqlSetter('getDistributionOverDeptWhenSalaryIsAndBelow'), controller)
router.get('/distribution/dept/salary', sqlSetter('getDistributionOverDeptOverSalaryRange'), controller)
router.get('/distribution/emp/salary', sqlSetter('getDistributionOverEmpOverSalaryRange'), controller)

module.exports = router
