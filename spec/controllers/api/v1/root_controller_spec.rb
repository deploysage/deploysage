require 'rails_helper'

RSpec.describe Api::V1::RootController do
  describe 'successful' do
    describe '#index' do
      it 'works' do
        get :index
        expect(JSON.parse(response.body)).to eq(
          'orgs_url' => '/orgs',
          'repos_url' => '/repos'
        )
      end
    end

    after do
      expect(response).to be_success
    end
  end
end
