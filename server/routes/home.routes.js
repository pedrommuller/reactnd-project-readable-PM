const ejs = require('ejs')
const express = require('express')
const router = new express.Router()

router.get('/', (req, res) => {
  res.render('index.ejs')
});

module.exports = router;
