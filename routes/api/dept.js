const express = require('express');
const router = express.Router();
const deptController = require('../../controllers/controller')('dept')
// const httpAuth = require('../utils/httpAuth')

router.get('/', deptController.getDeptNames)


module.exports = router
