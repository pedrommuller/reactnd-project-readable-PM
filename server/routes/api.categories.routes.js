const categories = require('../controllers/categories')
const config = require('../config')
const express = require('express')
const router = new express.Router()

router.get(`${config.apiPrefix}/categories`, (req, res) => {
    categories.getAll(req.token)
      .then(
          (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                  error: 'There was an error.'
              })
          }
      )
})

module.exports = router;
