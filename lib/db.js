var mysql = require('mysql');
var connection = mysql.createConnection({
	host:'78.110.166.178',
	user:'bonusplugin_user',
	password:'gdbs$hNr9Q$4TtNfk6',
	database:'eFood'
});
connection.connect(function(error){
	if(!!error) {
		console.log(error);
	} else {
		console.log('Connected..!');
	}
});

module.exports = connection;