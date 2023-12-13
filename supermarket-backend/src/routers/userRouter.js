const express = require('express')
const userController = require('../controllers/userController')
const userRouter = express.Router()

userRouter.route('/api/user')
    .post((req, res) => userController.createUser(req, res))

userRouter.route('/api/user/:email')
    .get((req, res) => userController.getUser(req, res))
    .put((req, res) => userController.updateUser(req, res))

userRouter.route('/api/login')
    .post((req, res) => userController.login(req, res))


module.exports = userRouter