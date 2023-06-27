class EmployeeInventorySerializer < ActiveModel::Serializer
  attributes :id, :employee, :product, :quantity
end
