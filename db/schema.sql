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
    `user_id` INT,
    `items_note` VARCHAR(254) CHARACTER SET utf8
);

-- Insert dummy Data into Items Table
INSERT INTO items VALUES (1,'Dishwasher','KitchenAid','KDTM704EBS','2013-01-01 00:00:00','XYZ123456-10',1,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.');
INSERT INTO items VALUES (2,'Clothes Washer','Samsung','WA8750','2016-06-04 00:00:00','12153232523',1,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.');
INSERT INTO items VALUES (3,'Clothes Dryer','Kenmore','81182','2009-12-09 00:00:00','D124-14331-12242',1,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.');
INSERT INTO items VALUES (4,'Furnace','Carrier','59MN7','2006-03-15 00:00:00','998182951',1,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.');
INSERT INTO items VALUES (5,'AC','Lennox','XC25','2011-04-06 00:00:00','ABC-123-XYZ-12345',2,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.');
INSERT INTO items VALUES (6,'Refridgerator','LG','LSXS26396S','2017-01-02 00:00:00','77261747716282',2,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.');
INSERT INTO items VALUES (7,'Hot Water Heater','Rheem','G100-400','2014-04-13 00:00:00','SERIAL123456',2,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.');

-- Create Tasks Table
CREATE TABLE tasks (
    `task_id` INT,
    `task_name` VARCHAR(13) CHARACTER SET utf8,
    `item_id` INT,
    `last_performed` DATETIME,
    `task_frequency` INT,
    `user_id` INT,
    `task_note` VARCHAR(254) CHARACTER SET utf8
);

-- Insert dummy Data into Tasks Table
INSERT INTO tasks VALUES (1,'Change Filter',4,'2017-11-12 00:00:00',182,1,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.');
INSERT INTO tasks VALUES (2,'Descale',7,'2015-02-16 00:00:00',1825,1,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.');
INSERT INTO tasks VALUES (3,'Change Filter',6,'2018-01-07 00:00:00',365,1,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.');
INSERT INTO tasks VALUES (4,'Clean Ducts',3,'2014-12-01 00:00:00',730,1,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.');
INSERT INTO tasks VALUES (5,'Inspect Unit',5,'2015-06-19 00:00:00',1825,2,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.');

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

