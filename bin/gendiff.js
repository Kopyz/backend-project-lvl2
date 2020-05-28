#!/usr/bin/env node

const  program = require('commander');

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .action(function (filepath1, filepath2) {
    file1 = filepath1;
    file2 = filepath2;
   })
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);
