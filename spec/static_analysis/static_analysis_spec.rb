require_relative '../spec_helper'

RSpec.describe 'static analysis checks' do
  it 'ruby-lint' do
    # ruby_lint_cmd = "bin/ruby-lint #{File.expand_path('../../..', __FILE__)}"
    # the "directories" config option doesn't seem to work, it still picks up
    # rails files on ci under vendor/bundle, so have to expliticly whitelist
    # here on the command line
    ruby_lint_cmd = 'bin/ruby-lint app/ lib/ spec/'
    process(ruby_lint_cmd, out: :error, out_ex: true)
  end

  it 'rubocop' do
    process('bundle exec rubocop', out: :error, out_ex: true)
  end
end
