import {getModulePaths} from '@callstack/repack';

export const nativeWindModuleRules = {
  exclude: getModulePaths([
    'react',
    'react-native',
    '@react-native',
    'nativewind/babel',
  ]),
  oneOf: [
    {
      test: /\.tsx$/,
      use: {
        loader: './loader.js',
        options: {
          babelPlugins: [
            ['nativewind/babel', {isTSX: false, allowNamespaces: true}],
          ],
        },
      },
    },
  ],
};
