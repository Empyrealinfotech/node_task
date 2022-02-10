# Node Task

Node Task

## Getting started

To get started follow below steps.

- [ ] run below commands in terminal

```
cd node_task
run npm install
cp .env.example .env
```
- [ ] configure enviornment variables for mysql & aws s3 in .env file

- [ ] import mysql database from sql directory

- [ ] to start server run below command in terminal

```
npm start
```
## For access API
- Application: Postman
- Request Method: POST
- URL: {baseUrl}/api/vi/get/students
- Request param `field` (add comma seperated values): Allowed values [first_name, last_name, email, class_no, profile_picture, createdAt, updatedAt]

## For Add students
- Application: Web Browser
- URL: {baseUrl}/students

## To setup on production server
- [ ] to install mysql kindly follow steps from bellow link
https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04

- [ ] to install node & npm kindly follow steps from bellow link
https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04

- [ ] to install pm2 to run node server in background kindly follow steps from bellow link
https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-20-04

- [ ] clone project on server and follow points from "Getting started"
- [ ] open incoming port which configured in environment file
