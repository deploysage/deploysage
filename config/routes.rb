Rails.application.routes.draw do
  root to: 'page#show'
  namespace :api do
    namespace :v1 do
      resources :orgs, :repos
      root to: 'root#index'
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
