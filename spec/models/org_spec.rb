require 'rails_helper'

RSpec.describe Org do
  it 'has fixtures' do
    expect(orgs(:fixture_organization_1).name).to eq('Fixture Organization 1')
  end

  it 'has factories' do
    expect(FactoryGirl.create(:org).name).to match(/Organization [[:digit:]]+/)
  end

  describe 'associations' do
    it 'has many repos' do
      expect(orgs(:fixture_organization_1).repos.first).to be_an_instance_of(Repo)
    end
  end
end
