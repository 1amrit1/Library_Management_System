const { MongoClient } = require('mongodb');
const url = "mongodb+srv://admin:qwerty123@cluster0.h7iox.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const db_name = "Library_Management_System";
const client = new MongoClient(url);

const bcrypt = require('bcrypt');
const saltRounds = 10;


//read all
module.exports.getAllUsers = async function () {
    var res;
    try {

        await client.connect();
        var result = await client.db(db_name).collection("users").find().toArray();
        if (result) {
            res = result;
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

//read one
module.exports.get_1_user = async function (id) {
    id = parseInt(id);
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
module.exports.insert_1_user = async function (id, name, isAdmin, booksIssued, password, isDuplicateId) {
    var res;
    console.log("in insert user");

    if (isDuplicateId) {
        //doing nothing and res will go null.

    } else {
        var passwordHash;
        bcrypt.hash(password, saltRounds, async function (err, hash) {
            passwordHash = hash;
            var userObj = { "id": id, "name": name, "isAdmin": isAdmin, "booksIssued": booksIssued, "password": passwordHash };

            await client.connect();
            res = await client.db(db_name).collection("users").insertOne(userObj);
            console.log(res + "-----------------in insert user")
            console.log(res);
            client.close();
            return true;
        });
    }
}
// all fns need to be with await n in async fn
// insert_1_user(11234, "test Name", true, [91234, 91235], "password");
// var res = getAllUsers();
// console.log(res);
// get_1_user(11234);

//update one



module.exports.updatePassword = async function (id, newPassword) {
    bcrypt.hash(newPassword, saltRounds, async function (err, passwordHash) {
        const filter = { "id": id };

        const updateDocument = {
            $set: { "password": passwordHash }
        };

        await client.connect();
        res = await client.db(db_name).collection("users").updateOne(filter, updateDocument);;
        console.log(res);
        client.close();
    });
}
module.exports.updateBooksIssued = async function (id, bookId, isIssueing) {
    // in books model also updatation will be done by the controller, which calls this fn
    var res;
    try {
        await client.connect();
        var user = await client.db(db_name).collection("users").findOne({ "id": id });
        if (user) {
            var booksIssuedArr = user["booksIssued"];
            if (isIssueing) {
                //if isIssueing true then person is issueing the book
                booksIssuedArr.push(bookId);
            } else {
                //else the person is returning the book
                const index = booksIssuedArr.indexOf(bookId);
                if (index > -1) {
                    booksIssuedArr.splice(index, 1);
                }

            }
            const filter = { "id": id };
            const updateDocument = {
                $set: { "booksIssued": booksIssuedArr }
            };
            res = await client.db(db_name).collection("users").updateOne(filter, updateDocument);;
            console.log(res);
        } else {
            console.log("wrong id");
        }
    } catch {

    } finally {
        await client.close();
    }
    return res;
};

module.exports.deleteUser = async function (id) {
    var res;
    try {

        await client.connect();
        res = await client.db(db_name).collection("users").deleteOne({ "id": id });
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
