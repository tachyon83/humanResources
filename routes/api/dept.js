const express = require('express');
const router = express.Router();
// const httpAuth = require('../utils/httpAuth')

router.post('/signin', controller.signIn)
router.get('/idcheck/:id', controller.idCheck)
router.post('/signup', controller.signUp)
router.get('/signout', httpAuth, controller.signOut(io))


module.exports = router
