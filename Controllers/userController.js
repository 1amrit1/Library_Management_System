const userModel = require('../Models/usersModel');
const bookModel = require('../Models/booksModel');

module.exports.renderaddUser = function (req, res) {
    var isAdmin = req.body.isAdmin;
    var userId = parseInt(req.body.userId);
    console.log("in add user. isAdmin : " + isAdmin)
    if (isAdmin) {
        //if the user is an admin
        res.render('addBookPage', { "userId": userId, "isAdmin": isAdmin });
    } else {
        //if the user is not an admin
        res.render('errorPage')

    }
}
module.exports.addUserCheck = async function (req, res) {
    var userId = parseInt(req.body.userId);
    var isAdmin = req.body.isAdmin;

    var name = req.body.name;
    var id = parseInt(req.body.id);
    var isAdmin = req.body.isAdmin;
    var password = req.body.password;
    if (isNaN(id)) {
        console.log("in isNaN in user")
        //send back to add page with msg that id can only be integer
    } else {

        var isDuplicateId = await userModel.get_1_user(id);


        var result = await userModel.insert_1_user(id, name, isAdmin, [], password, isDuplicateId);
        if (result) {
            res.render('homePage', { "userId": userId, "isAdmin": isAdmin });
        } else {
            //send back to add page with msg that something went wrong.
            res.render('addBookPage', { "userId": userId, "isAdmin": isAdmin, error: "Something went wrong! check if User already exsists" })
        }
    }


}