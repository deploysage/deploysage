module ChangesCapture
  # :nodoc:
  class State
    cattr_accessor :latest_captured_changes, instance_writer: false, instance_reader: false
  end
end
