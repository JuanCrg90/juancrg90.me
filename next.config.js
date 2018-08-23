const compose = require('compose-function');
const withImages = require('next-images');

const withMDX = require('@zeit/next-mdx')({
  options: {
    mdPlugins: [require('remark-emoji')],
  },
});

const withExportedPages = require('./plugins/with-export-pages');

module.exports = compose(
  withExportedPages(),
);

module.exports = compose(
  withMDX,
  withImages,
  withExportedPages(),
)({
  pageExtensions: ['js', 'mdx'],
});
