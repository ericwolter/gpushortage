const htmlmin = require("html-minifier");

module.exports = function(eleventyConfig) {
  eleventyConfig.addWatchTarget('./img');
  eleventyConfig.addWatchTarget('./js');
  eleventyConfig.addWatchTarget('./css');
  eleventyConfig.addWatchTarget('./data');

  eleventyConfig.addPassthroughCopy('./ads.txt');

  eleventyConfig.addPassthroughCopy('./data');

  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if( outputPath && outputPath.endsWith(".html") ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
      });
      return minified;
    }

    return content;
  });

  return {
    dir: {
      output: "../dist/projects/gpu-shortage"
    },
    templateFormats: ['pug', 'njk', 'md']
  }
}