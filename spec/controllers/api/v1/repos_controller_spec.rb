require 'rails_helper'

RSpec.describe Api::V1::ReposController do
  let(:repo) { repos(:fixture_repo_1) }

  describe 'successful' do
    describe '#index' do
      it 'works' do
        get :index
        expect(JSON.parse(response.body).fetch('data').first.fetch('id')).to eq(repo.id.to_s)
      end
    end

    describe '#show' do
      it 'works' do
        get :show, id: repo
      end
    end

    describe '#create' do
      it 'works' do
        post :create, params: { repo: { url: 'new url', github_identifier: 42 } }
        created = Repo.last
        expect(created.url).to eq('new url')
        expect(created.github_identifier).to eq(42)
      end
    end

    describe '#update' do
      it 'works' do
        post :update, params: { id: repo.id, repo: { url: 'new url' } }
        expect(repo.reload.url).to eq('new url')
      end
    end

    describe '#destroy' do
      it 'works' do
        post :destroy, params: { id: repo.id }
        expect(Repo.find_by_id(repo.id)).to be_nil
      end
    end

    after do
      expect(response).to be_success
    end
  end

  describe 'failure' do
    describe '#create' do
      it 'fails' do
        post :create, params: { repo: { url: nil, github_identifier: 'gh id' } }
      end
    end

    describe '#update' do
      it 'fails' do
        post :update, params: { id: repo.id, repo: { url: nil } }
      end
    end

    after do
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end
end
