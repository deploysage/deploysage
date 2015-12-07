require_relative 'create_fixtures'

FixtureBuilder.configure do |fbuilder|
  # rebuild fixtures automatically when these files change:
  fbuilder.files_to_check += Dir[
    'spec/factories/*.rb',
    'spec/support/fixture_builder.rb',
    'spec/support/create_fixtures.rb'
  ]

  # now declare objects
  fbuilder.factory do
    CreateFixtures.new(fbuilder).create_all
  end
end
