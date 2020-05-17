var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const multer = require('multer');
const upload = multer({ dest: 'uploads/'});

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('uploads'));

var StoryController = require('./controller/Story.controller');
var VolumeController = require('./controller/Volume.controller');
var CategoryController = require('./controller/Category.controller');
var UserController = require('./controller/Users.controller');

const options = {
    user: 'dev-admin',
    pass: 'Dev#2134',
    auth: {
      authdb: 'magic'
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: false,
    useFindAndModify: false,
    autoIndex: true, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};

const uri = "mongodb://127.0.0.1:27017/StoryTeller";

const port = 3000;

mongoose.connect(uri, options).then(
    ()=> {
        console.log('MongoDB Connected successfully!');
    },
    err => {
        console.log('Error : '+err);
    }
);

app.get('/category', CategoryController.all);
app.put('/category', upload.single('categoryImageURL'), CategoryController.create);
app.post('/category', upload.single('categoryImageURL'), CategoryController.update);

app.get('/volume', VolumeController.all);
app.put('/volume', VolumeController.create);
app.post('/volume', VolumeController.update);

app.get('/stories', StoryController.all);
app.put('/stories', upload.single('storyURL'), StoryController.create);
app.post('/stories', upload.single('storyURL'), StoryController.update);

app.get('/users', UserController.all);
app.get('/user', UserController.id);
app.put('/user', UserController.create);
app.post('/user', UserController.update);
app.put('/user-purchase', UserController.purchase);

app.get('/', (req, res) => {
    res.send("Home Page");
});

app.listen(port, () => {
    console.log('App is running on port ', port);
});
