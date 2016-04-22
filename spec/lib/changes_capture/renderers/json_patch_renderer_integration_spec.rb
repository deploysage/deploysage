require 'rails_helper'

# Note: generated json document schema is normalized according to the
#       normalizr standard: https://github.com/gaearon/normalizr
RSpec.describe 'json patch renderer integration' do
  let(:org) { orgs(:fixture_organization_1) }
  let(:org2) { orgs(:fixture_organization_2) }
  let(:new_name) { 'new_name' }

  describe 'with existing entities' do
    let(:target_document) do
      {
        result: {
          orgs: %w(1 2),
        },
        entities: {
          orgs: {
            '1' => { id: '1', name: org.name },
            '2' => { id: '2', name: org2.name },
          },
        },
      }.deep_stringify_keys!
    end

    it 'create generates add operation' do
      expect(ChangesBroadcastJob).to receive(:perform_later) do |change_operations_document|
        created_org = Org.last
        new_id = created_org.id.to_s

        updated_document = JSON::Patch.new(target_document, change_operations_document).call
        expect(updated_document['entities']['orgs'][new_id.to_s]['name']).to eq(new_name)
        expect(updated_document['result']['orgs']).to eq(['1', '2', new_id])
      end
      Org.create!(name: new_name)
    end

    it 'update generates replace operation' do
      orig_updated_at = org.updated_at.to_s
      expect(ChangesBroadcastJob).to receive(:perform_later) do |change_operations_document|
        updated_document = JSON::Patch.new(target_document, change_operations_document).call
        org_object = updated_document['entities']['orgs']['1']
        expect(org_object['name']).to eq(new_name)
        expect(org_object['updated_at']).to be > orig_updated_at
        expect(updated_document['result']).to eq(target_document['result'])
      end

      org.update_attributes!(name: new_name)

      expect(org.reload.name).to eq(new_name)
    end

    it 'destroy generates remove operation' do
      expect(ChangesBroadcastJob).to receive(:perform_later) do |change_operations_document|
        updated_document = JSON::Patch.new(target_document, change_operations_document).call
        expect(updated_document['entities']['orgs']['1']).to be_nil
        expect(updated_document['result']['orgs']).to eq(['2'])
      end

      org.destroy!

      expect(Org.find_by_id(org.id)).to be_nil
    end
  end
end
