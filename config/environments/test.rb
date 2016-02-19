Rails.application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  # The test environment is used exclusively to run your application's
  # test suite. You never need to work with it otherwise. Remember that
  # your test database is "scratch space" for the test suite and is wiped
  # and recreated between test runs. Don't rely on the data there!
  config.cache_classes = true

  # Do not eager load code on boot. This avoids loading your whole application
  # just for the purpose of running a single test. If you are using a tool that
  # preloads Rails for running tests, you may have to set it to true.
  config.eager_load = false

  # Show full error reports
  config.consider_all_requests_local       = true

  # Configure public file server for tests with Cache-Control for performance.
  # config.public_file_server.enabled = true
  # config.public_file_server.headers = {
  #   'Cache-Control' => 'public, max-age=3600'
  # }

  # Disable caching.
  config.action_controller.perform_caching = false
  config.cache_store = :null_store

  # Raise exceptions instead of rendering exception templates.
  config.action_dispatch.show_exceptions = false

  # Disable request forgery protection in test environment.
  config.action_controller.allow_forgery_protection = false

  # Tell Action Mailer not to deliver emails to the real world.
  # The :test delivery method accumulates sent emails in the
  # ActionMailer::Base.deliveries array.
  config.action_mailer.delivery_method = :test

  # Randomize the order test cases are executed.
  config.active_support.test_order = :random

  # Print deprecation notices to the stderr.
  config.active_support.deprecation = :stderr

  # Debug mode disables concatenation and preprocessing of assets.
  # This option may cause significant delays in view rendering with a large
  # number of complex assets.
  config.assets.debug = true

  # Asset digests allow you to set far-future HTTP expiration dates on all assets,
  # yet still be able to expire them through the digest params.
  config.assets.digest = true

  # Adds additional error checking when serving assets at runtime.
  # Checks for improperly declared sprockets dependencies.
  # Raises helpful error messages.
  config.assets.raise_runtime_errors = true

  # Raises error for missing translations
  # config.action_view.raise_on_missing_translations = true

  # OAuth config:
  # ORIGIN is the react client, which is where it redirects after authenticating
  ENV['ORIGIN'] = 'http://127.0.0.1:3000'
  # OAUTH_CALLBACK must match callback URL in OAuth provider config
  ENV['OAUTH_CALLBACK'] = 'http://127.0.0.1:3000/access_token'
  # DS_ORIGIN is passed to client as origin, for building links like auth callback.
  ENV['DS_ORIGIN'] = '127.0.0.1:3000'
end
