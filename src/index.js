require('dotenv').config();
const axios = require('axios');
const jsonwebtoken = require('jsonwebtoken');

const { L } = require('kopitech-logger')('Token Client');

const currentConfig = {
  earlyRefreshSeconds: parseInt(process.env.TOKEN_EARLY_REFRESH_SECONDS || '30', 10),
  loginUrl: process.env.TOKEN_LOGIN_URL,

  clientId: process.env.TOKEN_CLIENT_ID,
  clientSecret: process.env.TOKEN_CLIENT_SECRET,

  logEnabled: (process.env.TOKEN_LOG_ENABLED || 'true').toLowerCase() === 'true',
  logConfig: (process.env.TOKEN_LOG_CONFIG || 'false').toLowerCase() === 'true',
};
currentConfig.logEnabled && currentConfig.logConfig && L.info(currentConfig);

let currentToken;
let currentTokenExp = 0;

const configure = (config = {}) => {
  if (config.logEnabled != null) {
    currentConfig.logEnabled = config.logEnabled;
    currentConfig.logEnabled && L.info(`Updating Config [Log Enabled] - ${config.logEnabled}`);
  }

  if (config.logConfig != null) {
    currentConfig.logConfig = config.logConfig;
    currentConfig.logEnabled && L.info(`Updating Config [Log Config] - ${config.logConfig}`);
  }

  if (config.clientId != null) {
    currentConfig.clientId = config.clientId;
    currentConfig.logEnabled && L.info(`Updating Config [Client ID] - ${config.clientId}`);
  }

  if (config.clientSecret != null) {
    currentConfig.clientSecret = config.clientSecret;
    currentConfig.logEnabled && L.info(`Updating Config [Client Secret] - ****`);
  }

  if (config.loginUrl != null) {
    currentConfig.loginUrl = config.loginUrl;
    currentConfig.logEnabled && L.info(`Updating Config [Login URL] - ${config.loginUrl}`);
  }

  if (config.earlyRefreshSeconds != null) {
    currentConfig.earlyRefreshSeconds = config.earlyRefreshSeconds;
    currentConfig.logEnabled && L.info(`Updating Config [Early Refresh (seconds)] - ${config.earlyRefreshSeconds}`);
  }

  currentConfig.logEnabled && L.info(`Config Updated`);
  currentConfig.logEnabled && currentConfig.logConfig && L.info(currentConfig);
};

const getToken = async () => {
  try {
    const now = Math.floor(new Date().getTime() / 1000);
    if (currentToken == null || currentTokenExp < now) {
      const body = {
        clientId: currentConfig.clientId,
        clientSecret: currentConfig.clientSecret,
      };
      const response = await axios.post(currentConfig.loginUrl, body);
      const { data } = response;
      const token = data.access_token;

      const payload = jsonwebtoken.decode(token);

      // Save Current Token
      currentToken = token;
      currentTokenExp = payload.exp - currentConfig.earlyRefreshSeconds;
    }

    return Promise.resolve(currentTokenExp);
  } catch (error) {
    return Promise.reject(error);
  }
}

module.exports = {
  configure,
  getToken,
};
