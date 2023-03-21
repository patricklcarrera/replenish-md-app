Rails.application.routes.draw do
  resources :clients
  resources :employees
  resources :invoices
  resources :products
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  get '/hello', to: 'application#hello_world'
  get '/employees', to: 'employee#index'
end
