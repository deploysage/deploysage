Rails.application.routes.draw do
  root to: 'page#show'
  namespace :api do
    namespace :v1 do
      resources :orgs, :repos
      root to: 'root#index'
    end
  end

  # We've added an action called "preflight" that renders nothing. OPTIONS is an HTTP method.
  # When making a cross origin request, the HTTP client will automatically make an additional
  # request called a "preflight check" before the actual request you are expecting it to make.
  # The preflight check uses the OPTIONS request method, basically just to ask the server for a
  # green light to make subsequent cross origin requests, and it doesn't actually require a
  # response body, just the headers to tell it what's allowed.
  # - http://fredguest.com/2015/03/06/building-a-stateless-rails-api-with-react-and-twitter-oauth/
  match '*all', to: 'application#preflight', via: [:options]

  get 'current_user', to: 'application#current_user'
  get 'request_token', to: 'tokens#request_token'
  get 'access_token', to: 'tokens#access_token'

  mount ActionCable.server => '/cable'
end
