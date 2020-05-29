var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3000);

var mustache = require('mustache-express'),
path = require('path');
app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', path.resolve(__dirname, 'views'));


bodyParser = require('body-parser'),
controller = require('./controller/routes.js');



//var staticPath = path.resolve(__dirname, "/static");
app.use(express.static('static'));

app.use(bodyParser.urlencoded({extended: true}));

app.use('/', controller);

app.use(function (req, res) {
    res.status(404);
    res.type('text/plain');
    res.send("404 - Not found.");
});

app.listen(app.get('port'), function () {
    console.log('server started, ctl^c to quit');
})




/*var DAO = require('./model/nedb');
var dbFile = 'database.nedb.db';
let dao = new DAO(dbFile);
dao.init();

//write the data returned by the all() function to the console
console.log("calling dao.all() in index: ", dao.all());



var data={'entries':[
    {'todo': "Feed the cat", 'done': false},
    {'todo': "Do the shopping", 'done': false},
    {'todo': "Water the plants", 'done': false},
  ]};

  app.get("/", function(request, response) {
    dao.all()
        .then((list) => {
            //requires {{#entries}} in template page.mustache
            response.render("page", {
                "title": "Guest Book",
                "entries": list
            });
            console.log("request to / processed with: " , list);
        })
        .catch((err) => {
            console.log('Error: ')
            console.log(JSON.stringify(err))
        });       
});



app.get("/page1", function(request, response) {
    response.render("page1", {
        'title':'Guest Book',
        'entries':[
            {
             'subject':'Good day out',
            'review' : 'We had a really good time visiting the museum.'
            },
            {
                'subject':'Liked the exhibition',
               'review' : 'Enjoyed the display.'
               },
               {
                'subject':'Feedback',
               'review' : 'enjoyable day.'
               }
            ]
 });
});

app.get("/page2", function (request, response) {
    response.status(200);
    response.type('text/html');
    response.send('<!DOCTYPE html>'+'<html><head>'+'</head><body>'+'<p>page 2</p>'+'<ul>'+'<li><a href="/page1"> page 1 </a>'+'</li>'+'<li> <a href="/page2"> page 2 </a>'+'</li>'+'</ul>'+'</body></html>');
});

app.get("/page3", function(request, response) {
    response.render("page3", data);
})

app.get("/guests", function(request, response) {
    response.render("guestbook", {
        'title':'Guest Book',
        'entries':[
            {
             'subject':'Good day out',
            'review' : 'We had a really good time visiting the museum.'
            },
            {
                'subject':'Liked the exhibition',
               'review' : 'Enjoyed the display.'
               },
               {
                'subject':'Feedback',
               'review' : 'enjoyable day.'
               }
            ]
 });
});


// a custom 404 page
app.use(function (req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

// a custom 500 page
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});
app.listen(app.get('port'), function () {
console.log('Express started on http://localhost:' + 
app.get('port') + '; press Ctrl-C to terminate.'
    );
});
*/