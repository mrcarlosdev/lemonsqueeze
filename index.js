var express = require('express');
var app = express();
var path = require('path');

const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const open = require('open');
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

async function getDBConnection(){
    const db = await sqlite.open({
        filename: "database.db",
        driver: sqlite3.Database
    });
    return db;
}

var port = 3000;
app.listen(port, function(){
    console.log('server on! http://localhost:' + port);
    open('http://localhost:' + port);
});
