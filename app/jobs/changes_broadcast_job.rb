# :nodoc:
class ChangesBroadcastJob < ApplicationJob
  queue_as :default

  def perform(change_operations_document)
    ActionCable.server.broadcast('change_operations_document', change_operations_document)
  end
end
