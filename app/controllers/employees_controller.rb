class EmployeesController < ApplicationController

    def index 
        employees = Employee.all 
        render json: employees, status: :ok
    end

    def show
        employee = Employee.find(params[:id])
        render json: employee, status: :ok
    end
end
