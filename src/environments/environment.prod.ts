import { version } from 'package.json';

export const environment = {
  production: true,
  logging: {
    logLevels: [
      {
        loggerName: 'root',
        logLevel: 'ERROR'
      },
      // {
      //   loggerName: 'App.DataServiceProvider',
      //   logLevel: 'INFO'
      // }
    ]
  },
  version
};
