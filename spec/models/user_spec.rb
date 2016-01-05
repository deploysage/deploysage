require 'rails_helper'

RSpec.describe User do
  attr_reader :subject

  before do
    @subject = users(:deploysage_user_1)
  end

  it 'has fixtures' do
    expect(subject.id).to eq(1)
    expect(subject.handle).to eq('deploysage-user-1')
    expect(subject.uid).to eq('uid-1')
    expect(subject.created_at).to eq(pi_day)
    expect(subject.updated_at).to eq(pi_day)
  end

  it 'has factories' do
    expect(FactoryGirl.create(:user).handle).to match(/deploysage-user-[[:digit:]]+/)
  end

  describe 'validation' do
    it 'validates handle' do
      expect(subject).to validate_presence_of(:handle)
    end

    it 'validates uid' do
      expect(subject).to validate_presence_of(:uid)
    end
  end
end
