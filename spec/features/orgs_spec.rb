require 'rails_helper'

RSpec.feature 'Orgs' do
  background { visit root_path }
  it 'shows name' do
    org = orgs(:fixture_organization_1)
    el = find('.js-org-name')
    expected_text = "Organization is named #{org.name}"
    expect(el.text).to eq expected_text
  end
end
