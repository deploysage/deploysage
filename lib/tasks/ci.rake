require 'rainbow'

if Rails.env.development? || Rails.env.test?
  # See tasks/linters.rake

  task :bundle_audit do
    puts Rainbow("Running security audit on gems (bundle_audit)").green
    Rake::Task["bundle_audit"].invoke
  end

  task :security_audit do
    puts Rainbow("Running security audit on code (brakeman)").green

    process "brakeman --exit-on-warn --quiet -A -z"
  end

  task :js_tests do
    puts Rainbow("Running JavaScript tests").green
    process "npm run test:client"
  end

  task :rspec_tests do
    puts Rainbow("Running RSpec tests").green
    if ENV['CIRCLECI']
      process 'RAILS_ENV=test bin/rspec -r rspec_junit_formatter --format RspecJunitFormatter ' \
        '-o $CIRCLE_TEST_REPORTS/rspec/junit.xml'
    else
      process "bin/rspec #{ENV['RSPEC_OPTS']} spec"
    end
  end

  task :rspec_request_tests do
    puts Rainbow("Running RSpec Request tests").green
    if ENV['CIRCLECI']
      process 'RAILS_ENV=test bin/rspec -r rspec_junit_formatter --format RspecJunitFormatter ' \
        '-o $CIRCLE_TEST_REPORTS/rspec/junit.xml'
    else
      process "bin/rspec #{ENV['RSPEC_OPTS']} spec_requests"
    end
  end

  task :rspec_integration_tests do
    puts Rainbow("Running RSpec Capybara integration tests").green
    if ENV['CIRCLECI']
      process 'RAILS_ENV=test bin/rspec -r rspec_junit_formatter --format RspecJunitFormatter ' \
        '-o $CIRCLE_TEST_REPORTS/rspec/junit.xml'
    else
      process "bin/spring stop"
      process "bin/rspec spec_integration"
    end
  end

  namespace :ci do
    desc "Run all audits and tests"
    task all: [
      :environment,
      :lint,
      :rspec_tests,
      :js_tests,
      :rspec_integration_tests,
      :bundle_audit,
      :security_audit
    ] do
      begin
        puts Rainbow("PASSED").green
        puts ""
      rescue Exception => e
        puts "#{e}"
        puts Rainbow("FAILED").red
        puts ""
        raise(e)
      end
    end

    # DUPLICATED FROM ci:all IN ORDER TO RUN VIA bin/ci AS A WORKAROUND
    # TO INTEGRATION TESTS WHICH ARE FLAKY ONLY AS PART OF ENTIRE RUN.
    # SEE https://www.pivotaltracker.com/story/show/116186847
    desc "Run all audits and tests except for integration specs"
    task all_without_integration: [
      :environment,
      :lint,
      :rspec_tests,
      :js_tests,
      :bundle_audit,
      :security_audit
    ] do
      begin
        puts Rainbow("PASSED").green
        puts ""
      rescue Exception => e
        puts "#{e}"
        puts Rainbow("FAILED").red
        puts ""
        raise(e)
      end
    end
  end

  task ci: "ci:all"
  task ci_without_integration: "ci:all_without_integration"

  task(:default).clear.enhance([:ci])
end
