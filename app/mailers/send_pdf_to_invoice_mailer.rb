# frozen_string_literal: true

class SendPdfToInvoiceMailer < ApplicationMailer
  def send_mail
    @invoice = params[:invoice]
    attachments["#{@invoice.client.name}-Finalized-Invoice-#{@invoice.id}.pdf"] = @invoice.document.download

    mail(
      from: 'patrick@test.com',
      to: @invoice.employee.email,
      subject: "Invoice Attachment."
    ) do |format|
      format.html { render "layouts/invoice_email" }
    end
  end
end
