require 'rails_helper'

RSpec.describe ApplicationController do
  describe 'successful' do
    describe '#current_user' do
      it 'works' do
        user = users(:deploysage_user_1)
        expect(JWT).to receive(:decode).with('abc', Rails.application.secrets.secret_key_base)
          .and_return([{ 'uid' => user.uid }])
        controller.request.headers['Authorization'] = 'abc'
        get :current_user, { params: {} }, 'Authorization' => 'abc'
        expect(JSON.parse(response.body)).to eq('handle' => user.handle)
      end
    end

    after do
      expect(response).to be_success
    end
  end

  describe 'failure' do
    describe '#current_user' do
      it 'fails' do
        controller.request.headers['Authorization'] = 'abc'
        expect(JWT).to receive(:decode).with('abc', Rails.application.secrets.secret_key_base)
          .and_raise(JWT::DecodeError)
        get :current_user, { params: {} }, 'Authorization' => 'abc'
        expect(JSON.parse(response.body)).to eq('error' => 'authentication failed')
      end
    end
  end
end
