Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  namespace :api do
    namespace :v1 do
      resources :services, only: :index
      resources :tasks, only: :index
    end
  end
end
