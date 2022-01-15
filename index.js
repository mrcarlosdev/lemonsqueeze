var express = require('express');
var app = express();
var path = require('path');
let bodyParser = require('body-parser');

const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const open = require('open');
const { equal } = require('assert');
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

async function getDBConnection(){
    const db = await sqlite.open({
        filename: "database.db",
        driver: sqlite3.Database
    });
    return db;
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/SaveQuestion", async function(req, res) {
    let db = await getDBConnection();
    var errors=[]
    var data = {
        surveyPageId: req.body.surveyPageId,
        questionText: req.body.questionText,
        questionType: req.body.questionType,
        options: req.body.options,
        availablePoints: req.body.availablePoints
    }
    var sql ='INSERT or IGNORE INTO questions (surveyPageId, questionText, questionType, options, availablePoints) VALUES (?, ?, ?, ?, ?)'
    var params =[data]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
    res.send(req.body.questionText);
})

var port = 3000;
app.listen(port, function(){
    console.log('server on! http://localhost:' + port);
    open('http://localhost:' + port);
});
