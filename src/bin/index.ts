import * as path from 'path';

import { readConfigurationFile, generateSass } from './util';

const [, , configurationFile] = process.argv;
const configurationFileAbsolutePath = path.resolve(
  process.cwd(),
  configurationFile
);
console.log(`🦢 Reading configuration file ${configurationFile}`);

const configuration = readConfigurationFile(configurationFileAbsolutePath);
generateSass(configuration);

console.log(`🦢 Successfully updated with new theme 💫`);
