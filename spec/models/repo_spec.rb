require 'rails_helper'

RSpec.describe Repo do
  it 'has fixtures' do
    fixture = repos(:fixture_repo_1)
    expect(fixture.id).to eq(1)
    expect(fixture.github_identifier).to eq(47_444_606)
    expect(fixture.created_at).to eq(pi_day)
    expect(fixture.updated_at).to eq(pi_day)
  end

  it 'has factories' do
    repo = FactoryGirl.create(:repo)
    expect(repo.github_identifier).to be > 1000
    expect(repo.url).to match(/not_a_real_repo[[:digit:]]/)
  end

  # disabled until we can scope Repo finds to user to avoid Brakeman warnings
  # describe 'associations' do
  #   it 'belongs to an org' do
  #     expect(repos(:fixture_repo_1).org).to be_an_instance_of(Org)
  #   end
  # end
end
