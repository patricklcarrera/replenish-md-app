# frozen_string_literal: true

class ClientsController < ApplicationController
  def index
    clients = Client.all 
    render json: clients, status: :ok
  end
end
