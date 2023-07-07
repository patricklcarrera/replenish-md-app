class Api::EmployeeInventoriesController < ApplicationController
  before_action :find_employee

  def transfer
    @product = Product.find_by(id: params[:product_id])
    current_employee.transfer_to_colleague(@product, @receiver_employee, params[:quantity])
  end

  private
  def find_employee
    @receiver_employee = Employee.find_by(name: params[:employee_name])
  end
end
