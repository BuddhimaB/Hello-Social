const mongoose = require('mongoose');
 
const PostSchema = new mongoose.Schema({    // Create a new schema
    userId: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        max: 500,
    },
    img: {
        type: String,
    },
    likes: {
        type: Array,
        default: [],
    },
},
    { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema); // Export the model



