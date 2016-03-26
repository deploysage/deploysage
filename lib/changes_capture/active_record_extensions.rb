module ActiveRecord
  # :nodoc:
  class Base
    def _create_record(*args)
      return super unless capture_change_active_for_model?
      new_id = super
      capture_change(:create, new_id, self.class, changes)
      new_id
    end

    def _update_record(*args)
      return super unless capture_change_active_for_model?
      result = super
      capture_change(:update, id, self.class, changes)
      result
    end

    def destroy
      return super unless capture_change_active_for_model?
      destroyed_id_index = self.class.where("id < #{id}").order('id').count
      capture_change(:destroy, id, self.class, changes, destroyed_id_index)
      result = super
      result
    end

    before_commit do
      if capture_change_active_for_model?
        # copy and store the latest raw captured changes from the transaction before it ends
        ChangesCapture::State.latest_captured_changes = captured_changes.deep_dup
      end
    end

    after_commit do
      if capture_change_active_for_model?
        renderer = ChangesCapture.configuration.renderer_class.new
        change_operations_document = renderer.render(ChangesCapture::State.latest_captured_changes)
        ChangesCapture.configuration.on_captured_changes_block.call(change_operations_document)
      end
    end

    private

    def capture_change_active_for_model?
      ChangesCapture.active? &&
        !ChangesCapture.configuration.ignored_models.include?(self.class)
    end

    def capture_change(action, id, model_class, changes, destroyed_id_index = nil)
      change_data = changes.dup
      change_data[:action] = action
      change_data[:id] = id
      change_data[:model_name] = model_class.to_s.downcase
      change_data[:destroyed_id_index] = destroyed_id_index if action == :destroy
      captured_changes << change_data
    end

    def captured_changes
      # Store raw captured changes on top level raw transaction, they will automatically
      # go away / reset when the transaction ends
      real_txn = self.class.connection.transaction_manager.instance_variable_get(:@stack)[0]

      if real_txn.instance_variable_defined?(:@captured_changes)
        real_txn.instance_variable_get(:@captured_changes)
      else
        captured_changes = []
        real_txn.instance_variable_set(:@captured_changes, captured_changes)
        captured_changes
      end
    end
  end
end
