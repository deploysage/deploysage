require 'rails_helper'

# Note: generated json document schema is normalized according to the
#       normalizr standard: https://github.com/gaearon/normalizr
RSpec.describe 'json patch target document integration' do
  it 'generates target doc with all non-ignored models' do
    target_document = ChangesCapture.target_document
    expect(target_document['result']['orgs']).to eq(Org.all.map { |org| org.id.to_s }.sort)
    first_org = Org.first
    first_org_id = target_document['entities']['orgs'][first_org['id'].to_s]['id']
    expect(first_org_id).to eq(first_org.attributes['id'].to_s)
    last_org = Org.last
    last_org_id = target_document['entities']['orgs'][last_org['id'].to_s]['id']
    expect(last_org_id).to eq(last_org.attributes['id'].to_s)
  end
end
