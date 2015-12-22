source 'https://rubygems.org'
ruby "2.2.3"

gem 'rails', github: 'rails/rails'
gem 'arel', github: 'rails/arel'
gem 'rack', github: 'rack/rack'

gem 'awesome_print'
gem 'pg'
gem 'process_helper'

# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use ActiveModelSerializers to serialize JSON responses
gem 'active_model_serializers', '~> 0.10.0.rc2'

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
# gem 'rack-cors'

# Use SCSS for stylesheets
gem "sass-rails"
gem 'bootstrap-sass'
gem 'foreman'
gem 'puma'
gem 'react_on_rails'
gem 'therubyracer'
gem "uglifier"

group :production do
  gem "rails_stdout_logging" # Never include this for development or tests
end

group :development do
  # Loading the listen gem enables an evented file system monitor. Check
  # https://github.com/guard/listen#listen-adapters if on Windows or *BSD.
  # gem 'listen', '~> 3.0.5'
end

group :test do
  gem "capybara"
  gem "capybara-screenshot"
  gem "chromedriver-helper"
  gem 'codeclimate-test-reporter', require: false
  gem "coveralls", require: false
  gem 'factory_girl_rails', '~> 4.0'
  gem 'rspec-core', github: 'rspec/rspec-core'
  gem 'rspec-expectations', github: 'rspec/rspec-expectations'
  gem 'rspec-mocks', github: 'rspec/rspec-mocks'
  gem 'rspec-rails', github: 'rspec/rspec-rails'
  gem 'rspec-support', github: 'rspec/rspec-support'
  gem "rspec-retry"
  gem 'rspec_junit_formatter', '0.2.2'
  gem "selenium-webdriver"
end

group :development, :test do
  ################################################################################
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem "spring"
  gem "spring-commands-rspec"

  ################################################################################
  # Linters and Security
  gem 'rubocop', '>= 0.27.0', require: false
  gem 'ruby-lint', '~> 2.0', require: false
  # Critical that require: false be set! https://github.com/brigade/scss-lint/issues/278
  gem "scss_lint", require: false
  gem "brakeman", require: false
  gem "bundler-audit", require: false

  gem 'fixture_builder', git: 'https://github.com/rdy/fixture_builder.git'
end
