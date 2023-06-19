# frozen_string_literal: true

class SendNotificationPdfToAdminsMailer < ApplicationMailer
  def send_mail
    admins = Employee.admins
    @invoice = params[:invoice]

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
