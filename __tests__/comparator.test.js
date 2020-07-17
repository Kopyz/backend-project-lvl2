
import { generateRecursiveDiff } from '../src/comparator';
import makePath from '../src/pathMaker';

const fs = require('fs');

const expected1 = JSON.parse(fs.readFileSync(makePath('jsonTestSample-1'), 'ascii'));
const expected2 = JSON.parse(fs.readFileSync(makePath('jsonTestSample-2'), 'ascii'));
const expected3 = JSON.parse(fs.readFileSync(makePath('jsonTestSample-3'), 'ascii'));
const expected4 = JSON.parse(fs.readFileSync(makePath('jsonTreeTest'), 'ascii'));
const iniExpected1 = JSON.parse(fs.readFileSync(makePath('iniTestSample1'), 'ascii'));
const iniExpected2 = JSON.parse(fs.readFileSync(makePath('iniTestSample2'), 'ascii'));
const iniExpected3 = JSON.parse(fs.readFileSync(makePath('iniTestSample3'), 'ascii'));

test('diff_JSON', () => {
  expect(generateRecursiveDiff(makePath('before.json'), makePath('afterEmpty.json'))).toEqual(expected1);
  expect(generateRecursiveDiff(makePath('beforeEmpty.json'), makePath('after.json'))).toEqual(expected2);
  expect(generateRecursiveDiff(makePath('before.json'), makePath('after.json'))).toEqual(expected3);
  expect(generateRecursiveDiff(makePath('before-tree.json'), makePath('after-tree.json'))).toEqual(expected4);
});

test('diff_yaml', () => {
  expect(generateRecursiveDiff(makePath('before.yaml'), makePath('empty.yaml'))).toEqual(expected1);
  expect(generateRecursiveDiff(makePath('empty.yaml'), makePath('after.yaml'))).toEqual(expected2);
  expect(generateRecursiveDiff(makePath('before.yaml'), makePath('after.yaml'))).toEqual(expected3);
});

test('diff_ini', () => {
  expect(generateRecursiveDiff(makePath('before.ini'), makePath('empty.ini'))).toEqual(iniExpected1);
  expect(generateRecursiveDiff(makePath('empty.ini'), makePath('after.ini'))).toEqual(iniExpected2);
  expect(generateRecursiveDiff(makePath('before.ini'), makePath('after.ini'))).toEqual(iniExpected3);
});
