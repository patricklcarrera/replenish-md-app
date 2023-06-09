class Employee < ApplicationRecord
  validates_uniqueness_of :name
  has_many :invoices
  has_many :products
  has_many :clients
  has_many :inventory_prompts, class_name: 'InventoryPrompt'
  has_many :employees_inventories, class_name: 'EmployeeInventory'

  has_secure_password

  %i[admins inv_managers].each do |role|
    scope role.to_sym, -> { where(("is_"+role.to_s.chop!).to_sym => true) }
  end

  def send_reset_password_mail
    rand_str = 5.times.map { (4...8).map { ('a'..'z').to_a[rand(26)] }.join }.join("")
    update!(temp_password: "#{rand_str}".gsub(/\s+/, ""))

    SendResetPasswordLinkMailer.with(employee: self).reset_password_mail.deliver_now
  end

  def transfer_to_colleague(product, receiver_employee, quantity)
    receiver_prompt = receiver_employee.inventory_prompts.find_or_create_by(product: product)
    receiver_prompt.update(assigned_by: self.name, quantity: (receiver_prompt.quantity.to_i + quantity.to_i))

    current_inventory = self.employees_inventories.where(product: product).first
    current_inventory.quantity -= quantity.to_i
    current_inventory.save!
  end
end
