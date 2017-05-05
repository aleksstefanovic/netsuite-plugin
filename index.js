#!/usr/bin/env node
var program = require ("commander");
var chalk = require ("chalk");

var netsuite = require ('./modules/netsuite');

var netsuiteConfig = {
    url: 'https://rest.sandbox.netsuite.com/app/site/hosting/restlet.nl',
    email: 'integration@searsinitium.com',
    password: 'BlahMan123',
    account: '3657411',
    scriptid: '237',
    deploymentid: '1'
};

program
    .arguments("<file>", "The name of the file to be passed to netsuite")
    .option("-u, --update", "Update the file from the netsuite server")
    .option("-p, --push", "Push the file to the netsuite server")
    .action(function(file) {
        try {
            if (program.push) {
               console.log(chalk.blue("Pushing " + file + " to netsuite")); 
               netsuite.push(file, netsuiteConfig).then (function (response) {
                    if (response.status) {
                        console.log(chalk.bold.blue("Push to netsuite complete"));
                        process.exit(0);
                    }
                    else {
                        console.error(chalk.bold.red("Something bad happened: " + response.message));
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
