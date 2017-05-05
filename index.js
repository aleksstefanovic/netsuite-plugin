#!/usr/bin/env node
var program = require ("commander");
var chalk = require ("chalk");

var netsuite = require ('./modules/netsuite');

var netsuiteConfig = {
    url: 'https://rest.sandbox.netsuite.com/app/site/hosting/restlet.nl',
    email: '',
    password: '',
    account: '',
    scriptid: '',
    deploymentid: '1'
};

program
    .arguments("<file>", "The name of the file to be passed to netsuite")
    .option("-u, --update", "Update the file from the netsuite server")
    .option("-p, --push", "Push the file to the netsuite server")
    .option("-n, --username <username>", "Email address to authenticate with netsuite")
    .option("-w, --password <password>", "Password to authenticate with netsuite")
    .option("-a, --account <account>", "Account to authenticate with netsuite")
    .option("-s, --scriptid <scriptid>", "Script id of restlet in netsuite")
    .action(function(file) {
        try {
            if (program.push) {
               console.log(chalk.blue("Pushing " + file + " to netsuite")); 
               netsuiteConfig.email = program.username;
               netsuiteConfig.password = program.password;
               netsuiteConfig.account = program.account;
               netsuiteConfig.scriptid = program.scriptid;
               netsuite.push(file, netsuiteConfig).then (function (response) {
                    if (response.status) {
                        console.log(chalk.bold.blue("Push to netsuite complete"));
                        process.exit(0);
                    }
                    else {
                        console.error(chalk.bold.red("Failed to push to netsuite: " + response.message));
                        process.exit(1);
                    }
               }); 
            }
        }
        catch (e) {
            console.error(chalk.bold.red("Something bad happened: " + e));
            process.exit(1);
        }
    })
    .parse(process.argv);
