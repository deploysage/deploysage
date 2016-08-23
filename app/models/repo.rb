# :nodoc:
class Repo < ActiveRecord::Base
  # belongs_to :org # disabled until we can scope Repo finds to user to avoid Brakeman warnings
  validates :url, :github_identifier, presence: true

  # after_update_commit do
  #   StateBroadcastJob.perform_later(self)
  # end
end
