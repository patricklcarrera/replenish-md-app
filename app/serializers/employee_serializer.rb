class EmployeeSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :password, :is_admin, :gfe, :percentage
  has_many :invoices
end
