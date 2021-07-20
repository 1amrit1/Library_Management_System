module.exports.userAuthFn = function (userName, password) {
    if (userName == "check@email.com" && password == "checkPassword") {
        return true;
    } else {
        return false;
    }
}