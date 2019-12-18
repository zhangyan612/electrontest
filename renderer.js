// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

function el(selector) {
    return document.getElementById(selector);
}

el('action-btn').addEventListener('click', function(){
    // Get the mysql service
    getFirstTenRows(function(rows){
        var html = '';

        rows.forEach(function(row){
            html += '<tr>';
            html += '<td>';
            html += row.id;
            html += '</td>';
            html += '<td>';
            html += row.name;
            html += '</td>';
            html += '</tr>';
            console.log(row);
        });

        document.querySelector('#table > tbody').innerHTML = html;
    });
},false);

function getFirstTenRows(callback){
    var sql = require('mysql');

    var config = {
        user: '',
        password: '',
        server: 'localhost', 
        database: 'SchoolDB' 
    };

    // connect to your database
    sql.connect(config, function (err) {

        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
            
        // query to the database and get the records
        request.query('select * from Student', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            callback(recordset);
        });
    });

    sql.end(function(){
        // The connection has been closed
    });

    
    // // connect to mysql
    // connection.connect(function(err) {
    //     // in case of error
    //     if(err){
    //         console.log(err.code);
    //         console.log(err.fatal);
    //     }
    // });


    // // Perform a query
    // $query = 'SELECT `id`,`name` FROM `articles` LIMIT 10';

    // connection.query($query, function(err, rows, fields) {
    //     if(err){
    //         console.log("An error ocurred performing the query.");
    //         console.log(err);
    //         return;
    //     }

    //     callback(rows);

    //     console.log("Query succesfully executed");
    // });

    // // Close the connection
    // connection.end(function(){
    //     // The connection has been closed
    // });
}
