const posts = require('../controllers/posts')
const config = require('../config')
const express = require('express')
const bodyParser = require('body-parser')
const router = new express.Router()

router.get(`${config.apiPrefix}/:category/posts`, (req, res) => {
    posts.getByCategory(req.token, req.params.category)
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

router.get(`${config.apiPrefix}/posts`, (req, res) => {
    posts.getAll(req.token)
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

router.post(`${config.apiPrefix}/posts`, bodyParser.json(), (req, res) => {
    posts.add(req.token, req.body)
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

router.get(`${config.apiPrefix}/posts/:id`, (req, res) => {
    posts.get(req.token, req.params.id)
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

router.delete(`${config.apiPrefix}/posts/:id`, (req, res) => {
    posts.disable(req.token, req.params.id)
      .then(
          (post) => {
              comments.disableByParent(req.token, post)
          })
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

router.post(`${config.apiPrefix}/posts/:id`, bodyParser.json(), (req, res) => {
    const { option } = req.body
    const id = req.params.id
    posts.vote(req.token, id, option)
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

router.put(`${config.apiPrefix}/posts/:id`, bodyParser.json(), (req, res) => {
    posts.edit(req.token, req.params.id, req.body)
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
