# :nodoc:
class TokensController < ApplicationController
  def request_token
    request_token = TWITTER.get_request_token(oauth_callback: ENV['OAUTH_CALLBACK'])
    Oauth.create(token: request_token.token, secret: request_token.secret)
    redirect_to request_token.authorize_url(oauth_callback: ENV['OAUTH_CALLBACK'])
  end

  def access_token
    oauth = Oauth.find_by(token: params[:oauth_token])
    oauth_redirect = oauth.present? ? origin_with_jwt(oauth) : ENV['ORIGIN']
    redirect_to oauth_redirect
  end

  private

  def origin_with_jwt(oauth)
    user = find_or_create_user(get_access_token(oauth))
    jwt = JWT.encode(
      { uid: user.uid, exp: 1.day.from_now.to_i },
      Rails.application.secrets.secret_key_base
    )
    "#{ENV['ORIGIN']}?jwt=#{jwt}"
  end

  def get_access_token(oauth)
    request_token = OAuth::RequestToken.new(TWITTER, oauth.token, oauth.secret)
    request_token.get_access_token(oauth_verifier: params[:oauth_verifier])
  end

  def find_or_create_user(access_token)
    User.find_or_create_by(uid: access_token.params[:user_id]) do |u|
      u.handle = access_token.params[:screen_name]
    end
  end
end
