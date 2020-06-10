import path from 'path';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

export default getFixturePath;
