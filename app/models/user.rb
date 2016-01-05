# :nodoc:
class User < ActiveRecord::Base
  validates :uid, :handle, presence: true
end
