require 'rails_helper'

RSpec.shared_examples 'signin' do
  it 'signs in' do
    # render signin page
    get '/'
    expect(response).to render_template(:show)
    expect(response.body).to include('signIn')

    # test preflight:
    # OPTIONS routes must be tested with a request spec.
    # See https://github.com/rspec/rspec-rails/issues/925
    options '/all'

    # signin
    get '/request_token'
    follow_redirect!

    get '/access_token', params: { oauth_token: 'fake_oauth_token' }
  end
end

RSpec.describe 'signin flow', type: :request do
  describe 'with fake oauth enabled' do
    before do
      allow(ENV).to receive(:[]).and_call_original
      allow(ENV).to receive(:fetch).and_call_original
      allow(ENV).to receive(:[]).with('DS_FAKE_OAUTH_ENABLED').and_return('true')
      allow(ENV).to receive(:fetch).with('DS_FAKE_OAUTH_TOKEN').and_return('fake_oauth_token')
      allow(ENV).to receive(:fetch).with('DS_FAKE_OAUTH_SECRET').and_return('fake_oauth_secret')
      allow(ENV).to receive(:fetch).with('DS_FAKE_OAUTH_USER_ID').and_return('uid-1')
      allow(ENV).to receive(:fetch).with('DS_FAKE_OAUTH_SCREEN_NAME')
        .and_return('deploysage-user-1')
    end

    include_examples 'signin'
  end

  describe 'with real oauth mocked' do
    let(:request_token) { double }
    let(:access_token) { double }
    let(:oauth_callback) { { oauth_callback: ENV.fetch('OAUTH_CALLBACK') } }

    before do
      user = users(:deploysage_user_1)
      allow(request_token).to receive(:token).and_return('fake_oauth_token')
      allow(request_token).to receive(:secret).and_return('fake_oauth_secret')
      allow(request_token).to receive(:authorize_url).with(oauth_callback).and_return('/')
      allow(TWITTER).to receive(:get_request_token).with(oauth_callback).and_return(request_token)
      allow(access_token).to receive(:params).and_return(
        { user_id: user.id },
        screen_name: 'user-screen-name'
      )
      allow_any_instance_of(OAuth::RequestToken).to receive(:get_access_token)
        .and_return(access_token)
    end

    include_examples 'signin'
  end
end
