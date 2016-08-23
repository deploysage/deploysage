require 'active_support/core_ext/string/inflections'

module ChangesCapture
  # :nodoc:
  # rubocop:disable Metrics/ClassLength
  class JsonPatchRenderer
    OpInfo = Struct.new(
      :op,
      :model_id,
      :model_name_pluralized,
      :field_changes,
      :destroyed_id_index
    )

    def render(captured_changes)
      op_objects = []
      captured_changes.map do |captured_change|
        op_info = op_info_struct_from_change(captured_change.dup)
        op_objects += op_objects_from_change(op_info)
      end
      op_objects
    end

    private

    # rubocop:disable Metrics/AbcSize
    def op_info_struct_from_change(change)
      OpInfo.new(
        op_action_map[change.delete(:action)],
        change.delete(:id),
        change.delete(:model_name).pluralize,
        change.keys.sort.map do |field_name|
          {
            field_name: field_name.to_s.camelize(:lower),
            change: {
              old: change[field_name][0],
              new: change[field_name][1],
            },
          }
        end,
        change.delete(:destroyed_id_index)
      )
    end

    def op_action_map
      {
        create: 'add',
        update: 'replace',
        destroy: 'remove',
      }
    end

    def op_objects_from_change(op_info)
      op_objects_for_change = []

      # rubocop:disable Style/CaseIndentation
      case op_info.op
        when 'add'
          op_objects_for_change += op_objects_for_add(op_info)
        when 'replace'
          op_objects_for_change += op_objects_for_replace(op_info)
        when 'remove'
          op_objects_for_change += op_objects_for_remove(op_info)
      end

      op_objects_for_change
    end

    def op_objects_for_add(op_info)
      op_objects_for_add = []
      # fully create entity entries first
      # add the document entities entry for the new model
      op_objects_for_add += entity_objects_for_add(op_info)

      op_objects_for_add += entity_objects_for_field_changes(op_info)

      # create result references after entity entries are fully created
      # create the document result entry for the new model
      op_objects_for_add += result_object_for_add(op_info.model_id, op_info.model_name_pluralized)
      op_objects_for_add
    end

    def op_objects_for_replace(op_info)
      entity_objects_for_field_changes(op_info)
    end

    def op_objects_for_remove(op_info)
      [
        {
          op: 'remove',
          path: "/entities/#{op_info.model_name_pluralized}/#{op_info.model_id}",
        }.stringify_keys!,
        {
          op: 'remove',
          path: "/result/#{op_info.model_name_pluralized}/#{op_info.destroyed_id_index}",
        }.stringify_keys!,
      ]
    end

    def entity_objects_for_field_changes(op_info)
      op_info.field_changes.map do |field_change|
        entity_object_for_field(
          op_info.op,
          op_info.model_id,
          op_info.model_name_pluralized,
          field_change
        )
      end
    end

    def entity_objects_for_add(op_info)
      [
        {
          op: 'add',
          path: "/entities/#{op_info.model_name_pluralized}/#{op_info.model_id}",
          value: {},
        }.stringify_keys!,

        # id is always first, not sorted like other fields
        {
          op: 'add',
          path: "/entities/#{op_info.model_name_pluralized}/#{op_info.model_id}/id",
          value: op_info.model_id.to_s,
        }.stringify_keys!,
      ]
    end

    def result_object_for_add(model_id, model_name_pluralized)
      [
        {
          op: 'add',
          path: "/result/#{model_name_pluralized}/-", # minus appends to end of array
          value: model_id.to_s,
        }.stringify_keys!,
      ]
    end

    def entity_object_for_field(op, model_id, model_name_pluralized, field_change)
      {
        op: op,
        path: "/entities/#{model_name_pluralized}/#{model_id}/#{field_change[:field_name]}",
        value: field_change[:change][:new].to_s,
      }.stringify_keys!
    end
  end
end
