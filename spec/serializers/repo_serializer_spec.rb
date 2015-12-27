require 'rails_helper'

RSpec.describe RepoSerializer do
  it 'serializes' do
    fixture = repos(:fixture_repo_1)
    expect(RepoSerializer.new(fixture).attributes).to eq(
      id: fixture.id.to_s,
      github_identifier: fixture.github_identifier.to_s,
      url: fixture.url,
      org_id: fixture.org_id.to_s
    )
  end
end
