function push (filename) {
    return new Promise (function (resolve, reject) {
        try {
            resolve(true); 
        }
        catch (e) {
            reject(false);
        }
    });
}

var netsuite = {
    push: push
};

module.exports = netsuite;
