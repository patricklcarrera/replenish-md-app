class Employee < ApplicationRecord
  has_many :invoices
  has_many :products
  has_many :clients
  has_secure_password

  scope :admins, -> { where(is_admin: true) }

  def send_reset_password_mail
    rand_str = 5.times.map { (0...(rand(7))).map { ('a'..'z').to_a[rand(26)] }.join }.join("")
    update!(temp_password: "#{name}-#{rand_str}".gsub(/\s+/, ""))

    SendResetPasswordLinkMailer.with(employee: self).reset_password_mail.deliver_now
  end
end
