const router = require('express').Router(); // Import express and create a router
const User = require('../models/User'); // Import the User model
const Post = require('../models/post'); // Import the Post model

// Create a post
router.post('/', async(req, res) => {
    const newPost = new Post(req.body);// Create a new post
    try{
        const savedPost = await newPost.save();// Save the post
        res.status(200).json(savedPost);// Return the saved post
    }catch(err){
        res.status(500).json(err);// Return an error
    }
});
//update post
router.put('/:id', async(req, res) => {
    try{
        const post = await Post.findById(req.params.id);// Find the post
        if(post.userId === req.body.userId){
            await post.updateOne({$set: req.body});// Update the post
            res.status(200).json("The post has been updated");// Return a message
        }else{
            res.status(403).json("You can update only your post");// Return an error
        }
    }catch(err){
        res.status(500).json(err);// Return an error
    }
});

//delete post
router.delete('/:id', async(req, res) => {
    try{
        const post = await Post.findById(req.params.id);// Find the post
        if(post.userId === req.body.userId){
            await post.deleteOne();// Delete the post
            res.status(200).json("The post has been deleted");// Return a message
        }else{
            res.status(403).json("You can delete only your post");// Return an error
        }
    }catch(err){
        res.status(500).json(err);// Return an error
    }
});
//like a post
router.put('/:id/like', async(req, res) => {
    try{
        const post = await Post.findById(req.params.id);// Find the post
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push: {likes: req.body.userId}});// Like the post
            res.status(200).json("The post has been liked");// Return a message
        }else{
            await post.updateOne({$pull: {likes: req.body.userId}});// Unlike the post
            res.status(200).json("The post has been disliked");// Return a message
        }
    }catch(err){
        res.status(500).json(err);// Return an error
    }
});

//get a post
router.get('/:id', async(req, res) => {
    try{
        const post = await Post.findById(req.params.id);// Find the post
        res.status(200).json(post);// Return the post
    }catch(err){
        res.status(500).json(err);// Return an error
    }
});

//get timeline posts
router.get('/timeline/:userId', async(req, res) => {
    
    try{
        const currentUser = await User.findById(req.params.userId);// Find the current user
        const userPosts = await Post.find({ userId: currentUser._id });// Find the user's posts
        const friendPosts = await Promise.all(
            currentUser.followings.map(friendId => {
                return Post.find({ userId: friendId });// Find the posts of the user's friends
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts));// Return the posts
    }catch(err){
        res.status(500).json(err);// Return an error
    }
});

//get user's all posts
router.get('/profile/:username', async(req, res) => {
    try{
        const user = await User.findOne({ username: req.params.username });// Find the user
        const posts = await Post.find({ userId: user._id });// Find the user's posts
        res.status(200).json(posts);// Return the posts
    }catch(err){
        res.status(500).json(err);// Return an error
    }
}
);


module.exports = router; // Export the router
