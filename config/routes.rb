Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  root to: 'home#index'
  mount_devise_token_auth_for 'User', at: 'auth'

  namespace :api do
    namespace :v1 do
      resources :services, only: :index do
        collection do
          get :types
        end
      end
      resources :tasks, only: [:index, :create, :destroy]
    end
  end
end
