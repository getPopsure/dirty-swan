module.exports = {
  template: require('./svgr-template'),
  indexTemplate: require('./svgr-index-template'),
  outDir: 'src/lib/components/icon/icons/',
  dimensions: false,
  icon: '{props.size}',
  replaceAttrValues: {
    '#8E8CEE': 'currentColor',
    '#91919C': 'currentColor',
  },
  role: 'img',
  typescript: true,
};
