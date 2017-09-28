const comments = require('../controllers/comments')
const config = require('../config')
const express = require('express')
const bodyParser = require('body-parser')

const router = new express.Router()


router.get(`${config.apiPrefix}/posts/:id/comments`, (req, res) => {
    comments.getByParent(req.token, req.params.id)
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

router.get(`${config.apiPrefix}/comments/:id`, (req, res) => {
    comments.get(req.token, req.params.id)
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

router.put(`${config.apiPrefix}/comments/:id`, bodyParser.json(), (req, res) => {
    comments.edit(req.token, req.params.id, req.body)
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

router.post(`${config.apiPrefix}/comments`, bodyParser.json(), (req, res) => {
    comments.add(req.token, req.body)
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

router.post(`${config.apiPrefix}/comments/:id`, bodyParser.json(), (req, res) => {
    const { option } = req.body
    comments.vote(req.token, req.params.id, option)
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

router.delete(`${config.apiPrefix}/comments/:id`, (req, res) => {
    comments.disable(req.token, req.params.id)
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
