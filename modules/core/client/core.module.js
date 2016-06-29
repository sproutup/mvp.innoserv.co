'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
ApplicationConfiguration.registerModule('core.routes',
    ['ui.router', 'buzz.routes', 'calendar.routes', 'community.routes', 'product.routes', 'company.routes',
     'content.routes', 'contributor.routes', 'engagement.routes', 'file.routes', 'landing.routes',
     'message.routes', 'overview.routes', 'settings.routes', 'social.routes', 'team.routes',
     'users.routes', 'hangout.routes', 'theme.routes', 'timeline.routes',
     'campaign.routes', 'campaign.trial.routes']);
ApplicationConfiguration.registerModule('core.admin', ['core']);
ApplicationConfiguration.registerModule('core.admin.routes', ['ui.router']);
