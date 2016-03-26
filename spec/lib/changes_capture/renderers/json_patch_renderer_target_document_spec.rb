require 'rails_helper'

# Note: generated json document schema is normalized according to the
#       normalizr standard: https://github.com/gaearon/normalizr
RSpec.describe 'json patch target document integration' do
  it 'generates target doc with all non-ignored models' do
    target_document = ChangesCapture.target_document
    expect(target_document['result']['orgs']).to eq(Org.all.map(&:id).sort)
    first_org = Org.first
    expect(target_document['entities']['orgs'][first_org['id'].to_s]).to eq(first_org.attributes)
    last_org = Org.last
    expect(target_document['entities']['orgs'][last_org['id'].to_s]).to eq(last_org.attributes)
  end
end
