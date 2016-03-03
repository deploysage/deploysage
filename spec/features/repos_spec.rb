require 'rails_helper'

RSpec.feature 'Repos' do
  before do
    visit root_path
  end

  it 'shows url' do
    repo = repos(:fixture_repo_1)
    el = find('.js-repo-url')
    expected_text = "Repo URL: #{repo.url}"
    expect(el.text).to eq expected_text
  end

  xit 'updates url', js: true do
    fill_in('Repo URL', with: 'new url')
    el = find('.js-repo-url')
    expected_text = 'Repo URL: new url'
    expect(el.text).to eq expected_text
  end
end
