
-- * Left Join SQL (Returns all records from tasks that match records from user_id = 2)
-- * Results table: user_email, google_id, task_name, last_performed, task_note
SELECT users.user_email, users.google_id, tasks.task_name, tasks.last_performed, tasks.task_note
FROM tasks
LEFT JOIN users ON tasks.userUserId = users.user_id
WHERE users.user_id = 2;


-- * Left Join SQL (Returns records of users that match manufacturer = Honda)
-- * Results table: user_email, google_id
SELECT users.user_email, users.google_id
FROM users
LEFT JOIN items ON items.userUserId = users.user_id
WHERE items.manufacturer = "Honda";

