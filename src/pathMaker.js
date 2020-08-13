import path from 'path';

const getFixturePath = (filename) => path.join(path.resolve(), '..', '__fixtures__', filename);

export default getFixturePath;
