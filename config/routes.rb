Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  root 'application#tasks'
  mount_devise_token_auth_for 'User', at: 'auth'

  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      resources :services, only: :index do
        collection do
          get :types
        end
      end
      resources :tasks, only: [:index, :create, :update, :destroy]
    end
  end
end
