module ChangesCapture
  # :nodoc:
  module Api
    def configure
      yield(configuration)
    end

    def configuration
      @configuration ||= Configuration.new
    end

    def disable
      configuration.disabled = true
      yield
    ensure
      configuration.disabled = false
    end

    def active?
      configuration.on_captured_changes_block && !configuration.disabled
    end

    def target_document
      instances_by_model_class = load_instances_by_model_class
      {
        result: instances_by_model_class.each_with_object({}) do |value, result|
          model_class_pluralized = value[0]
          instances_with_attributes = value[1]
          result[model_class_pluralized] =
            instances_with_attributes.map do |instance_with_attributes|
              instance_with_attributes.fetch('id')
            end
        end,
        entities: instances_by_model_class.each_with_object({}) do |value, entities|
          model_class_pluralized = value[0]
          instances_with_attributes = value[1]
          entities[model_class_pluralized] =
            instances_with_attributes.each_with_object({}) do |instance_with_attributes, memo|
              memo[instance_with_attributes.fetch('id')] = instance_with_attributes
            end
        end,
      }.deep_stringify_keys
    end

    private

    def load_instances_by_model_class
      model_classes = ActiveRecord::Base.descendants.reject do |model_class|
        ChangesCapture.configuration.ignored_models.include?(model_class)
      end

      model_classes.each_with_object({}) do |model_class, memo|
        instances_with_attributes = model_class.all.order('id').to_a.map(&:attributes)
        memo[model_class.name.downcase.pluralize] = instances_with_attributes
      end
    end
  end
end
