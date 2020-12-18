/* eslint-disable @typescript-eslint/no-unused-expressions */

import {
  readConfigurationFile,
  generateSass,
  createConfigurationFile,
} from './util';
import * as path from 'path';
import * as yargs from 'yargs';

const DEFAULT_FILENAME = 'dirty-swan.config.json';
const DEFAULT_PATH = './';

yargs
  .command(
    'init [path]',
    'initialize dirty swan with a configuration file',
    (yargs) => {
      yargs.positional('path', {
        describe: 'path to where the configuration file should be at',
        type: 'string',
        default: `${DEFAULT_PATH}${DEFAULT_FILENAME}`,
      });
    },
    ({ path }: { path: string }) => {
      console.log(`🦢 Creating configuration file at: ${path}`);
      createConfigurationFile(path);
      console.log(`🦢 Successfully created configuration file at: ${path}`);
    }
  )
  .command(
    'theme [configuration]',
    'theme dirty swan according to the configuration file',
    (yargs) => {
      yargs.positional('configuration', {
        describe: '',
        default: `${DEFAULT_PATH}${DEFAULT_FILENAME}`,
      });
    },
    ({ configuration: configurationFile }: { configuration: string }) => {
      const configurationFileAbsolutePath = path.resolve(
        process.cwd(),
        configurationFile
      );
      console.log(`🦢 Reading configuration file ${configurationFile}`);

      const configuration = readConfigurationFile(
        configurationFileAbsolutePath
      );
      generateSass(configuration);
      console.log(`🦢 Successfully updated with new theme 💫`);
    }
  )
  .help().argv;
