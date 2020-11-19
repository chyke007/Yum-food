module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [
    './containers/**/*.js',
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'product-pattern': "url('./img/product_bg.svg')",
        'product-end': "url('./img/end.svg')"
       })
    },
  },
  variants: {},
  plugins: [],
}
