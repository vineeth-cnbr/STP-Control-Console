const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const port = 8080;
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'stp'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.set('port', process.env.port || port);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

// app.use("/",express.static(path.join(__dirname, 'public/login'))); 
// app.use("/",express.static(path.join(__dirname, 'build')));

// app.use("/dashboard", express.static(path.join(__dirname, 'build')))
// var query = ''
app.get("/tank/:id", (req, res) => {
    console.log("GET TANK ID");
    var { id } = req.params;
    const query = 'SELECT * FROM TANK WHERE ID=' + "'"+id+"'"+';';
    db.query(query, (error, results, fields) =>{
        if(error){
            console.log(results);
            res.send(error);
        }else {
            console.log(results)
            res.send(results);
        }
    })

})

app.post("/tank/:id", (req,res) => {
    var { status } = req.body;
    var { id } = req. params;
    console.log(status);
    res.send("OK");

})



app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
