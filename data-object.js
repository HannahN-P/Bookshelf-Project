var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

/*Table structure for table `bookmarks` */
var sql = "";
function callSql(sql, table) {
    connection.query(sql, function (err, rows, fields) {
        if (!!err) {
            console.log('Error in query ' + err);
        } else {
            console.log(table + ' successfully\n');
        }
    });
};

sql = "DROP TABLE IF EXISTS `bookmarks`";
callSql(sql, "Bookmarks dropped");
sql = "CREATE TABLE `bookmarks` (" +
    "  `UserID` varchar(100) DEFAULT NULL," +
    "  `PageNumber` int(11) DEFAULT NULL," +
    "  `BookID` int(11) DEFAULT NULL," +
    "  `ID` int(11) NOT NULL AUTO_INCREMENT," +
    "  PRIMARY KEY (`ID`)," +
    "  KEY `Username_FK` (`UserID`)," +
    "  CONSTRAINT `Username_FK` FOREIGN KEY (`UserID`) REFERENCES `users` (`username`)" +
    ") ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8";
callSql(sql, "Bookmarks created");
/*Table structure for table `books` */

sql = "DROP TABLE IF EXISTS `books`";
callSql(sql, "Books dropped");
sql = "CREATE TABLE `books` (" +
    "  `Title` varchar(200) NOT NULL," +
    "  `Author` varchar(50) DEFAULT NULL," +
    "  `Pages` int(11) DEFAULT NULL," +
    "  `ID` int(11) NOT NULL AUTO_INCREMENT," +
    "  `UserID` varchar(20) NOT NULL," +
    "  PRIMARY KEY (`Title`,`ID`,`UserID`)," +
    "  KEY `ID` (`ID`)" +
    ") ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8";
callSql(sql, "Books created");
/*Table structure for table `bookshelf` */

sql = "DROP TABLE IF EXISTS `bookshelf`";
callSql(sql, "Bookshelf dropped");
sql = "CREATE TABLE `bookshelf` (" +
    "  `BookID` int(11) DEFAULT NULL," +
    "  `LocationID` int(100) DEFAULT NULL," +
    "  KEY `BookID_FK` (`BookID`)," +
    "  KEY `LocationID_FK` (`LocationID`)" +
    ") ENGINE=InnoDB DEFAULT CHARSET=utf8";
callSql(sql, "Bookshelf created");
/*Table structure for table `location` */

sql = "DROP TABLE IF EXISTS `location`";
callSql(sql, "Location dropped");
sql = "CREATE TABLE `location` (" +
    "  `Row` int(11) DEFAULT NULL," +
    "  `Column` int(11) DEFAULT NULL," +
    "  `ID` int(11) NOT NULL AUTO_INCREMENT," +
    "  PRIMARY KEY (`ID`)" +
    ") ENGINE=InnoDB DEFAULT CHARSET=utf8";
callSql(sql, "Location created");
/*Table structure for table `users` */

sql = "DROP TABLE IF EXISTS `users`";
callSql(sql, "Users dropped");
sql = "CREATE TABLE `users` (" +
    "  `username` varchar(30) NOT NULL," +
    "  `password` varchar(200) NOT NULL," +
    "  `FirstName` varchar(30) DEFAULT NULL," +
    "  `LastName` varchar(30) DEFAULT NULL," +
    "  `id` int(11) NOT NULL," +
    "  PRIMARY KEY (`username`)" +
    ") ENGINE=InnoDB DEFAULT CHARSET=utf8";
callSql(sql, "Users created");