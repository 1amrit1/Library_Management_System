var booksModel = require("../Models/booksModel");
module.exports.renderAllBooks = async function (req, res) {
    var allBooks = await booksModel.get_all_books();
    if (allBooks) {
        let avaliableArr = [];
        for (let i = 0; i < allBooks.length; i++) {
            var issedArr = allBooks[i].issuedTo;
            var aBookAvaliabilty = 0;
            for (let j = 0; j < issedArr.length; j++) {
                if (issedArr[j] == -1) {
                    aBookAvaliabilty += 1;
                }
            }
            avaliableArr.push(aBookAvaliabilty);
        }

        res.render("booksPage", { "books": allBooks, "availibleArr": avaliableArr });
    } else {
        console.log("books were nt found")

    }
}

module.exports.renderaddBook = function (req, res) {
    var isAdmin = req.body.isAdmin;
    var userId = parseInt(req.body.userId);
    console.log("in add book. isAdmin : " + isAdmin)
    if (isAdmin) {
        //if the user is an admin
        res.render('addBookPage', { "userId": userId, "isAdmin": isAdmin });
    } else {
        //if the user is not an admin
        res.render('errorPage')

    }
}

module.exports.addBookCheck = async function (req, res) {
    var userId = parseInt(req.body.userId);
    var isAdmin = req.body.isAdmin;

    var name = req.body.name;
    var id = parseInt(req.body.id);
    var author = req.body.author;
    var NumBooks = parseInt(req.body.NumBooks);
    var publisher = req.body.publisher;
    var description = req.body.description;
    if (isNaN(id)) {
        console.log("in isNaN")
        //send back to add page with msg that id can only be integer
    } else {
        var issuedTo = [-1];
        var returnBy = [null];
        for (let i = 1; i < NumBooks; i++) {
            issuedTo.push(-1);
            returnBy.push(-1);
        }

        // insert_1_book(91234, "Eloquent JavaScript, Third Edition", "Marijn Haverbeke", "No Starch Press", "JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
        //     [-1], [null])
        var isDuplicateId = await booksModel.get_1_book(id);


        var result = await booksModel.insert_1_book(id, name, author, publisher, description, issuedTo, returnBy, isDuplicateId);
        if (result) {
            res.render('homePage', { "userId": userId, "isAdmin": isAdmin });
        } else {
            res.render('addBookPage', { "userId": userId, "isAdmin": isAdmin, error: "Something went wrong!" });
            //send back to add page with msg that something went wrong.
        }
    }


}