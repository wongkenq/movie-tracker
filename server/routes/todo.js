const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo');

router.get('/', todoController.getAllTodos);
router.post('/createTodo', todoController.createTodo);
router.put('/todo/update/:id', todoController.updateTodo);
router.put('/todo/complete/:id', todoController.completeTodo);
router.delete('/todo/delete/:id', todoController.deleteTodo);

module.exports = router;
