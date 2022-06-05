const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members');

const app = express();

//Init middleware
//app.use(logger);

// Handlebars middleware
//app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');

//app.get('/', (req, res) => {
//    res.send('<h1>Hello World!</h1>')
//    res.sendFile(path.join(__dirname,'public','index.html')); 
//});

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Homepage Route
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members
}));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Members API routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));