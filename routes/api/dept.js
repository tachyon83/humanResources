const express = require('express');
const router = express.Router();
const sqlSetter = require('../../utils/sqlSetter')
const controller = require('../../controllers/controller')
// const httpAuth = require('../utils/httpAuth')

router.get('/', sqlSetter('getDeptNames'), controller)


module.exports = router
