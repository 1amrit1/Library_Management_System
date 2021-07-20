

module.exports.login = function (req, res) {
    var userName = req.body.userName;
    var password = req.body.password;
    console.log(userName);
    console.log(password);

    if (userName == "check@email.com" && password == "checkPassword") {
        res.render('homePage');
    } else {
        res.render('loginPage', { error: "username and/or password doesn't match!" })
        //use ejs to send error to frntEnd and in the front end use a js fn to get the data or use ejs template in h1 if error is there

        // return res.status(401).end('<h1></h1>');    

        res.end;
    }
}