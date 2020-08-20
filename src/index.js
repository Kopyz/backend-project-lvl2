import path from 'path';
import fs from 'fs';
import process from 'process';
import parse from './parsers';
import generateRecursiveDiff from './comparator';
import makeOutput from './formatters/index';

const makeAbsolutePath = (fileName) => {
  const currentDir = process.cwd();
  const absolutePathFile = path.resolve(currentDir, fileName);
  return absolutePathFile;
};

const readData = (fileName) => {
  const absolutePathFile = makeAbsolutePath(fileName);
  return fs.readFileSync(absolutePathFile, 'ascii');
};

const defineFileFormat = (fileName) => path.extname(fileName);

export default (filePath1, filePath2, outputFormat = 'stylish') => {
  const data1 = readData(filePath1);
  const data2 = readData(filePath2);
  const fileFormat1 = defineFileFormat(filePath1);
  const fileFormat2 = defineFileFormat(filePath2);
  const parsedData1 = parse(data1, fileFormat1);
  const parsedData2 = parse(data2, fileFormat2);
  const rawDiff = generateRecursiveDiff(parsedData1, parsedData2);

  return makeOutput(outputFormat)(rawDiff);
};
