
import compare from '../src/comparator';
import makePath from '../src/pathMaker';

const fs = require('fs');

const expected1 = JSON.parse(fs.readFileSync(makePath('jsonTestSample-1'), 'ascii'));
const expected2 = JSON.parse(fs.readFileSync(makePath('jsonTestSample-2'), 'ascii'));
const expected3 = JSON.parse(fs.readFileSync(makePath('jsonTestSample-3'), 'ascii'));

test('diff_JSON', () => {
  expect(compare(makePath('before.json'), makePath('afterEmpty.json'))).toEqual(expected1);
  expect(compare(makePath('beforeEmpty.json'), makePath('after.json'))).toEqual(expected2);
  expect(compare(makePath('before.json'), makePath('after.json'))).toEqual(expected3);
});

test('diff_yaml', () => {
  expect(compare(makePath('before.yaml'), makePath('empty.yaml'))).toEqual(expected1);
  expect(compare(makePath('empty.yaml'), makePath('after.yaml'))).toEqual(expected2);
  expect(compare(makePath('before.yaml'), makePath('after.yaml'))).toEqual(expected3);
});
