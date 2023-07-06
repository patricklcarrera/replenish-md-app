# frozen_string_literal: true

class SendNotificationPdfToAdminsMailer < ApplicationMailer
  def send_mail
    admins = Employee.admins
    @invoice = params[:invoice]

    attachments["#{@invoice.client.name}-Non-Finalized-Invoice-#{@invoice.id}.pdf"] = @invoice.document.download

    admins.each do |admin|
	    mail(
	      from: 'patrick@test.com',
	      to: admin.email,
	      subject: "Invoice created."
	    ) do |format|
	      format.html { render "layouts/prompt_email" }
	    end
    end
  end
end
