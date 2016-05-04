# :nodoc:
class PageController < ApplicationController
  def show
    @state =
      {
        client_state: {
          origin: ENV.fetch('DS_ORIGIN', ''),
          ui_state: ENV.fetch('DS_UI_STATE', 'unauthenticated'),
        },
      }
        .merge(initial_target_document)
        .deep_stringify_keys
        .deep_transform_keys { |k| k.camelize(:lower) }
  end

  private

  def initial_target_document
    hardcoded_org_id = '1'
    target_document = ChangesCapture.target_document.deep_dup
    result = target_document.fetch('result')
    return {} if result.empty?
    result.fetch('orgs').reject! do |org_id|
      org_id != hardcoded_org_id
    end
    target_document.fetch('entities').fetch('orgs').reject! do |org_entity_key|
      org_entity_key != hardcoded_org_id.to_s
    end

    target_document
  end
end
