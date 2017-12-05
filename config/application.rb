require_relative 'boot'

require 'rails/all'

Bundler.require(*Rails.groups)

module TgmReact
  class Application < Rails::Application
    config.load_defaults 5.1
    config.middleware.use Rack::Cors do
      allow do
        origins 'localhost:3000', 'safe-everglades-57796.herokuapp.com'
        resource '*',
          headers: :any,
          expose: ['access-token', 'expiry', 'token-type', 'uid', 'client'],
          methods: [:get, :post, :options, :delete, :put]
      end
    end
  end
end
