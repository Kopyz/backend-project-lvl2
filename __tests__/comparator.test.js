import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import assembleOutput from '../src/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const makePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let testJsonFormat;
let testStylishFormat;
let testPlainFormat;

beforeAll(() => {
  testStylishFormat = fs.readFileSync(makePath('testStylishFormat'), 'ascii');
  testPlainFormat = fs.readFileSync(makePath('testPlainFormat'), 'ascii');
  testJsonFormat = fs.readFileSync(makePath('testJsonFormat'), 'ascii');
});

test.each([['before.json', 'after.json'],
  ['before.ini', 'after.ini'],
  ['before.yaml', 'after.yaml']])('diff(%s %s)', (fileName1, fileName2) => {
  expect(assembleOutput(makePath(fileName1), makePath(fileName2), 'stylish')).toEqual(testStylishFormat);
  expect(assembleOutput(makePath(fileName1), makePath(fileName2), 'plain')).toEqual(testPlainFormat);
  expect(assembleOutput(makePath(fileName1), makePath(fileName2), 'json')).toEqual(testJsonFormat);
});
