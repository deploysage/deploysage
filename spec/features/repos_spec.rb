require 'rails_helper'

RSpec.feature 'Repos' do
  background { visit root_path }

  it 'shows url' do
    repo = repos(:fixture_repo_1)
    el = find('.js-repo-url')
    expected_text = "Repo URL: #{repo.url}"
    expect(el.text).to eq expected_text
  end

  it 'updates url' do
    fill_in('repo-url', with: 'new url')
    trigger_event_for('repo-url', :keyup)
    el = find('.js-repo-url')
    expected_text = 'Repo URL: new url'
    expect(el.text).to eq expected_text
  end
end
