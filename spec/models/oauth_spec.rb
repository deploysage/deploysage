require 'rails_helper'

RSpec.describe Oauth do
  attr_reader :subject

  before do
    @subject = oauths(:token_1)
  end

  it 'has fixtures' do
    expect(subject.id).to eq(1)
    expect(subject.secret).to eq('secret-1')
    expect(subject.token).to eq('token-1')
    expect(subject.created_at).to eq(pi_day)
    expect(subject.updated_at).to eq(pi_day)
  end

  it 'has factories' do
    expect(FactoryGirl.create(:oauth).token).to match(/token-[[:digit:]]+/)
  end

  describe 'validation' do
    it 'validates secret' do
      expect(subject).to validate_presence_of(:secret)
    end

    it 'validates token' do
      expect(subject).to validate_presence_of(:token)
    end
  end
end
