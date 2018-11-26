const router = require('express').Router()
const UserSettings = require('../db/models/userSettings')
module.exports = router


router.get('/:id', async (req, res, next) => {
  try{
    const id = req.params.id
    const city = await UserSettings.findOne({where: {userId: id}})
    res.json(city)
  }
  catch(err){next(err)}
})


router.post('/', async(req, res, next) => {
    try {
      const user = await UserSettings.create(req.body)
      res.json(user)
    }
    catch(err){
      next(err)
    }
  })



router.put('/:id', async(req, res, next) => {
    try {
      const id = req.params.id
      const user = await UserSettings.findOrCreate({where: {userId: id}})
      await UserSettings.update({city: req.body.city},{where: {userId: id}})

      res.json(user)
    }
    catch(err){
      next(err)
    }
  })