require 'changes_capture'

ChangesCapture.configure do |config|
  config.ignored_models = [
    Oauth,
  ]
  config.on_captured_changes do |change_operations_document|
    ChangesBroadcastJob.perform_later(change_operations_document)
  end
end
