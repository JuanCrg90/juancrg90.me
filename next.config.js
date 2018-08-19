const compose = require('compose-function');
const withImages = require('next-images');

const withExportedPages = require('./plugins/with-export-pages');

module.exports = compose(
  withExportedPages(),
);

module.exports = compose(
  withImages,
  withExportedPages(),
)({
  pageExtensions: ['js', 'mdx'],
});
