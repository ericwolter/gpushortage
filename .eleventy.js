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
    console.log(outputPath);
    if( outputPath && outputPath.endsWith(".html") ) {
      console.log(outputPath);
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
      });
      console.log(content);
      console.log(minified);
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