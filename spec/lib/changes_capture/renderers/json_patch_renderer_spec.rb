require 'spec_helper'
require 'active_support/core_ext/hash/keys'
require_relative '../../../../lib/changes_capture/renderers/json_patch_renderer'

# Note: generated json document schema is normalized according to the
#       normalizr standard: https://github.com/gaearon/normalizr
RSpec.describe ChangesCapture::JsonPatchRenderer do
  let(:time) { Time.zone.now.to_s }

  describe 'with existing entities' do
    it 'create generates add operation' do
      new_id = '2'

      captured_changes = [
        {
          id: '2',
          action: :create,
          model_name: 'org',
          name: [nil, 'new_name'],
          created_at: [nil, time],
          updated_at: [nil, time],
        },
      ]

      expected_operations_document = [
        {
          op: 'add',
          path: "/entities/orgs/#{new_id}",
          value: {},
        }.stringify_keys!,
        {
          op: 'add',
          path: "/entities/orgs/#{new_id}/id",
          value: new_id,
        }.stringify_keys!,
        {
          op: 'add',
          path: "/entities/orgs/#{new_id}/createdAt",
          value: time,
        }.stringify_keys!,
        {
          op: 'add',
          path: "/entities/orgs/#{new_id}/name",
          value: 'new_name',
        }.stringify_keys!,
        {
          op: 'add',
          path: "/entities/orgs/#{new_id}/updatedAt",
          value: time,
        }.stringify_keys!,
        {
          op: 'add',
          path: '/result/orgs/-',
          value: new_id,
        }.stringify_keys!,
      ]

      change_operations_document = subject.render(captured_changes)

      expect(change_operations_document).to eq(expected_operations_document)
    end

    it 'update generates replace operation' do
      captured_changes = [
        {
          id: '1',
          action: :update,
          model_name: 'org',
          name: %w(original_name new_name),
          updated_at: [nil, time],
        },
      ]

      expected_operations_document = [
        {
          op: 'replace',
          path: '/entities/orgs/1/name',
          value: 'new_name',
        }.stringify_keys!,
        {
          op: 'replace',
          path: '/entities/orgs/1/updatedAt',
          value: time,
        }.stringify_keys!,
      ]

      change_operations_document = subject.render(captured_changes)

      expect(change_operations_document).to eq(expected_operations_document)
    end
  end
end
