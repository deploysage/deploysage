require 'rails_helper'

RSpec.describe PageController do
  describe 'GET #show' do
    before do
      get :show
      expect(response).to be_success
    end

    describe 'assigns @state' do
      attr_reader :state
      before do
        @state = assigns(:state)
      end

      it 'including only a single org ever' do
        orgs = state.fetch(:orgs)
        expect(orgs).to be_a(Array)
        expect(orgs.size).to eq(1)
        expect(orgs.first).to eq(
          id: '1',
          name: Org.first.name,
        )
      end

      it 'including repos' do
        repos = state.fetch(:repos)
        expect(repos).to be_a(Array)
        repo = Repo.first
        expect(repos.first).to eq(
          id: '1',
          org_id: '1',
          github_identifier: repo.github_identifier,
          url: repo.url,
        )
      end
    end
  end
end
