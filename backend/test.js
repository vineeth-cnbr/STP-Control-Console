const mysql = require('mysql');
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

var obj = {
    tank: 'C101',
    field: 'status',
    value: false
}
var query = 'UPDATE tank SET ' + obj.field + "=" + obj.value + " where id ='" + obj.tank + "';"; 

db.query(query, (error, results, fields) =>{
    if(error){
        console.log(results);
        // res.send(error);
    }else {
        console.log(results)
        // consoresults);
    }
})