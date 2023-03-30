class EmployeeSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :password
  has_many :invoices

  # def my_invoices
  #   object.invoices.map do |invoice|
  #     {
  #       id: invoice.id,
  #       client_name: invoice.client_name,
  #       product_name: invoice.product_name
  #     }
  #   end
  # end
end
