class InvoicesController < ApplicationController
    def index 
        invoices = Invoice.all 
        render json: invoices, status: :ok
    end

    def show
        invoice = Invoice.find(params[:id])
        render json: invoice, status: :ok
    end

    def create
        invoice = Invoice.create!(invoice_params)
        render json: invoice, status: :created
    end

  
    private
    def invoice_params
        params.permit(:employee_id, :product_id, :client_id, :charge)
    end
end
