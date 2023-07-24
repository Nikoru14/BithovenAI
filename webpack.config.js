const path = require('path');

module.exports = {
    entry: './js/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development', // Change to 'production' for a minified production build
    devtool: 'source-map', // Add source maps for better debugging (optional)
};
