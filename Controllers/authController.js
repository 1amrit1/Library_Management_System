const usersModel = require("../Models/usersModel")
const bcrypt = require('bcrypt');
const url = require('url');

module.exports.login = async function (req, res) {
    var userName = req.body.userName;
    var password = req.body.password;
    console.log(userName);
    console.log(password);
    var user = await usersModel.get_1_user(userName);
    if (user) {

        // // Load hash from your password DB.
        console.log("pass : " + user.password);
        bcrypt.compare(password, user['password'], function (err, result) {
            if (result) {
                res.render('homePage', { userId: user['id'], isAdmin: user.isAdmin });
                // res.redirect(url.format({
                //     pathname: "/",
                //     query: {
                //         username: userName
                //     }
                // }));
            } else {
                //use ejs to send error to frntEnd and use ejs template in h1 if error is there
                res.render('loginPage', { error: "username and/or password doesn't match!" });
            }
            res.end;
        });
    } else {
        res.render('loginPage', { error: "username and/or password doesn't match!" });
        res.end;

    }

}

module.exports.renderLoginPage = function (req, res) {
    res.render('loginPage');
}