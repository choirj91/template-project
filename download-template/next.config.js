const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin'); // 압축 효율(.gz)

module.exports = withBundleAnalyzer({
  sassLoaderOptions: {
    sourceMap: true
  },
  distDir: '.next',
  webpack(config, options) {
    const prod = process.env.NODE_END === 'production';
    config.module.rules.push(
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        issuer: /\.jsx?$/,
        use: ['babel-loader', '@svgr/webpack']
      },
    );
    config.module.rules.push(
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              fallback: 'file-loader',
              name: 'fonts/[name].[ext]',
            },
          },
        ],
      },
    );
    return {
      ...config,
      mode: prod ? 'production' : 'development',
      devtool: prod ? false : 'eval-source-map',
      plugins: [
        ...config.plugins,
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
        new CompressionPlugin(),
      ]
    };
  }
});


