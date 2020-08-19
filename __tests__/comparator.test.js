import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import assembleOutput from '../src/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const makePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const extensions = ['json', 'ini', 'yaml'];

extensions.map((extension) => {
  const fileName1 = `before.${extension}`;
  const fileName2 = `after.${extension}`;

  test.each([[fileName1, fileName2, 'stylish', 'testStylishFormat'],
    [fileName1, fileName2, 'plain', 'testPlainFormat'],
    [fileName1, fileName2, 'json', 'testJsonFormat']])('diff(%s, %s, %s)',
    (data1, data2, format, testFile) => {
      expect(assembleOutput(format, makePath(data1), makePath(data2))).toEqual(fs.readFileSync(makePath(testFile), 'ascii'));
    });
  return undefined;
});
