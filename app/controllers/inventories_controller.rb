# frozen_string_literal: true

class InventoriesController < ApplicationController
  before_action :find_employee, only: :update
  def assign
    # TODO: Reduce Quantity from the sender and increase from the reciever 
  end

  def update
    # TODO: Update the Prducts-Quantities for that particular employee 
  end

  private
  def find_employee
    @employee = Employee.find_by(id: params[:id] || session[:employee_id])    
  end
end
