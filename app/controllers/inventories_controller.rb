# frozen_string_literal: true

class InventoriesController < ApplicationController
  before_action :find_inventory, only: %i(update destroy assign)
  before_action :find_employee, only: :assign

  def index
    @inventories = Inventory.all
    render json: @inventories, status: :ok
  end

  def create
    @product = Product.find_or_create_by(name: params[:product_name])
    @inventory = @product.inventory.new(inventory_params)

    if @inventory.save
      render json: @inventory, status: :ok
    else
      render json: { 'error' => 'Could not create Inventory' }, status: :bad_request
    end
  end

  def update
    if @inventory
      @inventory.product.update(name: params[:product_name], product_type: params[:product_type])
      @inventory.update(inventory_params)
      render json: @inventory, status: :ok
    else
      render json: { 'error' => 'Could not find Inventory' }, status: :bad_request
    end
  end

  def destroy
    if @inventory
      @inventory.destroy!
      render json: @inventory, status: :ok
    else
      render json: { 'error' => 'Could not find Inventory' }, status: :bad_request
    end
  end

  def assign
    if @inventory
      @inventory.prompt_to_employee(@receiver_employee, params[:inventory][:quantity])
      render json: @inventory, status: :ok
    else
      render json: { 'error' => 'Could not find Inventory' }, status: :bad_request
    end
  end

  private

  def inventory_params
    params.require(:inventory).permit(:quantity)
  end

  def find_inventory
    @inventory = Inventory.find_by(id: params[:id])
  end

  def find_employee
    @receiver_employee = Employee.find_by(name: params[:employee_name])
  end
end
