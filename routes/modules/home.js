const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => {
      console.log(error)
      res.render(
        'errorPage',
        { error: err.message }
      )
    })
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find()
    .lean()
    .then(restaurants => {
      const filteredRestaurants = restaurants.filter(
        data =>
          data.name.toLowerCase().includes(keyword.trim().toLowerCase()) ||
          data.category.toLowerCase().includes(keyword.trim().toLowerCase())
      )
      res.render('index', { restaurants: filteredRestaurants, keyword })
    })
    .catch(error => {
      console.log(error)
      res.render(
        'errorPage',
        { error: err.message }
      )
    })
})

module.exports = router