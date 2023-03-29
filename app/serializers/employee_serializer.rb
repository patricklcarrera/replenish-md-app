class EmployeeSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :password
  has_many :invoices
end
