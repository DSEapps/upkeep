-- THIS FILE IS USED TO ADD DATA TO UPKEEP_DB
-- BEFORE RUNNING THIS IN SEQUEl PRO, BE SURE THAT UPKEEP_DB EXISTS
-- THEN RUN SERVER.JS TO CREATE TABLES

-- SETUP USERS TABLE
-- Insert Data into Users Table
--                  user_id, user_email,         google_id,   createdAt,            updatedAt
INSERT INTO users VALUES (1,'xyz@gmail.com',    'UA-32541-9','2018-01-01 00:00:00','2018-01-01 00:00:00');
INSERT INTO users VALUES (2,'abc@icloud.com',   'UA-58712-4','2018-01-03 00:00:00','2018-01-01 00:00:00');
INSERT INTO users VALUES (3,'def@hotmail.com',  'UA-43221-1','2018-01-06 00:00:00','2018-01-01 00:00:00');
INSERT INTO users VALUES (4,'ghi@outlook.com',  'UA-97991-5','2018-01-12 00:00:00','2018-01-01 00:00:00');
INSERT INTO users VALUES (5,'jkl@aol.com',      'UA-08317-2','2018-01-20 00:00:00','2018-01-01 00:00:00');


-- NEW USER CREATES ITEM AND 4 TASKS
-- Simulate creating new Item for User 3 (def@hotmail.com)
-- Write Item (House)    item_id, type, manufacturer, model_number, date_installed, serial_number, complex, items_note, createAt, updateAt, userUserId
INSERT INTO items VALUES (1,'House','NULL','NULL','2013-01-01 00:00:00','NULL','FALSE','Lorem ipsum dolor sit amet.','2016-01-01 00:00:00','2016-01-20 00:00:00',3);

-- Simulate creates 4 new Tasks associated to Item 1 (House) and User 3 (def@hotmail.com)
-- Write Task (Related to 'House') task_id, task_name, last_performed, task_frequency, task_note, createdAt, updatedAt, itemItemId, userUserId
INSERT INTO tasks VALUES (1,'Paint House',  '2017-11-12 00:00:00',72,'Lorem ipsum dolor sit amet','2018-01-16 00:00:00','2018-01-23 00:00:00',1,3);
INSERT INTO tasks VALUES (2,'Paint Fence',  '2013-02-15 00:00:00',48,'Lorem ipsum dolor sit amet','2018-01-16 00:00:00','2018-01-23 00:00:00',1,3);
INSERT INTO tasks VALUES (3,'Clean Gutters','2012-07-19 00:00:00',12,'Lorem ipsum dolor sit amet','2018-01-16 00:00:00','2018-01-23 00:00:00',1,3);
INSERT INTO tasks VALUES (4,'Sweep Chimney','2016-10-02 00:00:00',36,'Lorem ipsum dolor sit amet','2018-01-16 00:00:00','2018-01-23 00:00:00',1,3);





-- NEW USER CREATES ITEM AND 3 TASKS
-- Simulate creating new Item for User 5 (jkl@aol.com)
-- Write Item (Auto)    item_id, type, manufacturer, model_number, date_installed, serial_number, complex, items_note, createAt, updateAt, userUserId
INSERT INTO items VALUES (2,'Auto','Honda','Pilot','2013-01-01 00:00:00','SLR123XX987321','TRUE','Lorem ipsum dolor sit amet.','2016-01-01 00:00:00','2016-01-20 00:00:00',5);

-- Simulate creates 3 new Tasks associated to Item 2 (Auto) and User 5 (jkl@aol.com)
-- Write Task (Related to 'House') task_id, task_name, last_performed, task_frequency, task_note, createdAt, updatedAt, itemItemId, userUserId
INSERT INTO tasks VALUES (5,'Service Checkup', '2016-11-22 00:00:00',24,'Lorem ipsum dolor sit amet','2018-01-16 00:00:00','2018-01-23 00:00:00',2,5);
INSERT INTO tasks VALUES (6,'State Inspection','2017-03-18 00:00:00',12,'Lorem ipsum dolor sit amet','2018-01-16 00:00:00','2018-01-23 00:00:00',2,5);
INSERT INTO tasks VALUES (7,'Replace Battery', '2012-05-11 00:00:00',36,'Lorem ipsum dolor sit amet','2018-01-16 00:00:00','2018-01-23 00:00:00',2,5);





-- NEW USER CREATES ITEM AND 2 TASKS
-- Simulate creating new Item for User 2 (abc@icloud.com)
-- Write Item (House)    item_id, type, manufacturer, model_number, date_installed, serial_number, complex, items_note, createAt, updateAt, userUserId
INSERT INTO items VALUES (3,'House','NULL','NULL','2013-01-01 00:00:00','NULL','FALSE','Lorem ipsum dolor sit amet.','2016-01-01 00:00:00','2016-01-20 00:00:00',2);

-- Simulate creates 2 new Tasks associated to Item 3 (House) and User 2 (abc@icloud.com)
-- Write Task (Related to 'House') task_id, task_name, last_performed, task_frequency, task_note, createdAt, updatedAt, itemItemId, userUserId
INSERT INTO tasks VALUES (8,'Refinish Deck',                '2017-10-19 00:00:00',24,'Lorem ipsum dolor sit amet','2018-01-16 00:00:00','2018-01-23 00:00:00',3,2);
INSERT INTO tasks VALUES (9,'Power Wash Windows and Siding','2016-04-18 00:00:00',12,'Lorem ipsum dolor sit amet','2018-01-16 00:00:00','2018-01-23 00:00:00',3,2);





