class InventorySerializer < ActiveModel::Serializer
  attributes :id, :product, :quantity
end
