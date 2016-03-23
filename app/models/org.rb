# :nodoc:
class Org < ActiveRecord::Base
  has_many :repos
  validates :name, presence: true
end
