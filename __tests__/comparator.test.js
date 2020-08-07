
import generateRecursiveDiff from '../src/comparator';
import stylish from '../src/formatters/stylish';
import plain from '../src/formatters/plain';
import json from '../src/formatters/json';
import makePath from '../src/pathMaker';

const fs = require('fs');

const expected1 = fs.readFileSync(makePath('testSample-1'), 'ascii');
const expected2 = fs.readFileSync(makePath('testSample-2'), 'ascii');
const expected3 = fs.readFileSync(makePath('testSample-3'), 'ascii');
const expectedStylish = fs.readFileSync(makePath('testTreeSample'), 'ascii');
const expectedPlain = fs.readFileSync(makePath('testPlainFormat'), 'ascii');
const expectedJSON = fs.readFileSync(makePath('testJsonOutput'), 'ascii');

const readResultFile = () => fs.readFileSync(makePath('result'), 'ascii');

test('diff_JSON', () => {
  stylish(generateRecursiveDiff(makePath('before.json'), makePath('empty.json')));
  expect(readResultFile()).toEqual(expected1);

  stylish(generateRecursiveDiff(makePath('empty.json'), makePath('after.json')));
  expect(readResultFile()).toEqual(expected2);

  stylish(generateRecursiveDiff(makePath('before.json'), makePath('after.json')));
  expect(readResultFile()).toEqual(expected3);

  stylish(generateRecursiveDiff(makePath('before-tree.json'), makePath('after-tree.json')));
  expect(readResultFile()).toEqual(expectedStylish);
});

test('diff_yaml', () => {
  stylish(generateRecursiveDiff(makePath('before.yaml'), makePath('empty.yaml')));
  expect(readResultFile()).toEqual(expected1);

  stylish(generateRecursiveDiff(makePath('empty.yaml'), makePath('after.yaml')));
  expect(readResultFile()).toEqual(expected2);

  stylish(generateRecursiveDiff(makePath('before.yaml'), makePath('after.yaml')));
  expect(readResultFile()).toEqual(expected3);
});

test('diff_ini', () => {
  stylish(generateRecursiveDiff(makePath('before.ini'), makePath('empty.ini')));
  expect(readResultFile()).toEqual(expected1);

  stylish(generateRecursiveDiff(makePath('empty.ini'), makePath('after.ini')));
  expect(readResultFile()).toEqual(expected2);

  stylish(generateRecursiveDiff(makePath('before.ini'), makePath('after.ini')));
  expect(readResultFile()).toEqual(expected3);
});

test('plain_diff', () => {
  plain(generateRecursiveDiff(makePath('before-tree.json'), makePath('after-tree.json')));
  expect(readResultFile()).toEqual(expectedPlain);
});

test('JSON output', () => {
  json(generateRecursiveDiff(makePath('before-tree.json'), makePath('after-tree.json')));
  expect(readResultFile()).toEqual(expectedJSON);
});
