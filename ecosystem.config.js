require('dotenv').config();

module.exports = {
  apps: [
    {
      name: 'ayudante-team',
      script: './src/index.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '2G',
      env: {
        NODE_ENV: 'alpha',
        TOKEN: process.env.TOKEN_ALPHA,
      },
      env_production: {
        NODE_ENV: 'master',
        TOKEN: process.env.TOKEN,
      },
    },
  ],
};
