require 'rails_helper'

RSpec.describe PageController do
  describe 'GET #show' do
    describe 'assigns @state' do
      attr_reader :state

      describe 'for clientState' do
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

          client_state = state.fetch('clientState')
          ui_state = client_state.fetch('uiState')
          expect(ui_state).to eq('unauthenticated')
        end

        it 'with override from ENV' do
          expect(ENV).to receive(:fetch)
            .with('DS_UI_STATE', anything)
            .and_return('authenticated')

          get :show
          expect(response).to be_success

          @state = assigns(:state)

          client_state = state.fetch('clientState')
          ui_state = client_state.fetch('uiState')
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
          orgs = state.fetch('result').fetch('orgs')
          expect(orgs.first).to eq('1')

          orgs = state.fetch('entities').fetch('orgs')
          expect(orgs.length).to eq(1)
          expect(orgs.fetch('1')).to include(
            'id' => '1',
            'name' => Org.first.name
          )
        end

        it 'including repos' do
          repos = state.fetch('result').fetch('repos')
          expect(repos).to be_a(Array)

          repos = state.fetch('entities').fetch('repos')
          expect(repos.fetch('1')).to include(
            'id' => '1',
            'orgId' => '1',
            'githubIdentifier' => Repo.find_by_id(1).github_identifier
          )
        end
      end
    end
  end
end
