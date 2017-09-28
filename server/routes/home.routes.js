const ejs = require('ejs')
const express = require('express')
const router = new express.Router()


router.get('/:category?/:post_id?', (req, res) => {
  res.render('index.ejs')
});

module.exports = router;
