const express = require('express')

var userController = require('../src/user/userController'); // Import studentController
const router = express.Router();

router.route('/user/login').post(userController.loginUserControllerFn);
router.route('/user/create').post(userController.createUserControllerFn);
router.route('/user/delete').post(userController.deleteUserControllerFn);


module.exports = router;
