source 'https://rubygems.org'

gem 'rails', path: "/Users/woolley/workspace/rails"
gem 'arel', github: "rails/arel"
gem 'rack', github: "rack/rack"

gem 'pg'
gem 'process_helper'

# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Use ActiveModelSerializers to serialize JSON responses
gem 'active_model_serializers', '~> 0.10.0.rc2'

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
# gem 'rack-cors'

gem 'puma'

group :development do

  # Loading the listen gem enables an evented file system monitor. Check
  # https://github.com/guard/listen#listen-adapters if on Windows or *BSD.
  # gem 'listen', '~> 3.0.5'
end

group :test do
  gem 'codeclimate-test-reporter', require: nil
  gem 'ruby-lint', '~> 2.0'
  gem 'rubocop', '>= 0.27.0'
end

group :development, :test do
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'

  gem 'rspec-rails', '~> 3.0'
  gem 'factory_girl_rails', '~> 4.0'
  gem 'fixture_builder', git: 'https://github.com/rdy/fixture_builder.git'
end
