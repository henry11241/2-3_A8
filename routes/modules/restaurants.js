const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
router.get('/new', (req, res) => {
  res.render('new')
})
router.post('/', (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch(error => {
      console.log(error)
      res.render(
        'errorPage',
        { error: err.message }
      )
    })
})
router.get('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => {
      console.log(error)
      res.render(
        'errorPage',
        { error: err.message }
      )
    })
})
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => {
      console.log(error)
      res.render(
        'errorPage',
        { error: err.message }
      )
    })
})
router.put('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => {
      console.log(error)
      res.render(
        'errorPage',
        { error: err.message }
      )
    })
})
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => {
      console.log(error)
      res.render(
        'errorPage',
        { error: err.message }
      )
    })
})
module.exports = router