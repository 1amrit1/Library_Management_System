const { MongoClient } = require('mongodb');
const url = "mongodb+srv://admin:qwerty123@cluster0.h7iox.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const db_name = "Library_Management_System";
const client = new MongoClient(url);

const bcrypt = require('bcrypt');
const saltRounds = 10;
const someOtherPlaintextPassword = 'not_bacon';


//read all
module.exports.getAllUsers = async function () {
    var res;
    try {

        await client.connect();
        res = await client.db(db_name).collection("users").findOne({});
        if (res) {
            console.log(res);
        } else {
            console.log("no data");
        }
    } catch {

    } finally {
        await client.close();
    }

}
return res;

//read one
module.exports.get_1_user = async function (id) {
    var res;

    try {

        await client.connect();
        var res = await client.db(db_name).collection("users").findOne({ "id": id });
        if (res) {
            console.log(res);
        } else {
            console.log("no data");
        }
    } catch {

    } finally {
        await client.close();
    }

    return res;


}

//create
module.exports.insert_1_user = async function (id, name, isAdmin, booksIssued, password) {
    var res;
    var isDuplicateId = await get_1_user(id);
    if (isDuplicateId) {
        //doing nothing and res will go null.

    } else {
        var passwordHash;
        bcrypt.hash(password, saltRounds, async function (err, hash) {
            passwordHash = hash;
            var userObj = { "id": id, "name": name, "isAdmin": isAdmin, "booksIssued": booksIssued, "password": passwordHash };


            await client.connect();
            res = await client.db(db_name).collection("users").insertOne(userObj);
            console.log(res);
            client.close();
        });
    }
    return res;
}
// all fns need to be with await n in async fn
// insert_1_user(11234, "test Name", true, [91234, 91235], "password");
// var res = getAllUsers();
// console.log(res);
// get_1_user(11234);

//update one

var update_1_user = async function (id, updObj) {

}
