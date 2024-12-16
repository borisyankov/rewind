import path from 'node:path';
import {
  setupTypeScript,
  tailwindCli,
  tailwindConfig,
} from 'nativewind/tailwind';

import type {Compiler, RspackPluginInstance} from '@rspack/core';
// import {nativeWindModuleRules} from './rules.js';

export interface NativeWindPluginConfig {
  input: string;
  platform: string;
  inlineRem?: number;
  outputDir?: string;
  configPath?: string;
  cliCommand?: string;
  browserslist?: string | null;
  browserslistEnv?: string | null;
  typescriptEnvPath?: string;
  disableTypeScriptGeneration?: boolean;
}

export class NativeWindPlugin implements RspackPluginInstance {
  constructor(private config: NativeWindPluginConfig) {
    if (this.config.input) {
      this.config.input = path.resolve(this.config.input);
    }

    console.debug('[NativeWindPlugin] input: ${this.config.input}');

    this.config.inlineRem = this.config.inlineRem ?? 14;
    this.config.configPath = this.config.configPath ?? 'tailwind.config';
    this.config.browserslist = this.config.browserslist ?? 'last 1 version';
    this.config.browserslistEnv = this.config.browserslistEnv ?? 'native';
    this.config.typescriptEnvPath =
      this.config.typescriptEnvPath ?? 'nativewind-env.d.ts';
    this.config.disableTypeScriptGeneration =
      this.config.disableTypeScriptGeneration ?? false;

    const {important} = tailwindConfig(path.resolve(this.config.configPath));

    console.debug(`[NativeWindPlugin] important: ${important}`);

    if (!this.config.disableTypeScriptGeneration) {
      console.debug('[NativeWindPlugin] checking TypeScript setup');
      setupTypeScript(this.config.typescriptEnvPath);
    }

    console.log('@@@ config', this.config);
  }

  apply(compiler: Compiler) {
    // add rules for transpiling wih NativeWind loader
    // compiler.options.module.rules.push(nativeWindModuleRules);
    // console.log('@@@ running apply ', compiler);

    const cli = tailwindCli({}); // debug from 'debug'

    console.log('@@@ cli', cli);

    // assert(compiler.options.output.path, "Can't infer output path from config");
  }

  getCSSForPlatform(platform: string, onChange): string {
    const cli = tailwindCli({}); // debug from 'debug'
    console.debug(`getCSSForPlatform: ${platform}`);
    return cli.getCSSForPlatform({
      platform,
      input: this.config.input,
      browserslist: this.config.browserslist,
      browserslistEnv: this.config.browserslistEnv,
      onChange,
    });
  }
}
