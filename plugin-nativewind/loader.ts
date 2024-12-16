import {transform} from '@babel/core';
import type {LoaderContext} from '@rspack/core';

interface NativeWindLoaderOptions {
  babelPlugins?: string[];
}
export const raw = false;

export default function nativeWindLoader(
  this: LoaderContext<NativeWindLoaderOptions>,
  source: string,
) {
  this.cacheable();
  const callback = this.async();
  const options = this.getOptions();

  const babelPlugins = options.babelPlugins ?? [];

  transform(
    source,
    {
      filename: this.resourcePath,
      babelrc: false,
      configFile: false,
      compact: false,
      comments: true,
      plugins: [...babelPlugins, 'nativewind/babel'],
    },
    (err, result) => {
      if (err) {
        callback(err);
        return;
      }

      // @ts-ignore
      callback(null, result.code, result.map);
      return;
    },
  );
}
