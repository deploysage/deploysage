module ApplicationCable
  # :nodoc:
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
      logger.add_tags 'ActionCable', current_user.handle
    end

    protected

    def find_verified_user
      jwt_token = request.params['jwt']
      if jwt_token && jwt_token != 'null'
        uid = JWT.decode(jwt_token, Rails.application.secrets.secret_key_base)[0]['uid']
        verified_user = User.find_by(uid: uid)
      end

      # TODO: hook up JWT auth, for now just return
      return User.first

      if verified_user
        verified_user
      else
        reject_unauthorized_connection
      end
    end
  end
end
