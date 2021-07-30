module.exports.renderAllBooks = function (req, res) {
    // res.render("books controller");
    // res.render('loginPage');
}

module.exports.renderaddBook = function (req, res) {
    var isAdmin = req.body.isAdmin;
    console.log("in add book. isAdmin : " + isAdmin)
    if (isAdmin) {
        //if the user is an admin
        res.render('addBookPage');
    } else {
        //if the user is not an admin
        res.render('errorPage')

    }
}