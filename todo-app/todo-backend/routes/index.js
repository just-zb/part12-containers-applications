const express = require('express');
const router = express.Router();
const { getAsync } = require('../redis')
const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (_, res) => {
  await getAsync('added_todos').then(
    added_todos => {
      res.send({ added_todos:parseInt(added_todos) })
    }
  )
}
)

module.exports = router;
