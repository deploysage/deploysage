require('../../app/bundles/DeploySage/startup/DeploySageApp.jsx');

// set up first, order is important
require('./vendor/jasmine-jquery');
require('./initializers/setup_vcr_cassette');
require('./vendor/jquery.simulate.js');
require('./vendor/mock-ajax.js');
require('./initializers/identity_map');

// helpers
require('./helpers/ajax_helpers.js');
require('./helpers/drag_helper.js');
require('./helpers/export_csv_helper.js');
require('./helpers/fetch_helper.js');
require('./helpers/jasmine_content.js');
require('./helpers/jquery_helper.js');
require('./helpers/listener_helper.js');
require('./helpers/panel_helper.js');
require('./helpers/react_helpers.js');
require('./helpers/search_result_helper.js');
require('./helpers/spy_helper.js');
require('./helpers/story_assertions.js');
require('./helpers/spec_helper.js');

// initializers
require('./initializers/ajax.js');
require('./initializers/bootstrap');
require('./initializers/catch_event_failures');
require('./initializers/clean_up_backbone');
require('./initializers/clean_up_globals');
require('./initializers/clean_up_react');
require('./initializers/clock');
require('./initializers/command_queue');
require('./initializers/document_title');
require('./initializers/fixture');
require('./initializers/frontend_flags');
require('./initializers/gapi');
require('./initializers/google_analytics');
require('./initializers/jasmine_extensions');
require('./initializers/jasmine_pp_extensions');
require('./initializers/jquery');
require('./initializers/local_storage');
require('./initializers/logger_initializer');
require('./initializers/redux_store');
require('./initializers/mixpanel');
require('./initializers/mock_date');
require('./initializers/new_relic');
require('./initializers/project_state_reporter_initializer');
require('./initializers/selection');
require('./initializers/setup_csrf_token');
require('./initializers/timezone');
require('./initializers/tracker');
require('./initializers/verbose_spec_descriptions');

// factories
require('./vendor/rosie.js');
require('./factories/command.js');
require('./factories/comment.js');
require('./factories/epic.js');
require('./factories/file_attachment.js');
require('./factories/google_attachment.js');
require('./factories/label.js');
require('./factories/notification.js');
require('./factories/panel.js');
require('./factories/person.js');
require('./factories/project.js');
require('./factories/response_error.js');
require('./factories/story.js');
require('./factories/task.js');
require('./factories/workspace.js');

// matchers
require('./vendor/underscore_matchers.js');
require('./matchers/custom_matchers');
require('./matchers/autosize_matchers');
require('./matchers/deferred_matchers');

console.warn = console.error = (...args) => {
  console.log('To turn this error back into a log message, mock out console.warn and console.error in your test');
  throw new Error(args);
}
