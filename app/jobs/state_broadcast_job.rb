# :nodoc:
class StateBroadcastJob < ApplicationJob
  queue_as :default

  def perform(repo)
    ActionCable.server.broadcast('state_channel', repo.url)
  end
end
