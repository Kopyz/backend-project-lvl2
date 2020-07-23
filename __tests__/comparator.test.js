
import { generateRecursiveDiff } from '../src/comparator';
import { stylish } from '../src/printer';
import makePath from '../src/pathMaker';

const fs = require('fs');

const expected1 = fs.readFileSync(makePath('testSample-1'), 'ascii');
const expected2 = fs.readFileSync(makePath('testSample-2'), 'ascii');
const expected3 = fs.readFileSync(makePath('testSample-3'), 'ascii');
const expected4 = fs.readFileSync(makePath('testTreeSample'), 'ascii');

test('diff_JSON', () => {
  expect(stylish(generateRecursiveDiff(makePath('before.json'), makePath('empty.json')))).toEqual(expected1);
  expect(stylish(generateRecursiveDiff(makePath('empty.json'), makePath('after.json')))).toEqual(expected2);
  expect(stylish(generateRecursiveDiff(makePath('before.json'), makePath('after.json')))).toEqual(expected3);
  expect(stylish(generateRecursiveDiff(makePath('before-tree.json'), makePath('after-tree.json')))).toEqual(expected4);
});

test('diff_yaml', () => {
  expect(stylish(generateRecursiveDiff(makePath('before.yaml'), makePath('empty.yaml')))).toEqual(expected1);
  expect(stylish(generateRecursiveDiff(makePath('empty.yaml'), makePath('after.yaml')))).toEqual(expected2);
  expect(stylish(generateRecursiveDiff(makePath('before.yaml'), makePath('after.yaml')))).toEqual(expected3);
});

test('diff_ini', () => {
  expect(stylish(generateRecursiveDiff(makePath('before.ini'), makePath('empty.ini')))).toEqual(expected1);
  expect(stylish(generateRecursiveDiff(makePath('empty.ini'), makePath('after.ini')))).toEqual(expected2);
  expect(stylish(generateRecursiveDiff(makePath('before.ini'), makePath('after.ini')))).toEqual(expected3);
});
