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

app.set('port', process.env.port || port);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

// app.use("/",express.static(path.join(__dirname, 'public/login'))); 
app.use("/",express.static(path.join(__dirname, 'build')));

app.use("/dashboard", express.static(path.join(__dirname, 'build')))



app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
