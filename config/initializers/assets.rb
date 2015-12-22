# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add folder with webpack generated assets to assets.paths
Rails.application.config.assets.paths << Rails.root.join('app', 'assets', 'webpack')

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
Rails.application.config.assets.precompile += %w(
  application_*.*
  server-bundle.js
)
