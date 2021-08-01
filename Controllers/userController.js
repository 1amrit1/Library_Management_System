const userModel = require('../Models/usersModel');
const bookModel = require('../Models/booksModel');

module.exports.renderaddUser = function (req, res) {
    var isAdmin = req.body.isAdmin;
    var userId = parseInt(req.body.userId);
    console.log("in add user. isAdmin : " + isAdmin)
    if (isAdmin) {
        //if the user is an admin
        res.render('addUserPage', { "userId": userId, "isAdmin": isAdmin });
    } else {
        //if the user is not an admin
        res.render('errorPage')

    }
}
module.exports.addUserCheck = async function (req, res) {
    var userId = parseInt(req.body.userId);
    var isUserAdmin = Boolean(req.body.isUserAdmin);
    console.log("is Admin in add user check")

    var name = req.body.name;
    var id = parseInt(req.body.id);
    var isAdminString = req.body.isAdmin;
    var isAdmin = (isAdminString == 'true') ? true : false;
    var password = req.body.password;
    if (isNaN(id)) {
        console.log("in isNaN in user")
        //send back to add page with msg that id can only be integer
    } else {

        var isDuplicateId = await userModel.get_1_user(id);
        try {
            var result = await userModel.insert_1_user(id, name, isAdmin, [], password, isDuplicateId);
            console.log(result);
            res.render('homePage', { "userId": userId, "isAdmin": isUserAdmin });

        } catch (err) {
            res.render(err);
        }
        //  else {
        //     //send back to add page with msg that something went wrong.
        //     res.render('addBookPage', { "userId": userId, "isAdmin": isAdmin, error: "Something went wrong! check if User already exsists" })
        // }
    }

}


module.exports.renderAllUsers = async function (req, res) {
    var isAdmin = req.body.isAdmin;
    if (isAdmin) {

        var allUsers = await userModel.getAllUsers();
        if (allUsers) {
            // let avaliableArr = [];
            // for (let i = 0; i < getAllUsers.length; i++) {
            //     var issedArr = allBooks[i].issuedTo;
            //     var aBookAvaliabilty = 0;
            //     for (let j = 0; j < issedArr.length; j++) {
            //         if (issedArr[j] == -1) {
            //             aBookAvaliabilty += 1;
            //         }
            //     }
            //     avaliableArr.push(aBookAvaliabilty);
            // }

            res.render("usersPage", { "users": allUsers });
        } else {
            console.log("users were nt found")

        }
    } else {
        //if the user is not an admin
        res.render('errorPage')

    }
}

module.exports.renderProfile = async function (req, res) {
    var userID = parseInt(req.body.userId);
    var user = await userModel.get_1_user(userID);
    res.render('profilePage', { "user": user });
}

module.exports.changePassword = async function (req, res) {
    var userID = parseInt(req.body.userId);
    var password = req.body.password;
    var result = await userModel.updatePassword(userID, password);
    try {

        res.render('loginPage');
    } catch {

        res.render('errorPage');
    }


}