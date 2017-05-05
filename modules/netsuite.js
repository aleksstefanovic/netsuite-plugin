var progressBar = require ("progress");
var request = require ("superagent");
var fs = require ('fs');
var path = require('path');



function push (filename, netsuiteConfig) {
    return new Promise (function (resolve, reject) {
        try {
            var barStyle = 'uploading [:bar] :percent :etas';
            var barOptions = {
                total:10
            };
            var bar = new progressBar(barStyle, barOptions);

            var url = netsuiteConfig.url + "?script=" + netsuiteConfig.scriptid + "&deploy=" + netsuiteConfig.deploymentid;
            //console.log("url is " + url);
            var authHeader = "NLAuth nlauth_account=" + netsuiteConfig.account +  ",nlauth_email=" + netsuiteConfig.email + ",nlauth_signature=" + netsuiteConfig.password;
            //console.log("auth header is " + authHeader);
            var fullFilePath = path.basename(filename);
            fs.readFile(fullFilePath, function (err, data) {
                if (err) {
                    resolve({"status":false,"message":JSON.stringify(err)}); 
                }
                request
                    .put(url)
                    .set('Authorization', authHeader)
                    .send({"name":filename,"path":filename,"content":data.toString()})
                    .end(function (err, res) {
                        if (err) {
                            resolve({"status":false,"message":JSON.stringify(err)}); 
                        }
                        if (res.status != '200') {
                            resolve({"status":false,"message":JSON.stringify(res)}); 
                        }
                        bar.tick(10);
                        resolve({"status":true,"message":null}); 
                    });
            });
        }
        catch (e) {
             console.log(e);
            resolve({"status":false,"message":JSON.stringify(e)}); 
        }
    });
}

var netsuite = {
    push: push
};

module.exports = netsuite;
