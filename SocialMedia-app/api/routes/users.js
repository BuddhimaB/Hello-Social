const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');



// Update a user
router.put('/:id', async(req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);// Generate a salt
                req.body.password = await bcrypt.hash(req.body.password, salt);// Hash the password
            }catch(err){// Return an error
                return res.status(500).json(err);// Return an error
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {// Find the user by id and update
                $set: req.body,// Set the user
            });
            res.status(200).json('Account has been updated');// Return a success message
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res.status(403).json('You can update only your account');
    }
});

//delete user
router.delete('/:id', async(req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try{
            const user = await User.findByIdAndDelete(req.params.id);// Find the user by id and delete
            res.status(200).json('Account has been deleted');// Return a success message
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res.status(403).json('You can delete only your account');
    }
});

// Get a user by ID or username
router.get('/', async (req, res) => {
    const userId = req.query.userId; // Get the userId from query parameters
    const username = req.query.username; // Get the username from query parameters
    try {
        const user = userId ? await User.findById(userId) 
        : await User.findOne({ username: username }); // Find the user by id or username
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const { password, updatedAt, ...other } = user._doc; // Exclude the password and updatedAt fields
        res.status(200).json(other); // Return the user
    } catch (err) {
        res.status(500).json({ error: "Failed to get user", details: err }); // Return an error
    }
});

//get friends
router.get("/friends/:userId",async(req,res)=>{
    try{
        const user = await User.findById(req.params.userId);// Find the user by id
        const friends = await Promise.all(// Get all the friends
            user.followings.map((friendId)=>{
                return User.findById(friendId);// Find the friend by id
            }
            )
        );
        let friendList = [];// Initialize an empty array
        friends.map(friend=>{
            const {_id,username,profilePicture} = friend;// Exclude the password and updatedAt fields
            friendList.push({_id,username,profilePicture});// Push the friend to the friendList
        })
        res.status(200).json(friendList);// Return the friendList
    }catch(err){
        res.status(500).json(err);
    }
})


//follow a user

router.put('/:id/follow', async(req, res) => {
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);// Find the user by id
            const currentUser = await User.findById(req.body.userId);// Find the current user by id
            if(!user.followers.includes(req.body.userId)){// If the user is not already followed
                await user.updateOne({ $push: { followers: req.body.userId } });// Add the follower
                await currentUser.updateOne({ $push: { followings: req.params.id } });// Add the following
                res.status(200).json('user has been followed');// Return a success message
            }
            else{
                res.status(403).json('you allready follow this user');// Return an error
            }
        }catch(err){
            res.status(500).json(err);
        }
    }
    else{
        res.status(403).json('you cant follow yourself');// Return an error
    }
}
);



//unfollow a user

router.put('/:id/unfollow', async(req, res) => {
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);// Find the user by id
            const currentUser = await User.findById(req.body.userId);// Find the current user by id
            if(user.followers.includes(req.body.userId)){// If the user is not already followed
                await user.updateOne({ $pull: { followers: req.body.userId } });// Add the follower
                await currentUser.updateOne({ $push: { followings: req.params.id } });// Add the following
                res.status(200).json('user has been unfollowed');// Return a success message
            }
            else{
                res.status(403).json('you allready unfollow this user');// Return an error
            }
        }catch(err){
            res.status(500).json(err);
        }
    }
    else{
        res.status(403).json('you cant follow yourself');// Return an error
    }
}
);
module.exports = router;