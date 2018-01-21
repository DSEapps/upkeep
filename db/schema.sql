-- Drop Upkeep Database if Exists
DROP DATABASE IF EXISTS upkeep_db;

-- Create Upkeep Database
CREATE DATABASE upkeep_db;

-- Select Upkeep Database to Use
USE upkeep_db;

-- Create Items Table
CREATE TABLE items (
    `item_id` INT,
    `type` VARCHAR(16) CHARACTER SET utf8,
    `manufacturer` VARCHAR(10) CHARACTER SET utf8,
    `model_number` VARCHAR(10) CHARACTER SET utf8,
    `date_manufactured` DATETIME,
    `serial_number` VARCHAR(17) CHARACTER SET utf8,
    `estimated_life` INT,
    `age` INT,
    `remaining_life` INT,
    `user_id` INT
);

-- Insert dummy Data into Items Table
INSERT INTO items VALUES (1,'Dishwasher','KitchenAid','KDTM704EBS','2013-01-01 00:00:00','XYZ123456-10',8,5,3,1);
INSERT INTO items VALUES (2,'Clothes Washer','Samsung','WA8750','2016-06-04 00:00:00','12153232523',7,1,6,1);
INSERT INTO items VALUES (3,'Clothes Dryer','Kenmore','81182','2009-12-09 00:00:00','D124-14331-12242',7,8,-1,1);
INSERT INTO items VALUES (4,'Furnace','Carrier','59MN7','2006-03-15 00:00:00','998182951',14,11,3,1);
INSERT INTO items VALUES (5,'AC','Lennox','XC25','2011-04-06 00:00:00','ABC-123-XYZ-12345',12,6,6,2);
INSERT INTO items VALUES (6,'Refridgerator','LG','LSXS26396S','2017-01-02 00:00:00','77261747716282',9,1,8,2);
INSERT INTO items VALUES (7,'Hot Water Heater','Rheem','G100-400','2014-04-13 00:00:00','SERIAL123456',11,3,8,2);

-- Create Tasks Table
CREATE TABLE tasks (
    `task_id` INT,
    `task_name` VARCHAR(13) CHARACTER SET utf8,
    `item_id` INT,
    `last_performed` DATETIME,
    `task_frequency` INT,
    `time_remaining` INT,
    `user_id` INT
);

-- Insert dummy Data into Tasks Table
INSERT INTO tasks VALUES (1,'Change Filter',4,'2017-11-12 00:00:00',182,112,1);
INSERT INTO tasks VALUES (2,'Descale',7,'2015-02-16 00:00:00',1825,755,1);
INSERT INTO tasks VALUES (3,'Change Filter',6,'2018-01-07 00:00:00',365,351,1);
INSERT INTO tasks VALUES (4,'Clean Ducts',3,'2014-12-01 00:00:00',730,-417,1);
INSERT INTO tasks VALUES (5,'Inspect Unit',5,'2015-06-19 00:00:00',1825,878,2);


-- Create Users Table
CREATE TABLE users (
    `user_id` INT,
    `user_email` VARCHAR(15) CHARACTER SET utf8,
    `date_created` DATETIME
);


-- Insert dummy Data into Users Table
INSERT INTO users VALUES (1,'xyz@gmail.com','2018-01-01 00:00:00');
INSERT INTO users VALUES (2,'abc@icloud.com','2018-01-03 00:00:00');
INSERT INTO users VALUES (3,'def@hotmail.com','2018-01-06 00:00:00');
INSERT INTO users VALUES (4,'ghi@outlook.com','2018-01-12 00:00:00');
INSERT INTO users VALUES (5,'jkl@aol.com','2018-01-20 00:00:00');
