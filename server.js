var express = require('express');
// System Module
var path = require('path');
// Middleware to Handle Http Post Request
var bodyParser = require('body-parser');

var cors = require('cors'); // MW to avoid cors policy error, same url front-end back-end running

// Website Pages
var index = require('./routes/index');
var tasks = require('./routes/tasks');

//Which port website will run
var port = 3300;

var app = express();

// View Engine : Which folder is used for views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');   // ejs -- Embedded JavaScript will be used
app.engine('html', require('ejs').renderFile);

//Set Static Folder: Where Angular files will be: Client Side
app.use(express.static(path.join(__dirname, 'client')));

app.use(cors());

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Setting up route
app.use('/', index);
app.use('/api', tasks);

// Listening on port
app.listen(port, function(){
    console.log('Server started on port ' + port);
});

