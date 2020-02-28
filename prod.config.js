module.exports = {
    "mode": "production",
    "entry": ['babel-polyfill', './src/index.js'],
    "devtool": "source-map",
    "output": {
        "path": __dirname+'/dist',
        "filename": "bundle.js",
    },
    "module": {
        "rules": [
            {
                "test": /\.js$/,
                "exclude": /node_modules/,
                "use": {
                    "loader": "babel-loader",
                    "options": {
                        presets: ['babel-preset-env'],
                        plugins: [
                          require('babel-plugin-transform-object-rest-spread'),
                          require('regenerator-transform'),
                        ],
                    }
                }
            }
        ]
    }
}