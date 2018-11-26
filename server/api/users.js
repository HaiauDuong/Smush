const router = require('express').Router()
const {User} = require('../db/models')
const UserSettings = require('../db/models/userSettings')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})


router.put('/:id', async(req, res, next) => {
  try {
    const id = req.params.id
    const user = await User.findById(id)
    user.update(req.body)
    res.json(user)
  }
  catch(err){
    next(err)
  }
})