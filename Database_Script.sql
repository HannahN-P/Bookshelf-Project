/*
SQLyog Community v12.5.1 (64 bit)
MySQL - 5.7.21-log : Database - bookshelfdb
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`bookshelfdb` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `bookshelfdb`;

/*Table structure for table `bookmarks` */

DROP TABLE IF EXISTS `bookmarks`;

CREATE TABLE `bookmarks` (
  `UserID` varchar(100) DEFAULT NULL,
  `PageNumber` int(11) DEFAULT NULL,
  `BookID` int(11) DEFAULT NULL,
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ID`),
  KEY `Username_FK` (`UserID`),
  CONSTRAINT `Username_FK` FOREIGN KEY (`UserID`) REFERENCES `users` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

/*Table structure for table `books` */

DROP TABLE IF EXISTS `books`;

CREATE TABLE `books` (
  `Title` varchar(200) NOT NULL,
  `Author` varchar(50) DEFAULT NULL,
  `Pages` int(11) DEFAULT NULL,
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `UserID` varchar(20) NOT NULL,
  PRIMARY KEY (`Title`,`ID`,`UserID`),
  KEY `ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

/*Table structure for table `bookshelf` */

DROP TABLE IF EXISTS `bookshelf`;

CREATE TABLE `bookshelf` (
  `BookID` int(11) DEFAULT NULL,
  `LocationID` int(100) DEFAULT NULL,
  KEY `BookID_FK` (`BookID`),
  KEY `LocationID_FK` (`LocationID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `location` */

DROP TABLE IF EXISTS `location`;

CREATE TABLE `location` (
  `Row` int(11) DEFAULT NULL,
  `Column` int(11) DEFAULT NULL,
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `username` varchar(30) NOT NULL,
  `password` varchar(200) NOT NULL,
  `FirstName` varchar(30) DEFAULT NULL,
  `LastName` varchar(30) DEFAULT NULL,
  `id` int(11) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
