


const { MongoClient } = require('mongodb');
const url = "mongodb+srv://admin:qwerty123@cluster0.h7iox.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const db_name = "Library_Management_System";
const client = new MongoClient(url);

//read one
var get_1_book = async function (id) {
    var res;

    try {

        await client.connect();
        var res = await client.db(db_name).collection("books").findOne({ "id": id });
        if (res) {
            console.log(res);
        } else {
            console.log("no data of book for get_1_book method");
        }
    } catch {

    } finally {
        await client.close();
    }

    return res;


}

var insert_1_book = async function (id, name, author, publisher, description, issuedTo, returnBy) {
    // issuedTo: array of user id(where size of array is equal to total number of
    //      that specific book in library and if that book is not issued then it will be - 1),
    // returnBy: array as the same size of issuedBy and if book is not issued then it will be null.

    var res;
    var isDuplicateId = await get_1_book(id);
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
insert_1_book(91234, "Eloquent JavaScript, Third Edition", "Marijn Haverbeke", "No Starch Press", "JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
    [-1], [null]);