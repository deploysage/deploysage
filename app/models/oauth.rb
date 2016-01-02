# :nodoc:
class Oauth < ActiveRecord::Base
  validates :token, :secret, presence: true
end
