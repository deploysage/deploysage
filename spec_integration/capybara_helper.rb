require_relative '../bin/setup_fake_oauth'
require_relative '../spec/rails_helper'
require_relative '../spec_requests/ensure_assets_compiled'

require 'capybara/rspec'
require 'capybara-screenshot/rspec'

Capybara.configure do |config|
  config.register_driver :selenium_chrome do |app|
    Capybara::Selenium::Driver.new(app, browser: :chrome)
  end
  config.javascript_driver = :selenium_chrome
  config.default_driver = :selenium_chrome
  Capybara::Screenshot.register_driver(:selenium_chrome) do |js_driver, path|
    js_driver.browser.save_screenshot(path)
  end
  config.default_max_wait_time = 5
  Capybara::Screenshot.prune_strategy = { keep: 10 }
  config.server_host = '127.0.0.1'
  config.server_port = '3000'
  config.app_host = 'http://127.0.0.1:3000'
  config.run_server = true

  config.server do |app, port|
    # We need to run actioncable for the app to work, but still want to leverage
    # Capybara's automatic Rack server startup (otherwise many complexities with
    # a separate server, can't use transactional fixtures, must manage separate
    # app server process, etc, etc.)
    #
    # But, it must be a server which supports the Rack socket hijacking API
    # (see actioncable README https://github.com/rails/rails/tree/master/actioncable
    # and http://www.rubydoc.info/github/rack/rack/file/SPEC#Hijacking).
    # Capybara starts webkit by default, which doesn't support it, so
    # we override it to use Puma (using the same logic that `rails server` uses).
    APP_PATH = File.expand_path('../../config/application', __FILE__)
    require 'rails/commands/server'

    Rails::Server.new(app: app, Port: port).tap do |server|
      # We need to require application after the server sets environment,
      # otherwise the --environment option given to the server won't propagate.
      require APP_PATH
      Dir.chdir(Rails.application.root)
      # $DEBUG = true
      server.start
    end
  end
end
