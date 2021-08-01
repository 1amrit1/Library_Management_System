//immporting modules
const express = require('express');
var path = require('path');
const authController = require('./Controllers/authController');
const booksController = require('./Controllers/booksController');
const userController = require('./Controllers/userController')

//creating server
const app = express();
app.listen(3000, function () {
    console.log("server is running at port 3000");
})

//for html
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

//for css
app.use(express.static(__dirname + '/public'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

//login page
var a = ['/', '/login'];
app.get(a, authController.renderLoginPage);

//for home page(a post method)
// Access the parse results as request.body
app.post('/loginCheck', authController.login);

//home page will be called dashboard...... so /dashboard will be the url
app.post('/addBook', booksController.renderaddBook);
app.post('/addBookCheck', booksController.addBookCheck);
app.post('/allBooks', booksController.renderAllBooks);


app.post('/addUser', userController.renderaddUser);
app.post('/addUserCheck', userController.addUserCheck);
app.post('/allUsers', userController.renderAllUsers);
app.post('/profile', userController.renderProfile);
app.post('/changePassword', userController.changePassword);