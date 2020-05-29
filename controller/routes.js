const express = require('express');
const controller = express.Router();

var DAO = require('../model/nedb');
var dbFile = 'database.nedb.db';// use the next line for an embeded database
let dao = new DAO(dbFile);
// use the next statement if running in memory mode
//dao.init(); 

controller.get("/index", function (request, response) {
    dao.getAllEntries()
        .then((list) => {
            response.render("show-all", {
                "title": 'Database Example',
                "entries": list
            });
            //console.log("Render all entries in a list:", list);
        })
        .catch((err) => {
            console.log('Error retrieving all students:', err);
        });
});

//didn't like the 404
controller.get('/', function(request, response) {
    response.redirect("/index");
})

controller.get('/add', function(request, response) {
    response.render("new-item", {'title':'Database Example'});
    console.log("Render new element form");
})

controller.get('/delete/:entry', function(request, response) {
    //console.log('Delete link clicked with argument', request.params.entry);
    dao.deleteEntry(request.params.entry);
    response.redirect("/index");
})

controller.get('/edit/:entry', function(request, response) {
    dao.getOneEntry(request.params.entry)
    .then((list) => {
        console.log("Render edit  page with", list);
        response.render("edit-entry", {
            "title": "Database Example",
            "item":list
        });
    })
    .catch((err) => {
        console.log('Error getting data:', request.params.entry, err);
    });
})

//this is much easier with sessions, see week 10
controller.post('/edit/:entry', function(request, response) {
    console.log('Edit post link clicked for ', request.params.entry);
    var grunt = (/true/i).test(request.body.status);
    dao.updateEntry( request.body.todo,request.body.notes, grunt);
    response.redirect("/index");
})


controller.post('/add', function (request, response) {
    if (!request.body.todo) {
        response.status(400).send("A new item must be provided.");
        return;
    }
    console.log('Add post  for', request.params.notes);
    var grunt = (/true/i).test(request.body.status);
    dao.addEntry( request.body.todo, request.body.notes, grunt);
    response.redirect("/index");
});


module.exports = controller;