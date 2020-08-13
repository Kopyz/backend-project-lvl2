import path from 'path';

const getFixturePath = (filename) => path.join(path.dirname(), '..', '__fixtures__', filename);

export default getFixturePath;
