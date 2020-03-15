const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')


router.get('/', userController.allUsers)
router.get('/:userId', userController.singleUser)
router.post('/create', userController.addUser)
router.put('/edit/:userId', userController.editUser)
router.delete('/delete/:userId', userController.deleteUser)


module.exports = router