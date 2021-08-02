const userModel = require('../Models/usersModel');
const bookModel = require('../Models/booksModel');
module.exports.renderbookTransactionPage = function (req, res) {
    var userId = parseInt(req.body.userId);
    var isAdmin = (req.body.isAdmin == 'true') ? true : false;
    if (isAdmin) {

        res.render('bookTransactionPage', { "userId": userId });
    } else {
        res.render('errorPage');
    }
}

module.exports.bookTransactionCheck = async function (req, res) {
    var userId = parseInt(req.body.userId);//userId is admin or librarian's id
    var issuerId = parseInt(req.body.issuerId);//issuer is the person who issueing the book to him/her self
    var bookId = parseInt(req.body.bookId);
    var transactionType = req.body.transactionType;
    try {

        if (transactionType == "issue") {
            var book = await bookModel.get_1_book(bookId);
            var postn = -1;
            for (let i = 0; i < book.issuedTo.length; i++) {
                if (book.issuedTo[i] == -1) {
                    postn = i;
                    break;
                }
            }
            if (postn < 0) {
                res.render('bookTransactionError');
            } else {
                var result1 = await userModel.updateBooksIssued(issuerId, bookId, true);
                console.log(result1);
                var today = new Date();
                var day14FromNow = new Date();//day14FromNow means return date will be 14 days from today
                // Add 14 Day
                day14FromNow.setDate(today.getDate() + 14);

                var result2 = await bookModel.update_book_issued(issuerId, bookId, day14FromNow, true);
                res.render('homePage', { "userId": userId, "isAdmin": true });
            }

        } else {
            var book = await bookModel.get_1_book(bookId);
            var postn = -1;
            for (let i = 0; i < book.issuedTo.length; i++) {
                if (book.issuedTo[i] == issuerId) {
                    postn = i;
                    break;
                }
            }
            if(postn < 0){
                res.render('bookTransactionError');

            } else {
                var result1 = await userModel.updateBooksIssued(issuerId, bookId, false);
                console.log(result1);
                var today = new Date();
                var day14FromNow = new Date();//day14FromNow means return date will be 14 days from today
                // Add 14 Day
                day14FromNow.setDate(today.getDate() + 14);

                var result2 = await bookModel.update_book_issued(issuerId, bookId, day14FromNow, false);
                res.render('homePage', { "userId": userId, "isAdmin": true });
            }
        }
    } catch (err) {
        console.log(err);
        res.render('errorPage');
    }

}