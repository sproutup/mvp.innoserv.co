'use strict';

module.exports = {
  app: {
    title: 'SproutUp – Bring Products into the Spotlight',
    description: 'Join marketing campaigns on the newest products. Tell incredible stories with your content. Exercise your influence to amplify brand reach.',
    keywords: 'influencer, marketing, content creator, YouTubers, campaigns',
    googleAnalyticsTrackingID: process.env.GOOGLE_ANALYTICS_TRACKING_ID || 'GOOGLE_ANALYTICS_TRACKING_ID'
  },
  server: {
    api: process.env.SERVER_API || 'http://localhost:3333'
  },
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || '6379'
  },
  google: {
    maps: {
      key: process.env.GOOGLE_MAPS_KEY || 'AIzaSyDnnN1fL1vkptQQLdTL17pFrnH3XOlDNdo'
    }
  },
  mixpanel: {
    token: process.env.MIXPANEL_TOKEN || '278b015f9889dc1481a99150f1bdf48a'
  },
  port: process.env.PORT || 9000,
  templateEngine: 'swig',
  // Session Cookie settings
  sessionCookie: {
    // session expiration is set by default to 7 * 24 hours
    maxAge: 7 * 24 * (60 * 60 * 1000),
    // httpOnly flag makes sure the cookie is only accessed
    // through the HTTP protocol and not JS/browser
    httpOnly: true,
    // secure cookie should be turned to true to provide additional
    // layer of security so that the cookie is set only when working
    // in HTTPS mode.
    secure: false
  },
  // sessionSecret should be changed for security measures and concerns
  sessionSecret: 'MEAN',
  // sessionKey is set to the generic sessionId key used by PHP applications
  // for obsecurity reasons
  sessionKey: 'sessionId',
  sessionCollection: 'sessions',
  logo: 'modules/core/client/img/about/about-banner.jpg',
  favicon: 'modules/core/client/img/logo-square.png'};
