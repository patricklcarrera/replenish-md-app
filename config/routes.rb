Rails.application.routes.draw do
  resources :clients
  resources :employees, only: [:index, :show, :create, :destroy]
  resources :invoices
  resources :products
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  get '/hello', to: 'application#hello_world'
  get '/employees', to: 'employee#index'
  get '/myprofile', to: 'employee#show'
  get '/invoices', to: 'invoice#index'
  get '/products', to: 'product#index'
  get '/greeting/:name', to: 'employees#name'
  delete '/logout', to: 'sessions#destroy'
  patch '/updateproduct/:id', to: 'products#update'
  post '/products/new', to: 'product#create'
  post '/invoices/new', to: 'invoices#create'
  post '/employees/new', to: 'employees#create'
  post '/login', to: 'sessions#create'
  delete '/products', to: 'product#destroy'
end