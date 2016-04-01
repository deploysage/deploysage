require 'rails_helper'

RSpec.describe 'ChangesCapture ActiveRecord extensions' do
  it 'does not capture ignored models' do
    expect_any_instance_of(Oauth).to_not receive(:capture_change)
    oauth = Oauth.create!(token: 'x', secret: 'x')
    oauth.update_attributes(token: 'y')
    oauth.destroy!
  end
end
