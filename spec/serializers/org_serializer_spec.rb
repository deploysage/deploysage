require 'rails_helper'

RSpec.describe OrgSerializer do
  it 'serializes' do
    fixture = orgs(:fixture_organization_1)
    expect(OrgSerializer.new(fixture).attributes).to eq(
      id: fixture.id.to_s,
      name: fixture.name
    )
  end
end
