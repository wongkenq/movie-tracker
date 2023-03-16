const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.get('/users/getUser/:id', usersController.getUser);
// router.get('/users', usersController.getAllUsers);
router.post('/users/createUser', usersController.createUser);
router.put('/users/addFav/:id', usersController.addFav);
router.put('/users/delFav/:id', usersController.delFav);
// router.put('/todo/update/:id', usersController.updateTodo);
// router.put('/todo/complete/:id', usersController.completeTodo);
// router.delete('/todo/delete/:id', usersController.deleteTodo);

module.exports = router;
