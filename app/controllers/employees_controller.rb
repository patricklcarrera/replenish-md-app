class EmployeesController < ApplicationController
    skip_before_action :authorized_employee

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

    private
    def employee_params
        params.permit(:name, :email, :password, :is_admin)
    end
end
