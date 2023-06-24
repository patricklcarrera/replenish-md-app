# frozen_string_literal: true

class InventoriesController < ApplicationController
  before_action :find_employee

  def assign
    receiver = Employee.find_by(name: params["employee_name"])
    product = Product.find(params[:product_id])

    if @employee.transfer_products(receiver, product, params[:quantity])
      render json: @employee, status: :ok
    else
      render_error
    end
  end

  def update
    # This is the employee for which the inventory is being updated,
    # not the currently logged in employee:
    employee = Employee.find(params[:inventory].delete(:employee_id))

    if employee.update_products_quantities(params[:inventory])
      render json: employee, status: :ok 
    else
      render_error
    end
  end

  private

  def render_error
    render json: { 'error' => "Could not update the employee's inventory" }, status: :bad_request
  end

  def find_employee
    @employee = Employee.find_by(id: params[:id] || session[:employee_id])    
  end
end
