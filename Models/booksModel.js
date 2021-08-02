


const { MongoClient } = require('mongodb');
const url = "mongodb+srv://admin:qwerty123@cluster0.h7iox.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const db_name = "Library_Management_System";
const client = new MongoClient(url);

var usersModel = require("./usersModel");

//read one
module.exports.get_1_book = async function (id) {
    var res;

    try {

        await client.connect();
        var result = await client.db(db_name).collection("books").findOne({ "id": id });
        if (result) {
            console.log(result);
            res = result;
        } else {
            console.log("no data of book for get_1_book method");
        }
    } catch {

    } finally {
        await client.close();
    }

    return res;
}

module.exports.get_all_books = async function () {
    var res;

    try {

        await client.connect();
        var result = await client.db(db_name).collection("books").find().toArray();

        if (result) {
            // await result.forEach(console.dir);
            // await result.forEach(function (elem) {
            //     // res.push(elem);
            //     console.log(elem.toString());
            // });
            res = result;

        } else {
            console.log("no data of book for get_all_books method");
        }
    } catch {

    } finally {
        await client.close();
    }

    return res;
}
// console.log(get_all_books());
module.exports.insert_1_book = async function (id, name, author, publisher, description, issuedTo, returnBy, isDuplicateId) {
    // issuedTo: array of user id(where size of array is equal to total number of
    //      that specific book in library and if that book is not issued then it will be - 1),
    // returnBy: array as the same size of issuedBy and if book is not issued then it will be null.
    var res;
    if (isDuplicateId) {
        //add in both the arrays in db
        //get arrays to update
        var bookIssuedToArr = isDuplicateId.issuedTo;
        var bookReturnByArr = isDuplicateId.returnBy;
        //add elements to the arrays
        bookIssuedToArr.push(-1);
        bookReturnByArr.push(null);
        //create the object
        var bookUptObj = { $set: { "issuedTo": bookIssuedToArr, "returnBy": bookReturnByArr } };
        //get the book id
        filter = { "id": isDuplicateId.id };
        //call the updation function
        await client.connect();
        res = await client.db(db_name).collection("books").updateOne(filter, bookUptObj);;
        console.log(res);
        client.close();
    } else {
        var bookObj = { "id": id, "name": name, "author": author, "publisher": publisher, "description": description, "issuedTo": issuedTo, "returnBy": returnBy };
        await client.connect();
        res = await client.db(db_name).collection("books").insertOne(bookObj);
        console.log(res);
        client.close();
    }
    return res;
}
//var d2 = new Date('01 01 1970');// Thu Jan 01 1970 00: 00: 00 GMT - 0500(Eastern Standard Time)
// console.log(d2.toString());
// insert_1_book(91234, "Eloquent JavaScript, Third Edition", "Marijn Haverbeke", "No Starch Press", "JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
//     [-1], [null]);

module.exports.delete_1_book = async function (id) {
    var AllUsers = await usersModel.getAllUsers();
    await client.connect();
    var book = await client.db(db_name).collection("books").findOne({ "id": id });
    var res;
    var itemPostn = -1;
    if (book) {
        var issuedToArr = book["issuedTo"];
        for (let i = 0; i < issuedToArr.length; i++) {
            if (issuedToArr[i] == -1) {
                itemPostn = i;
            }

        }
        if (itemPostn == -1) {
            //when all the books of this id are issued!

        } else {
            //when there is one empty item     
            var result = await client.db(db_name).collection("books").findOne({ "id": id });


            var isDuplicateId = result;
            //remove element in both the arrays in db

            //get arrays to update
            var bookIssuedToArr = isDuplicateId.issuedTo;
            var bookReturnByArr = isDuplicateId.returnBy;
            //remove elements to the arrays
            bookIssuedToArr.splice(itemPostn, 1);
            bookReturnByArr.splice(itemPostn, 1);
            //create the object
            var bookUptObj = { $set: { "issuedTo": bookIssuedToArr, "returnBy": bookReturnByArr } };
            //get the book id
            filter = { "id": isDuplicateId.id };
            //call the updation function
            await client.connect();
            res = await client.db(db_name).collection("books").updateOne(filter, bookUptObj);;
            console.log(res);
            client.close();

        }
    }
    return res;

}

module.exports.update_book_issued = async function (userId, bookId, returnByDate, isIssueing) {

    var AllUsers = await usersModel.getAllUsers();
    await client.connect();
    var book = await client.db(db_name).collection("books").findOne({ "id": bookId });
    var res;
    var itemPostn = -1;
    if (book) {
        var issuedToArr = book["issuedTo"];
        for (let i = 0; i < issuedToArr.length; i++) {
            if (issuedToArr[i] == -1) {
                itemPostn = i;
            }

        }
        if (itemPostn == -1) {
            //when all the books of this id are issued!

        } else {
            //when there is one empty item
            var dupRes = await client.db(db_name).collection("books").findOne({ "id": bookId });

            var isDuplicateId = dupRes;
            //remove element in both the arrays in db

            //get arrays to update
            var bookIssuedToArr = isDuplicateId.issuedTo;
            var bookReturnByArr = isDuplicateId.returnBy;
            //remove elements to the arrays
            if (isIssueing) {
                //if isIssueing true then the book is being issued

                bookIssuedToArr[itemPostn] = userId;
                bookReturnByArr[itemPostn] = returnByDate;

            } else {
                bookIssuedToArr[itemPostn] = -1;
                bookReturnByArr[itemPostn] = null;
            }
            //create the object
            var bookUptObj = { $set: { "issuedTo": bookIssuedToArr, "returnBy": bookReturnByArr } };
            //get the book id
            filter = { "id": isDuplicateId.id };
            //call the updation function
            await client.connect();
            res = await client.db(db_name).collection("books").updateOne(filter, bookUptObj);
            console.log(res);
            client.close();

        }
    }
    return res;
}
//delete_1_book and update_book_issued to test now