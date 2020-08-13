import * as fs from 'fs';
import stylish from '../src/formatters/stylish';
import plain from '../src/formatters/plain';
import json from '../src/formatters/json';
import makePath from '../src/pathMaker';

const expected1 = fs.readFileSync(makePath('testSample-1'), 'ascii');
const expected2 = fs.readFileSync(makePath('testSample-2'), 'ascii');
const expected3 = fs.readFileSync(makePath('testSample-3'), 'ascii');
const expectedStylish = fs.readFileSync(makePath('testTreeSample'), 'ascii');
const expectedPlain = fs.readFileSync(makePath('testPlainFormat'), 'ascii');
const expectedJSON = fs.readFileSync(makePath('testJsonOutput'), 'ascii');

test('diff_JSON', () => {
  expect(stylish(makePath('before.json'), makePath('empty.json'))).toEqual(expected1);
  expect(stylish(makePath('empty.json'), makePath('after.json'))).toEqual(expected2);
  expect(stylish(makePath('before.json'), makePath('after.json'))).toEqual(expected3);
  expect(stylish(makePath('before-tree.json'), makePath('after-tree.json'))).toEqual(expectedStylish);
});

test('diff_yaml', () => {
  expect(stylish(makePath('before.yaml'), makePath('empty.yaml'))).toEqual(expected1);
  expect(stylish(makePath('empty.yaml'), makePath('after.yaml'))).toEqual(expected2);
  expect(stylish(makePath('before.yaml'), makePath('after.yaml'))).toEqual(expected3);
});

test('diff_ini', () => {
  expect(stylish(makePath('before.ini'), makePath('empty.ini'))).toEqual(expected1);
  expect(stylish(makePath('empty.ini'), makePath('after.ini'))).toEqual(expected2);
  expect(stylish(makePath('before.ini'), makePath('after.ini'))).toEqual(expected3);
});

test('plain_diff', () => {
  expect(plain(makePath('before-tree.json'), makePath('after-tree.json'))).toEqual(expectedPlain);
});

test('JSON output', () => {
  expect(json(makePath('before-tree.json'), makePath('after-tree.json'))).toEqual(expectedJSON);
});
