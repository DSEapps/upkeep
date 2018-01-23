# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.20)
# Database: upkeep_db
# Generation Time: 2018-01-22 21:48:42 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table items
# ------------------------------------------------------------

-- Drop Upkeep Database if Exists
DROP DATABASE IF EXISTS upkeep_db;

-- Create Upkeep Database
CREATE DATABASE upkeep_db;

-- Select Upkeep Database to Use
USE upkeep_db;

DROP TABLE IF EXISTS `items`;

CREATE TABLE `items` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(16) DEFAULT NULL,
  `manufacturer` varchar(10) DEFAULT NULL,
  `model_number` varchar(10) DEFAULT NULL,
  `date_installed` datetime DEFAULT NULL,
  `serial_number` varchar(17) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `items_note` varchar(254) DEFAULT NULL,
  PRIMARY KEY (`item_id`),
  KEY `User Items` (`user_id`),
  CONSTRAINT `User Items` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;

INSERT INTO `items` (`item_id`, `type`, `manufacturer`, `model_number`, `date_installed`, `serial_number`, `user_id`, `items_note`)
VALUES
	(1,'Dishwasher','KitchenAid','KDTM704EBS','2013-01-01 00:00:00','XYZ123456-10',1,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.'),
	(2,'Clothes Washer','Samsung','WA8750','2016-06-04 00:00:00','12153232523',1,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.'),
	(3,'Clothes Dryer','Kenmore','81182','2009-12-09 00:00:00','D124-14331-12242',1,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.'),
	(4,'Furnace','Carrier','59MN7','2006-03-15 00:00:00','998182951',1,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.'),
	(5,'AC','Lennox','XC25','2011-04-06 00:00:00','ABC-123-XYZ-12345',2,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.'),
	(6,'Refridgerator','LG','LSXS26396S','2017-01-02 00:00:00','77261747716282',2,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.'),
	(7,'Hot Water Heater','Rheem','G100-400','2014-04-13 00:00:00','SERIAL123456',2,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.');

/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table tasks
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tasks`;

CREATE TABLE `tasks` (
  `task_id` int(11) NOT NULL AUTO_INCREMENT,
  `task_name` varchar(13) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `last_performed` datetime DEFAULT NULL,
  `task_frequency` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `task_note` varchar(254) DEFAULT NULL,
  PRIMARY KEY (`task_id`),
  KEY `Item Tasks` (`item_id`),
  KEY `User Tasks` (`user_id`),
  CONSTRAINT `Item Tasks` FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `User Tasks` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;

INSERT INTO `tasks` (`task_id`, `task_name`, `item_id`, `last_performed`, `task_frequency`, `user_id`, `task_note`)
VALUES
	(1,'Change Filter',4,'2017-11-12 00:00:00',182,1,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.'),
	(2,'Descale',7,'2015-02-16 00:00:00',1825,1,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.'),
	(3,'Change Filter',6,'2018-01-07 00:00:00',365,1,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.'),
	(4,'Clean Ducts',3,'2014-12-01 00:00:00',730,1,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.'),
	(5,'Inspect Unit',5,'2015-06-19 00:00:00',1825,2,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.');

/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(15) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`user_id`, `user_email`, `date_created`)
VALUES
	(1,'xyz@gmail.com','2018-01-01 00:00:00'),
	(2,'abc@icloud.com','2018-01-03 00:00:00'),
	(3,'def@hotmail.com','2018-01-06 00:00:00'),
	(4,'ghi@outlook.com','2018-01-12 00:00:00'),
	(5,'jkl@aol.com','2018-01-20 00:00:00');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;



-- * Inner Join SQL (Selects task_name for all matches of where user_id is in both tables)
SELECT tasks.task_name, tasks.task_frequency
FROM tasks
INNER JOIN users ON tasks.user_id = users.user_id;


-- * Left Join SQL (Returns all values from table 1 that match records from table 2)
SELECT users.user_email, items.type, items.manufacturer, items.model_number
FROM items
LEFT JOIN users ON items.user_id = users.user_id;
