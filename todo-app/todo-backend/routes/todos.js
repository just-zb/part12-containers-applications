const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const {getAsync, setAsync} = require('../redis');
const { get } = require('mongoose');
/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  getAsync('added_todos').then(
    added_todos => {
      if (added_todos == null) {
        added_todos = "0"
      }
      setAsync('added_todos', parseInt(added_todos) + 1)
    }
  )
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  Todo.findByIdAndUpdate(req.todo._id, req.body, { new: true }, (err, todo) => {
      if (err) return res.status
})
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
