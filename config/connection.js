//Connet to mysql and export the connection

var mysql = require('mysql');

var source = {
	localhost: {
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'burgers_db'
	},
	jaws: {
		port: 3306,
        host: 'g8r9w9tmspbwmsyo.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'y9cvwb8kybj2au7s',
        password: "kidhs8m3rzm7l2y8",
        database: "i69fnoqn0j5327jg" 
	}
};

var connection = mysql.createConnection(source.jaws);

connection.connect(function (err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}
	console.log('connected as id ' + connection.threadId);
});

module.exports = connection;