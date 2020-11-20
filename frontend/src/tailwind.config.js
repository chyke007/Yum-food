module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'product-pattern': "url('./img/product_bg.svg')",
        'product-end': "url('./img/end.svg')"
       })
    },
  },
  variants: {
    extend: {
      backgroundColor: ['checked'],
    }
  },
  plugins: [],
}
