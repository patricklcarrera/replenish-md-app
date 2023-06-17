class SessionsController < ApplicationController
    skip_before_action :authorized_employee, only: [:create]
    def create
        employee = Employee.find_by(email: params[:email])
        if employee && employee.authenticate(params[:password])
            session[:employee_id] = employee.id
            render json: employee, status: :ok
        else
            render json: { error: "Invalid email or password" }, status: 401
        end
    end

    def destroy
        session.delete :employee_id
        head :no_content
    end
end
