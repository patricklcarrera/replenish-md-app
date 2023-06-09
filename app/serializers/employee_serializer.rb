class EmployeeSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :password, :is_admin
  has_many :invoices

end
