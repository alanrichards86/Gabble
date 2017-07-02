const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const validator = require('express-validator');
const mustache = require('mustache');
const mustacheExpress = require('mustache-express');
const path = require('path');
const routes = require('./routes/routes.js');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.engine('mustache', mustacheExpress());
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'mustache');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(validator());

app.use(session({
  secret: 'I Love Pie',
  resave: false,
  saveUninitialized: false
}));

app.set('layout', 'main');



app.use('/', routes);



app.listen(3002, function(req, res){
  console.log('Lets have fun coding !!!')
});
