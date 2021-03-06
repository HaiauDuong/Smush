const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/todo', require('./todo'))
router.use('/userSettings', require('./userSettings'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
