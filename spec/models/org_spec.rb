require 'rails_helper'

RSpec.describe Org do
  subject { orgs(:fixture_organization_1) }

  it 'has fixtures' do
    expect(subject.id).to eq(1)
    expect(subject.name).to eq('Fixture Organization 1')
    expect(subject.created_at).to eq(pi_day)
    expect(subject.updated_at).to eq(pi_day)
  end

  it 'has factories' do
    expect(FactoryGirl.create(:org).name).to match(/Organization [[:digit:]]+/)
  end

  describe 'associations' do
    it 'has many repos' do
      expect(subject.repos.first).to be_an_instance_of(Repo)
    end
  end

  describe 'validation' do
    it 'presence of name' do
      subject.update_attributes(name: nil)
      subject.valid?
      expect(subject.errors[:name].first).to match(/blank/)
    end
  end
end
