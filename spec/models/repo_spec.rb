require 'rails_helper'

RSpec.describe Repo do
  it 'has fixtures' do
    expect(repos(:fixture_repo_1).github_identifier).to eq(47444606)
  end
end
