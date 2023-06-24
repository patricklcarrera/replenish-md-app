class EmployeeSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :password, :is_admin, :is_inv_manager, :gfe, :percentage, :products_quantities
  has_many :invoices
  has_many :products_quantities, class_name: 'ProductQuantity'

  def products_quantities
    object.products_quantities.map do |product_quantity|
      ProductQuantitySerializer.new(product_quantity).attributes
    end
  end
end
