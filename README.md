# Kopitech Token Client
A client library for getting self service token

## Installation
Using `npm`:
```npm install --save kopitech-token-client```

## Usage
```
const tokenClient = require('kopitech-token-client');
const token = await tokenClient.getToken();
```

## Config
`loginUrl` (STRING) - Kopitech Authenticator Service Client Login URL

`clientId` (STRING) - Client ID

`clientSecret` (STRING) - Client Secret

`earlyRefreshSeconds` (INTEGER) - Early token refresh time (in seconds)

`logEnabled` (BOOLEAN: default true) - Whether to log

`logConfig` (BOOLEAN: default false) - Whether to log config upon changes


## Environment Variable
`TOKEN_LOGIN_URL` (STRING) - Kopitech Authenticator Service Client Login URL

`TOKEN_CLIENT_ID` (STRING) - Client ID

`TOKEN_CLIENT_SECRET` (STRING) - Client Secret

`TOKEN_EARLY_REFRESH_SECONDS` (STRING: default `client`) - Early token refresh time (in seconds)

`TOKEN_LOG_ENABLED` (BOOLEAN: default true) - Whether to log

`TOKEN_LOG_CONFIG` (BOOLEAN: default false) - Whether to log config upon changes

`LOGGING_ENABLED` (BOOLEAN default: true) - Whether logs should be enabled

`LOGGING_LEVEL` (BOOLEAN default: info) - Log level to be used (debug, info, warn, error)


## Contributions
Contributions to the Library are welcomed.
