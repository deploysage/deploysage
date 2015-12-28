require 'rails_helper'

RSpec.describe PageController do
  describe 'GET #show' do
    it 'assigns @state' do
      get :show

      expect(response).to be_success

      orgs = assigns(:state).fetch(:orgs)
      expect(orgs).to be_a(Array)
      expect(orgs.first).to eq(
        id: '1',
        name: Org.first.name
      )
    end
  end
end
