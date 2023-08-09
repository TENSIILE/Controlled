const __DEV__ = process.env.NODE_ENV === 'development';

module.exports = {
  presets: ['@babel/preset-typescript', '@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]],
  plugins: [...(__DEV__ ? ['react-refresh/babel'] : []), '@vanilla-extract/babel-plugin'],
};
