#!/usr/bin/env node
import compare from '../comparator';

const program = require('commander');

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const data = compare(filepath1, filepath2);
    data.forEach((element) => console.log(element));
  })
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);