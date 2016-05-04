require 'rails_helper'

RSpec.describe 'ChangesCapture ActiveRecord extensions' do
  it 'does not capture ignored models' do
    # NOTE! IF THIS TEST FAILS UNEXPECTEDLY, run `bin/spring stop` and try again
    # TODO: Fix this...
    # puts "ChangesCapture ignored_models = #{ChangesCapture.configuration.ignored_models}"
    expect_any_instance_of(Oauth).to_not receive(:capture_change)
    oauth = Oauth.create!(token: 'x', secret: 'x')
    oauth.update_attributes(token: 'y')
    oauth.destroy!
  end
end
