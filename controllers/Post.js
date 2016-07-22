const router = require('express').Router();
var Post = require('../models/Post');
var Remarkable = require('remarkable');

var md = new Remarkable();
/*


var marked = require('marked');

marked.setOptions({
  gfm: false
})*/

router.get('/', function (req, res) {
  Post.find({ status: 'launched' }).populate('_author').exec(function (err, posts) {
    posts = posts.map(post => {
      post.content = md.render(post.content)
      return post
    })

    res.render('post/list', {
      posts
    })
  })
})

router.get('/post/:id', function (req, res) {
  var id = req.params.id
  Post.findOne({ _id: id, status: 'launched' }).populate('_author').exec(function (err, post) {
    if (!post) return res.redirect('/blog')
    post.content = md.render(post.content)
    res.render('post/view', {
      post
    })
  })
})

module.exports = router
