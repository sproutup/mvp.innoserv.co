'use strict';

var defaultEnvConfig = require('./default');

module.exports = {
  log: {
    // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
    format: 'dev',
    // Stream defaults to process.stdout
    // Uncomment to enable logging to a log on the file system
    options: {
      //stream: 'access.log'
    }
  },
  app: {
    title: defaultEnvConfig.app.title + ' - Development Environment'
  },
  server: {
    api: process.env.SERVER_API || 'http://localhost:3333'
  },
  aws: {
    accessKeyID: process.env.AWS_ACCESS_KEY_ID || 'ToDo',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'ToDo',
    s3: {
      region: process.env.AWS_S3_REGION || 'PUT YOUR REGION',
      bucket: process.env.AWS_S3_BUCKET || 'PUT YOUR BUCKET',
      imageFolder: process.env.AWS_S3_IMAGE_FOLDER || 'PUT YOUR FOLDER'
    },
    cloudfront: {
      files: process.env.AWS_CLOUDFRONT_FILES || 'PUT YOUR CLOUDFRONT INFO'
    }
  },
  facebook: {
    clientID: process.env.FACEBOOK_ID || 'APP_ID',
    clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
    callbackURL: '/api/auth/facebook/callback'
  },
  twitter: {
    clientID: process.env.TWITTER_CONSUMER_KEY || 'CONSUMER_KEY',
    clientSecret: process.env.TWITTER_CONSUMER_SECRET || 'CONSUMER_SECRET',
    accessID: process.env.TWITTER_ACCESS_TOKEN || 'ACCESS_TOKEN',
    accessSecret: process.env.TWITTER_ACCESS_SECRET || 'ACCESS_SECRET',
    callbackURL: '/api/auth/twitter/callback'
  },
  google: {
    clientID: process.env.GOOGLE_ID || 'APP_ID',
    clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
    callbackURL: '/api/auth/google/callback',
    jwt: {
      client_email: process.env.GOOGLE_JWT_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_JWT_PRIVATE_KEY
    },
    calendar: {
      id: process.env.GOOGLE_CALENDAR_ID
    }
  },
  linkedin: {
    clientID: process.env.LINKEDIN_ID || 'APP_ID',
    clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
    callbackURL: '/api/auth/linkedin/callback'
  },
  github: {
    clientID: process.env.GITHUB_ID || 'APP_ID',
    clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
    callbackURL: '/api/auth/github/callback'
  },
  paypal: {
    clientID: process.env.PAYPAL_ID || 'CLIENT_ID',
    clientSecret: process.env.PAYPAL_SECRET || 'CLIENT_SECRET',
    callbackURL: '/api/auth/paypal/callback',
    sandbox: true
  },
  mailer: {
    from: process.env.MAILER_FROM || 'MAILER_FROM',
    options: {
      service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
      auth: {
        user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
        pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
      }
    }
  },
  livereload: true,
  seedDB: process.env.MONGO_SEED || false
};
