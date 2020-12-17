#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import * as sass from 'sass';

interface ConfigurationFile {
  theme?: {
    colors?: {
      primary?: {
        100: string;
        300: string;
        500: string;
        700: string;
        900: string;
      };
    };
    font?: {
      sans: {
        family: string[];
        url?: string;
      };
    };
  };
}

export function generatePrimaryColors(configuration: ConfigurationFile) {
  if (configuration.theme?.colors?.primary) {
    const primaryColors = configuration.theme.colors.primary;
    return Object.entries(primaryColors).reduce(
      (result, [shade, hex], index, arr) =>
        result +
        `$ds-primary-${shade}: ${hex};${index < arr.length - 1 ? '\n' : ''}`,
      ''
    );
  }
  return undefined;
}

export function generateFont(configuration: ConfigurationFile) {
  if (configuration.theme?.font?.sans) {
    const sans = configuration.theme.font.sans;
    let result = '';
    if (sans.url) {
      result = `@import url('${sans.url}');\n\n`;
    }

    result =
      result +
      `$font-family: ${sans.family.reduce(
        (result, family, index) =>
          `${index === 0 ? '' : result + ', '}'${family}'`,
        ''
      )};`;

    return result;
  }

  return undefined;
}

export function readConfigurationFile(path: string): ConfigurationFile {
  const configurationFile = fs.readFileSync(path, 'utf8');
  const parsedConfigurationFile = JSON.parse(configurationFile);
  return parsedConfigurationFile;
}

export function generateSass(configuration: ConfigurationFile) {
  const colors = generatePrimaryColors(configuration);
  const font = generateFont(configuration);

  colors &&
    fs.writeFileSync(
      __dirname + '/../scss/public/colors/overrides.scss',
      colors
    );
  font &&
    fs.writeFileSync(__dirname + '/../scss/public/font/overrides.scss', font);

  const result = sass.renderSync({
    file: __dirname + '/../scss/index.scss',
    outFile: __dirname + '/../index.css',
  });

  fs.writeFileSync(__dirname + '/../index.css', result.css);
}

const [, , configurationFile] = process.argv;
const configurationFileAbsolutePath = path.resolve(
  process.cwd(),
  configurationFile
);
console.log(`🦢 Reading configuration file ${configurationFile}`);

const configuration = readConfigurationFile(configurationFileAbsolutePath);
generateSass(configuration);

console.log(`🦢 Successfully updated with new theme 💫`);
