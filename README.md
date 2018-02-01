## Upkeep
A home maintenance application that tracks important items in your home and notifies you when maintenance or replacement is required.

## Motivation
Buying a home is the biggest investment most of us make in our life times. Why not take good care of it? If you are forgetful or not well-informed about home maintenance, maintaining your investment can be difficult.

Upkeep aims to help people know what to take care of, and when.

## Features
The best part of Upkeep is that it knows which maintenance tasks are important to track and how ofen they should be performed.  Some feature highlights:
 * Simple and intuitive design
 * Comprehensive list of home items and associated tasks
 * Built in scheduled reminders
 * Quick update for completed tasks
 * "Sticky" Note section for each item for customized records

## Installation

There are two ways you can run Upkeep.  Locally or online.

### Local Install
In order to run this application locally, MySQL needs to be installed and running on your machine.  If you don't have it installed, please visit the [MySQL Community Downloads page](https://dev.mysql.com/downloads/).  After MySQL is installed and running, you'll need to connect the client to the database with default settings (localhost or 127.0.0.1, username: root, no password and port 3306).  Next, create a database named upkeep_db.  Finally, you'll need to grab the code.


Follow the steps below to grab the repo from GitHub:
```
git clone https://github.com/DSEapps/upkeep
cd upkeep
npm install
node server.js
open browswer (http://localhost:8000)
```

### Online
Alternatively, you can run on Heroku [here](https://upkeepapp.herokuapp.com).

Upkeep main page (*click image for video demo*)
 [![Watch the video](/public/images/index.jpeg)](https://youtu.be/WEyPEk8pmXg)




## Frameworks
* Node.js
* Express.js
* Sequelize
* Handlebars
* Google OAuth

## License
GNU GPLv3

© [Evan Harris, Scott Bower, David Killian]