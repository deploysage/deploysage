require 'support/ensure_assets_compiled'

RSpec.configure do |config|
  config.before(:suite) do
    # Next line will ensure that assets are built if webpack -w is not running
    EnsureAssetsCompiled.check_built_assets
  end
end
