#!/usr/bin/env node
var program = require ("commander");
var chalk = require ("chalk");
var progressBar = require ("progress");
var request = require ("superagent");

var netsuite = require ('./modules/netsuite');

var barStyle = 'uploading [:bar] :percent :etas';
var barOptions = {
    total:10
};

var bar = new progressBar(barStyle, barOptions);

program
    .arguments("<file>", "The name of the file to be passed to netsuite")
    .option("-u, --update", "Update the file from the netsuite server")
    .option("-p, --push", "Push the file to the netsuite server")
    .action(function(file) {
        try {
            if (program.push) {
               console.log(chalk.blue("Pushing " + file + " to netsuite")); 
               netsuite.push(file).then (function (response) {
                    console.log(chalk.bold.blue("Push to netsuite complete"));
               }); 
            }
        }
        catch (e) {
            console.error(chalk.bold.red("Something bad happened: " + e));
            process.exit(1);
        }
    })
    .parse(process.argv);
