# :nodoc:
module ChangesCapture
  # :nodoc:
  class Configuration
    attr_accessor :disabled, :renderer_class
    attr_reader :on_captured_changes_block
    attr_writer :ignored_models

    def initialize(disabled: nil, ignored_models: nil, renderer_class: nil)
      self.disabled = disabled
      self.ignored_models = ignored_models || []
      self.renderer_class = renderer_class || ChangesCapture::JsonPatchRenderer
    end

    def ignored_models
      @ignored_models << ActiveRecord::SchemaMigration
    end

    def on_captured_changes(&block)
      fail 'ChangesCapture requires a block to be passed to ' \
        'on_captured_changes configuration option' unless block
      @on_captured_changes_block = block
    end
  end
end
