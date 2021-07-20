//immporting modules
const express = require('express');
var loginController = require('./Controllers/loginController');

//creating server
const app = express();
app.listen(3000, function () {
    console.log("server is running at port 3000");
})

//for html
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

//for css
app.use(express.static(__dirname + '/public'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

//login page
var a = ['/', '/login'];
app.get(a, function (req, res) {
    res.render('loginPage.html');
});

//for home page(a post method)
// Access the parse results as request.body
app.post('/home', function (req, res) {
    var userName = req.body.userName;
    var password = req.body.password;
    console.log(userName);
    console.log(password);

    var isUserValid = loginController.userAuthFn(userName, password);
    if (isUserValid) {
        res.render('homePage.html');
    } else {
        res.redirect(url.format({
            pathname: "/",
            query: {
                "error":true 
            }
        }));
        // return res.status(401).end('<h1></h1>');
    }
    res.end;
});
