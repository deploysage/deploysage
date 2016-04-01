require 'active_record'

require 'changes_capture/api'
require 'changes_capture/active_record_extensions'
require 'changes_capture/configuration'
require 'changes_capture/renderers/json_patch_renderer'
require 'changes_capture/state'
require 'changes_capture/version'

# :nodoc:
module ChangesCapture
  extend Api
end
