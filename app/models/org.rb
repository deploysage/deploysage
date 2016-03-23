# :nodoc:
class Org < ActiveRecord::Base
  has_many :repos
  validates_presence_of :name
end
