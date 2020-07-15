#!/usr/bin/env node
import { generateRecursiveDiff } from '../comparator';
import { stylish } from '../printer';

const program = require('commander');

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const data = generateRecursiveDiff(filepath1, filepath2);
    stylish(data);
  })
  .option('-f, --format [type]', 'output format', stylish)
  .parse(process.argv);
