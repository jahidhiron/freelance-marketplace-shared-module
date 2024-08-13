// to learn more about compilerOptions, please visit notes/4-babel/1-babel-preset.txt
const BABEL_ENV = process.env.BABEL_ENV;
const isCommonJS = BABEL_ENV !== undefined && BABEL_ENV === 'cjs';
const isESM = BABEL_ENV !== undefined && BABEL_ENV === 'esm';

module.exports = () => ({
  presets: [
    ['@babel/preset-typescript'],
    [
      // @babel/env automatic determines whether it is browser or node environment
      '@babel/env',
      {
        bugfixes: true,
        loose: true,
        modules: isCommonJS ? 'commonjs' : false,
        targets: {
          esmodules: isESM ? true : undefined,
          chrome: 70,
        },
      },
    ],
  ],
});
