
import compare from '../src/comparator';
import makePath from '../src/pathMaker';

const expected1 = [
  '- host: hexlet.io',
  '- timeout: 50',
  '- proxy: 123.234.53.22',
  '- follow: false',
];
const expected2 = [
  '+ timeout: 20',
  '+ verbose: true',
  '+ host: hexlet.io',
];
const expected3 = [
  'host: hexlet.io',
  '+ timeout: 20',
  '- timeout: 50',
  '- proxy: 123.234.53.22',
  '+ verbose: true',
  '- follow: false',
];
test('diff_1', () => {
  expect(compare(makePath('before.json'), makePath('afterEmpty.json'))).toEqual(expected1);
  expect(compare(makePath('beforeEmpty.json'), makePath('after.json'))).toEqual(expected2);
  expect(compare(makePath('before.json'), makePath('after.json'))).toEqual(expected3);
});
