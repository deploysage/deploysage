require 'rails_helper'

RSpec.describe Api::V1::OrgsController do
  let(:org) { orgs(:fixture_organization_1) }

  describe 'successful' do
    describe '#index' do
      it 'works' do
        get :index
        expect(JSON.parse(response.body).fetch('data').first.fetch('id')).to eq(org.id.to_s)
      end
    end

    describe '#show' do
      it 'works' do
        get :show, params: { id: org }
      end
    end

    describe '#create' do
      it 'works' do
        post :create, params: { org: { name: 'new name' } }
        expect(Org.last.name).to eq('new name')
      end
    end

    describe '#update' do
      it 'works' do
        post :update, params: { id: org.id, org: { name: 'new name' } }
        expect(org.reload.name).to eq('new name')
      end
    end

    describe '#destroy' do
      it 'works' do
        post :destroy, params: { id: org.id }
        expect(Org.find_by_id(org.id)).to be_nil
      end
    end

    after do
      expect(response).to be_success
    end
  end

  describe 'failure' do
    describe '#create' do
      it 'fails' do
        post :create, params: { org: { name: nil } }
      end
    end

    describe '#update' do
      it 'fails' do
        post :update, params: { id: org.id, org: { name: nil } }
      end
    end

    after do
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end
end
