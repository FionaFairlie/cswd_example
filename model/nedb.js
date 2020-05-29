/*
 * Implement a DAO using the `nedb` database.  Its simple to use and is compatible
 * with MongoDB if something more Enterprisey is required
 */

//import the nedb module
var Datastore = require('nedb');

class DAO {
    //the class can be instantiated with the db in embedded mode by providing a data file
    //or in-memory mode without it
    constructor(dbFilePath) {
        if (dbFilePath) {
            //embedded
            this.db = new Datastore({ filename: dbFilePath, autoload: true });
        } else {
            //in memory 
            this.db = new Datastore();
        }
    }
/*
    // method to seed the database for in-memory use
    init() {
        this.db.insert({
             "todo":"walk the dog","notes":"meet Jo in the park","status":false
        }, function (err, doc) {
            if (err) {
                console.log('Eror inserting document into the database', err);
            } else {
                console.log('Document inserted into database');
            }
        });
    };
*/
    //delete single student identified by name
    deleteEntry(entry) {
        //console.log("deleting entry:", entry);
        this.db.remove({ "todo": entry }, {}, function (err, numRemoved) {
            if (err) {
                console.log('Error deleting entry', entry, err);
            } else {
                console.log('delete entry:', entry, numRemoved);
            }
        });
    }

    updateEntry(todo,notes,status) {
        this.db.update({"todo": todo }, { $set: {"notes": notes,"status": status }},
            function (err, numReplaced) {
                if (err) {
                    console.log('Error updating entry', todo, err);
                } else {
                    console.log('update entry:',todo);
                }
            });
    }

    //insert a new item
    addEntry(todo,notes, status) {
        var entry = {
            todo: todo,
            notes:notes,
            status:status,
        };

        this.db.insert(entry, function (err, doc) {
            if (err) {
                console.log("Error inserting document into database", title);
            } else {
                console.log('add entry:', todo);
            }
        });
    }

    //retrieve one student by student name
    getOneEntry(todo) {
        return new Promise((resolve, reject) => {
            this.db.find({ "todo": todo }, function (err, entries) {
                if (err) {
                    reject(err);
                    //console.log('getOneEntry Promise rejected for ',todot);
                } else {
                    resolve(entries);
                    //console.log('getOneEntry Promise resolved for ', todo);
                }
            });
        });
    }

    //retrieve all students
    getAllEntries() {
        return new Promise((resolve, reject) => {
            this.db.find({}, function (err, entries) {
                if (err) {
                    reject(err);
                    //console.log('getAllEntries Promise rejected');
                } else {
                    resolve(entries);
                    //console.log('getAllEntries Promise resolved');
                }
            });
        });
    }

}

//make the module visible
module.exports = DAO;