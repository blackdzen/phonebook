# Phonebook App
![Project main page image](https://github.com/blackdzen/pictures/raw/main/phonebook/phonebook.png)


## Description

This application designed as a pet project and provides common services such as adding, editing, deleting, searching and keeping the contacts.

## Requirements

* [Node.js](https://nodejs.org/en/)
* [npm](https://www.npmjs.com/)
* [Git](https://git-scm.com/)
* [MongoDB](https://www.mongodb.com/)

## Installation

### Step 1
Open your favorite shell and clone the project:
<br/> 
`git clone https://github.com/blackdzen/phonebook.git`

### Step 2
Go to the phonebook directory and run npm modules installation by:
<br/>
`npm install`

### Step 3
Create a file .env in the root of the project, phonebook directory by default. For example on Linux:
<br/>
`touch .env`
### Step 4
Adjust your .env file by adding next variables:
<br/>
* MONGODB_URL = 'there must be a path to your MongoDB'
* SERVER_PORT = 'choose port num'
<br/>
For example:
MONGODB_URL = "mongodb://localhost:27017/example"
<br/>
SERVER_PORT = 3005

### Step 5
Finally run backend side: 
<br/>
`npm run server` 
<br/>
And run frontend part:
<br/>
`npm run start`
