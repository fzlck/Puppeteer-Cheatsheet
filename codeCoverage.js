const fs = require('fs');
const pti = require('puppeteer-to-istanbul');

const nycOutputPath = './.nyc_output';

/* puppeteer-to-istanbul has no option to specify a custom filename */
const renameOutputFile = (title) => {
  const oldFilePath = `${nycOutputPath}/out.json`;
  const newFilePath = `${nycOutputPath}/${title}.json`;
  fs.rename(oldFilePath, newFilePath, (err) => {
    if (err) {
      throw Error('Error renaming file:', err);
    }
  });
};
const start = async (page) => {
  await Promise.all([
    page.coverage.startJSCoverage(),
  ]);
};
const end = async (page, title) => {
  const [jsCoverage] = await Promise.all([
    page.coverage.stopJSCoverage(),
  ]);
  const filteredCoverage = jsCoverage.filter(({ url }) => !url.includes('javascript.js.php'));
  pti.write(filteredCoverage, { storagePath: nycOutputPath });
  if (title) {
    renameOutputFile(title);
  }
};
module.exports = {
  renameOutputFile,
  start,
  end,
};
