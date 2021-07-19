//immporting modules
const express = require('express');

//creating server
const app = express();
app.listen(3000, function () {
    console.log("server is running at port 3000");
})

//for html
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

//for css
app.use(express.static('public'));

var a = ['/', '/login'];
app.get(a, function (req, res) {
    res.render('loginPage.html');
});

