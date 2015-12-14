require 'rails_helper'

RSpec.feature 'Orgs' do
  background { visit root_path }
  it 'shows name' do
    el = find('.js-org-name')
    expected_text = 'Organization is named Fixture Organization 1'
    expect(el.text).to eq expected_text
  end
end
