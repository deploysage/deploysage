require 'rails_helper'

RSpec.describe PageController do
  describe 'GET #show' do
    describe 'assigns @state' do
      attr_reader :state

      describe 'for client_state' do
        before do
          allow(ENV).to receive(:fetch).and_call_original
        end

        it 'defaulting to unauthenticated' do
          expect(ENV).to receive(:fetch)
            .with('DS_UI_STATE', 'unauthenticated')
            .and_return('unauthenticated')

          get :show
          expect(response).to be_success

          @state = assigns(:state)

          client_state = state.fetch(:client_state)
          ui_state = client_state.fetch(:ui_state)
          expect(ui_state).to eq('unauthenticated')
        end

        it 'with override from ENV' do
          expect(ENV).to receive(:fetch)
            .with('DS_UI_STATE', anything)
            .and_return('authenticated')

          get :show
          expect(response).to be_success

          @state = assigns(:state)

          client_state = state.fetch(:client_state)
          ui_state = client_state.fetch(:ui_state)
          expect(ui_state).to eq('authenticated')
        end
      end

      describe 'for nested models' do
        before do
          get :show
          expect(response).to be_success
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
end
