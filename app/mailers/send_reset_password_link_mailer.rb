# frozen_string_literal: true

class SendResetPasswordLinkMailer < ApplicationMailer
  def reset_password_mail
    @employee = params[:employee]

    mail(
      from: 'patrick@test.com',
      to: @employee.email,
      subject: "Temporary Password for #{@employee.name}"
    ) do |format|
      format.html { render "layouts/reset_password_email" }
    end
  end
end
