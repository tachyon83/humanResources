const express = require('express');
const router = express.Router();
const titleController = require('../../controllers/controller')('title')
// const httpAuth = require('../utils/httpAuth')

router.get('/', titleController.getTitleNames)


module.exports = router
