require 'rails_helper'

RSpec.describe Repo do
  attr_reader :subject

  before do
    @subject = repos(:fixture_repo_1)
  end

  it 'has fixtures' do
    expect(subject.id).to eq(1)
    expect(subject.github_identifier).to eq(47_444_606)
    expect(subject.created_at).to eq(pi_day)
    expect(subject.updated_at).to eq(pi_day)
  end

  it 'has factories' do
    repo = FactoryGirl.create(:repo)
    expect(repo.github_identifier).to be > 1000
    expect(repo.url).to match(/not_a_real_repo[[:digit:]]/)
  end

  # disabled until we can scope Repo finds to user to avoid Brakeman warnings
  # describe 'associations' do
  #   it 'belongs to an org' do
  #     expect(subject.org).to be_an_instance_of(Org)
  #   end
  # end
end
