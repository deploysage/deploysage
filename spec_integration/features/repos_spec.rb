require_relative '../capybara_helper'

RSpec.feature 'Repos' do
  before do
    visit root_path
    click_link 'signin' if find('body').has_css?('#signin')
  end

  it 'shows url' do
    repo = repos(:fixture_repo_1)
    el = find('.spec-RepoWidget-url')
    expected_value = repo.url
    expect(el.text).to eq expected_value
  end

  it 'updates url' do
    display_element_locator = '.spec-RepoWidget-url'
    input_field_locator = '#repo-url'
    # NOTE: this find will fail if there is no text content
    expected_text = find(display_element_locator).text

    input_field_native = find(input_field_locator).native
    %w(a b c).each do |key|
      input_field_native.send_key(key)
      expected_text = "#{expected_text}#{key}"
      # do a find to block until actioncable+redux updates page
      find(display_element_locator, text: expected_text)
    end

    expect(find(display_element_locator).text).to eq(expected_text)
  end
end
