#!/usr/bin/env node
import { generateRecursiveDiff } from '../comparator';
import printOutput from '../formatters/index.js';

const program = require('commander');

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2> <format>')
  .action((filepath1, filepath2, format = program.format) => {
    const data = generateRecursiveDiff(filepath1, filepath2);
    printOutput(format)(data);
  })
  .option('-f, --format [type]', 'output format', 'stylish')
  .parse(process.argv);
