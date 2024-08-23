const express = require('express');
const app = express();
const port = 3001;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./routes/users.js');
const authRoute = require('./routes/auth.js');
const postRoute = require('./routes/posts.js');
const multer = require('multer');
const path = require('path');
const {v4:uuidv4} = require('uuid');


dotenv.config();


//
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
    });

app.use('/images', express.static(path.join(__dirname, 'public/images')));// to access images in public folder

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);

// File Upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        const uniqueName = uuidv4() + path.extname(file.originalname);
       // cb(null, file.originalname);// use this when using postman
        //cb(null,req.body.name);
        cb(null, uniqueName);

    },
});


const upload = multer({ storage});
app.post('/api/upload', upload.single('file'), (req, res) => {
    try{
        return res.status(200).json('File has been uploaded');}
    catch(err){
        console.error(err);
        res.status(500).json('File upload failed');
    }
});





app.get('/', (req, res) => {
    res.send('Welcome to Homepage');
});
app.get('/users', (req, res) => {
    res.send('Welcome to Users Page');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

