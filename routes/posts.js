const express = require('express')
const router = express.Router()
const Post = require('../models/Post')


//Retreive all the posts
router.get('/', async (req, res) => {
  
  try {
    const posts = await Post.find()
    //  res.send(posts)
     return res.json(posts)
  } catch (err) {res.json({message: err})}
})

//Submit post
router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  })
  try {
    const savedPost = await post.save()
    res.json(savedPost)
  } catch(err) {res.json({message: err})}

})


//Specific post by ID
router.get('/:postID', async (req,res) => {
  try {
    const post = await Post.findById(req.params.postID)
    res.json(post)
  } catch (err) { res.json({ message: err})}
})

// remove post by ID
router.delete('/:postID', async (req, res) => {
  try {
    const removePost = await Post.deleteOne({_id: req.params.postID})
    res.json(removePost)
  } catch (err) {
    res.json({message: err})
  }
})



//update a post

router.patch('/:postID', async (req, res) => {
  try {
    const updatedPost = await Post.updateOne({ _id: req.params.postID}, { $set: { 
      title: req.body.title,
      content: req.body.content
    }})
    res.json(updatedPost)
  } catch(err) {
    res.json({ message: err})
  }
})



module.exports = router