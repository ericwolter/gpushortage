module.exports = function(eleventyConfig) {
  eleventyConfig.addWatchTarget('./img');
  eleventyConfig.addWatchTarget('./css');
  eleventyConfig.addWatchTarget('./data');

  eleventyConfig.addPassthroughCopy('./ads.txt');

  eleventyConfig.addPassthroughCopy('./img');
  eleventyConfig.addPassthroughCopy('./js');
  eleventyConfig.addPassthroughCopy('./css');
  eleventyConfig.addPassthroughCopy('./data');

  return {
    dir: {
      output: "../dist/projects/gpu-shortage"
    },
    templateFormats: ['pug', 'njk', 'md']
  }
}