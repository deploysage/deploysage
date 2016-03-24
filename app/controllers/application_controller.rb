# :nodoc:
class ApplicationController < ActionController::Base
  protect_from_forgery # use default of :null_session, since this is an "API" controller

  before_action :authenticate_request, only: [:current_user]

  def preflight
    render json: {}
  end

  def current_user
    render json: @current_user, only: [:handle]
  end

  private

  # Unused for now, see:
  # http://fredguest.com/2015/03/06/building-a-stateless-rails-api-with-react-and-twitter-oauth/
  # def allow_cross_origin_requests
  #   headers['Access-Control-Allow-Origin'] = '*'
  #   headers['Access-Control-Request-Method'] = '*'
  #   headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
  #   headers['Access-Control-Allow-Headers'] =
  #     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  #   headers['Access-Control-Max-Age'] = '1728000'
  # end

  def authenticate_request
    uid = JWT.decode(
      request.headers['Authorization'],
      Rails.application.secrets.secret_key_base
    )[0]['uid']
    @current_user = User.find_by(uid: uid)
  rescue JWT::DecodeError
    render json: { error: 'authentication failed' }, status: 401
  end
end
