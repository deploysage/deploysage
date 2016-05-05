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
        result: target_document_result(instances_by_model_class),
        entities: target_document_entities(instances_by_model_class),
      }.deep_stringify_keys
    end

    private

    def load_instances_by_model_class
      model_classes_to_load = all_model_classes.reject do |model_class|
        ChangesCapture.configuration.ignored_models.include?(model_class)
      end

      model_classes_to_load.each_with_object({}) do |model_class, memo|
        instances_with_attributes = model_class.all.order('id').to_a.map(&:attributes)
        memo[model_class.name.downcase.pluralize] = instances_with_attributes
      end
    end

    def all_model_classes
      # ensure all model classes are loaded
      Dir.foreach("#{Rails.root}/app/models") do |f|
        require f if f =~ /.*\.rb/
      end

      ActiveRecord::Base.descendants
    end

    def target_document_result(instances_by_model_class)
      instances_by_model_class.each_with_object({}) do |value, result|
        model_class_pluralized = value[0]
        instances_with_attributes = value[1]
        result[model_class_pluralized] =
          instances_with_attributes.map do |instance_with_attributes|
            instance_with_attributes.fetch('id').to_s
          end
      end
    end

    def target_document_entities(instances_by_model_class)
      instances_by_model_class.each_with_object({}) do |value, entities|
        model_class_pluralized = value[0]
        instances_with_attributes = value[1]
        entities[model_class_pluralized] =
          instances_with_attributes.each_with_object({}) do |instance_with_attributes, memo|
            instance_with_attributes.keys.each do |key|
              if key == 'id' || key =~ /_id$/
                instance_with_attributes[key] = instance_with_attributes[key].to_s
              end
              camelized_key = key.camelize(:lower)
              instance_with_attributes[camelized_key] = instance_with_attributes.delete(key)
            end

            memo[instance_with_attributes.fetch('id')] = instance_with_attributes
          end
      end
    end
  end
end
