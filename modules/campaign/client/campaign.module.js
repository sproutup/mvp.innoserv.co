'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('campaign');
ApplicationConfiguration.registerModule('campaign.routes', ['ui.router']);
ApplicationConfiguration.registerModule('campaign.trial.routes', ['ui.router']);
