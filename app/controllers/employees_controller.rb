# frozen_string_literal: true

class EmployeesController < ApplicationController
  skip_before_action :authorized_employee
  before_action :find_employee, only: [:send_reset_password_link, :reset_password]

  def index
    employees = Employee.all 
    render json: employees, status: :ok
  end

  def show
    employee = current_employee
    render json: employee, status: :ok
  end

  def name
    render json:{greeting:"Hello #{params[:name]}"}, status: :ok
  end

  def create
    employee = Employee.create!(employee_params)
    render json: employee, status: :created
  end

  def destroy
    employee = Employee.find(params[:id])
    employee.destroy
  end

  def send_reset_password_link
    if @employee
      @employee.send_reset_password_mail
    else
      render json: { 'error': 'Record Not found' }, status: :ok
    end
  end

  def reset_password
    if compare_passwords
      @employee.update!(password: params[:password])
      render json: @employee, status: :ok
    else 
      render json: {'error' => 'Passwords do not match, please try again.'}, status: 302
    end
  end

  private

  def employee_params
    params.permit(:name, :email, :password, :is_admin)
  end

  def find_employee
    @employee = Employee.find_by(id: params[:id] || session[:employee_id])    
  end

  def compare_passwords
    params[:password] == params[:confirmPassword] 
  end
end
