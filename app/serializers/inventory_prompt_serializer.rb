class InventoryPromptSerializer < ActiveModel::Serializer
  attributes :id, :employee, :product, :quantity, :assigned_by, :is_accepted
end
