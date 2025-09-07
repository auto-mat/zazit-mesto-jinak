/* eslint-disable @typescript-eslint/no-require-imports */
import { parse } from 'toml';
import fs from 'fs-extra';

const getDeployedAppVersion = () => {
  const deployed_app_version_file = './deployed_app_version.toml';
  let config = { version: '' };
  if (fs.existsSync(deployed_app_version_file)) {
    config = parse(fs.readFileSync(deployed_app_version_file).toString());
  }
  return config;
};

export default getDeployedAppVersion;
