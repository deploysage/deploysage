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
          id: 2,
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
          path: "/entities/orgs/#{new_id}/created_at",
          value: time,
        }.stringify_keys!,
        {
          op: 'add',
          path: "/entities/orgs/#{new_id}/name",
          value: 'new_name',
        }.stringify_keys!,
        {
          op: 'add',
          path: "/entities/orgs/#{new_id}/updated_at",
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
          id: 1,
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
          path: '/entities/orgs/1/updated_at',
          value: time,
        }.stringify_keys!,
      ]

      change_operations_document = subject.render(captured_changes)

      expect(change_operations_document).to eq(expected_operations_document)
    end
  end
end

# {
#   result: {
#     orgs: ['1'],
#     repos: ['2'],
#   },
#   entities: {
#     orgs: {
#       '1': { id: '1', name: 'foo' },
#     },
#     repos: {
#       '2': { id: '2', githubIdentifier: '314159', url: 'https://github.com/u/r.git' },
#     },
#   },
# }
#
# [
#   { "op": "test", "path": "/a/b/c", "value": "foo" },
#   { "op": "remove", "path": "/a/b/c" },
#   { "op": "add", "path": "/a/b/c", "value": ["foo", "bar"] },
#   { "op": "replace", "path": "/a/b/c", "value": 42 },
#   { "op": "move", "from": "/a/b/c", "path": "/a/b/d" },
#   { "op": "copy", "from": "/a/b/d", "path": "/a/b/e" }
# ]
#
# # target_document = { "foo" => ["bar", "baz"] }
# # operations_document = [{ "op" => "add", "path" => "/foo/1", "value" => "qux" }]
#
# # JSON::Patch.new(target_document, operations_document).call
# { "foo" => ["bar", "qux", "baz"] }
#
# {
#   clientState: {
#     uiState: 'unauthenticated',
#   },
#   orgs: [
#     {
#       id: '1',
#       name: 'foo',
#     },
#   ],
#   repos: [
#     {
#       id: '2',
#       githubIdentifier: '314159',
#       url: 'https://github.com/u/r.git',
#     },
#   ],
# }
