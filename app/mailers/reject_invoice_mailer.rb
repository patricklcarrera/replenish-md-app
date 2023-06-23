# frozen_string_literal: true

class RejectInvoiceMailer < ApplicationMailer
  def send_mail
    @invoice = params[:invoice]
    @feedback = params[:feedback]

	  mail(
      from: 'patrick@test.com',
      to: @invoice.employee.email,
      subject: "Invoice Needs to be updated, please re-submit this invoice."
    ) do |format|
      format.html { render "layouts/reject_invoice_email" }
    end
  end
end
