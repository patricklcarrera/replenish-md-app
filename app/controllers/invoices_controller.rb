class InvoicesController < ApplicationController
  skip_before_action :authorized_employee

  def index
    invoices = Invoice.all 
    render json: invoices, status: :ok
  end

  def show
    invoice = Invoice.find(params[:id])
    render json: invoice, status: :ok
  end

  def create
    @invoice = Invoice.new(invoice_params)
    if @invoice.save!
      @invoice.send_pdf_mail
      render json: @invoice, status: :created
    else
      render json: {'error' => @invoice.errors}, status: :bad_request
    end
  end

  private
  def invoice_params
    params.require(:invoice).permit(:employee_id, :client_id, :product_id, :charge)
  end
end
