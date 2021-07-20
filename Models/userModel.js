const { MongoClient } = require('mongodb');
const url = "mongodb+srv://admin:qwerty123@cluster0.h7iox.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const db_name = "Library_Management_System";
const client = new MongoClient(url);

var getAllUsers = async function () {
    try {

        await client.connect();
        var res = await client.db(db_name).collection("users").findOne({});
        if (res) {
            console.log(res);
            return res;
        } else {
            console.log("no data");
        }
    } catch {

    } finally {
        await client.close();
    }

}

var get_1_user = async function (id) {

    try {

        await client.connect();
        var res = await client.db(db_name).collection("users").findOne({ "id": id });
        if (res) {
            console.log(res);
            return res;
        } else {
            console.log("no data");
        }
    } catch {

    } finally {
        await client.close();
    }



}


var insert_1_user = async function (id, name, isAdmin, booksIssued, password) {
    var isDuplicateId = await get_1_user(id);
    if (isDuplicateId) {

    } else {
        var userObj = { "id": id, "name": name, "isAdmin": isAdmin, "booksIssued": booksIssued, "password":password };

        mongoClient.connect(url, async function (err, dbServer) {
            if (err) throw err;
            else {
                console.log("Conected to users db via insert 1 user Method : " + dbServer);
                var myDB = dbServer.db(db_name);
                var res = await myDB.collection('users').insertOne(userObj);
                console.log(res);

            }
        });
    }
}
// insert_1_user(11234, "test Name", true, [91234, 91235]);
// var res = getAllUsers();// need to be with await n in async fn
// console.log(res);
get_1_user(11234);
