class Employee < ApplicationRecord
  has_many :invoices
  has_many :products
  has_many :clients
  has_many :products_quantities, class_name: 'ProductQuantity'

  has_secure_password

  %i[admins inv_managers].each do |role|
    scope role.to_sym, -> { where(("is_"+role.to_s.chop!).to_sym => true) }
  end

  def send_reset_password_mail
    rand_str = 5.times.map { (0...(rand(7))).map { ('a'..'z').to_a[rand(26)] }.join }.join("")
    update!(temp_password: "#{name}-#{rand_str}".gsub(/\s+/, ""))

    SendResetPasswordLinkMailer.with(employee: self).reset_password_mail.deliver_now
  end

  def update_products_quantities(inventory)
    inventory.each do |key, value|
      product_quantity = products_quantities.find_or_initialize_by(product: Product.find(key))
      product_quantity.update!(quantity: value.values.first)
    end
  end

  def transfer_products(receiver, product, quantity)
    current_inventory = self.products_quantities.where(product: product).first
    current_inventory.update!(quantity: (current_inventory.quantity - quantity.to_i))

    receiver_inventory = receiver.products_quantities.find_or_initialize_by(product: product)
    receiver_inventory.update!(quantity: (receiver_inventory.quantity.to_i + quantity.to_i))
  end
end
