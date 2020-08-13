#!/usr/bin/env node
import program from 'commander';
import makeOutput from '../formatters/index.js';

program
  .version('0.9.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    console.log(makeOutput(program.format)(filepath1, filepath2));
  })
  .parse(process.argv);
