const router = require('express').Router()
const Todo = require('../db/models/Todo')

router.get('/', async (req, res, next) => {
  try {
    const todos = await Todo.findAll()
    res.json(todos)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const todo = await Todo.create(req.body)
    res.json(todo)
  } catch (err) {
    next(err)
  }
})

router.delete('/:todoId', (req, res, next) => {
  Todo.destroy({
    where: {
      id: req.params.todoId
    }
  })
    .then(() => res.status(204).end())
    .catch(next)
})

module.exports = router
