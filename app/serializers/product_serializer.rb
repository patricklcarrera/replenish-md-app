class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :product_type, :cost_price, :retail_price
  has_many :invoices
end
