const merge = require('webpack-merge');

module.exports = env => {
  return merge(
    {
      resolve: {
        extensions: ['.ts', '.tsx', '.js'],
      },
      module: {
        rules: [
          {
            test: /\.(j|t)sx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
          {
            test: /\.less$/,
            use: ['style-loader', 'css-loader?sourceMap=true', 'less-loader?sourceMap=true'],
          },
          {
            test: /favicon\.ico$/,
            use: {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
              },
            },
          },
        ],
      },
    },
    require(`./webpack.config.${env}.js`)
  );
};
