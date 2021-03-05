const express = require('express');
const router = express.Router();
const sqlSetter = require('../../utils/sqlSetter')
const controller = require('../../controllers/controller')
// const httpAuth = require('../utils/httpAuth')

router.get('/', sqlSetter('getTitleNames'), controller)


module.exports = router
