#!/usr/bin/env node
import generateRecursiveDiff from '../comparator';
import printOutput from '../formatters/index.js';

const program = require('commander');

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const data = generateRecursiveDiff(filepath1, filepath2);
    printOutput(program.format)(data);
  })
  .parse(process.argv);
