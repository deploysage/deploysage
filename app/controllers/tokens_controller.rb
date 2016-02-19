# :nodoc:
class TokensController < ApplicationController
  def request_token
    oauth_callback = ENV.fetch('OAUTH_CALLBACK')
    if ENV['DS_FAKE_OAUTH_ENABLED'] == 'true'
      # skip the oauth authentication and redirect directly to oauth redirect
      token = ENV.fetch('DS_FAKE_OAUTH_TOKEN')
      secret = ENV.fetch('DS_FAKE_OAUTH_SECRET')
      redirect_url = "#{oauth_callback}?oauth_token=#{ENV.fetch('DS_FAKE_OAUTH_TOKEN')}"
    else
      request_token = TWITTER.get_request_token(oauth_callback: oauth_callback)
      token = request_token.token
      secret = request_token.secret
      redirect_url = request_token.authorize_url(oauth_callback: oauth_callback)
    end
    Oauth.create(token: token, secret: secret)
    redirect_to redirect_url
  end

  def access_token
    oauth = Oauth.find_by(token: params[:oauth_token])
    oauth_redirect = oauth.present? ? origin_with_jwt(oauth) : ENV['ORIGIN']
    redirect_to oauth_redirect
  end

  private

  def origin_with_jwt(oauth)
    user = find_or_create_user(get_access_token_params(oauth))
    jwt = JWT.encode(
      { uid: user.uid, exp: 1.day.from_now.to_i },
      Rails.application.secrets.secret_key_base
    )
    "#{ENV['ORIGIN']}?jwt=#{jwt}"
  end

  def get_access_token_params(oauth)
    if ENV['DS_FAKE_OAUTH_ENABLED'] == 'true'
      {
        user_id: ENV.fetch('DS_FAKE_OAUTH_USER_ID'),
        screen_name: ENV.fetch('DS_FAKE_OAUTH_SCREEN_NAME'),
      }
    else
      request_token = OAuth::RequestToken.new(TWITTER, oauth.token, oauth.secret)
      access_token = request_token.get_access_token(oauth_verifier: params[:oauth_verifier])
      {
        user_id: access_token.params[:user_id],
        screen_name: access_token.params[:screen_name],
      }
    end
  end

  def find_or_create_user(access_token_params)
    User.find_or_create_by(uid: access_token_params[:user_id]) do |u|
      u.handle = access_token_params[:screen_name]
    end
  end
end
