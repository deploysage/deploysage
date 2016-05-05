# :nodoc:
class ChangesBroadcastJob < ApplicationJob
  queue_as :default

  def perform(change_operations_document)
    ActionCable.server.broadcast('state_channel', change_operations_document)
  end
end
