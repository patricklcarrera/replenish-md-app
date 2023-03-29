class InvoiceSerializer < ActiveModel::Serializer
  attributes :id, :employee_id, :product_id, :client_id, :charge, :is_finalized
  belongs_to :employee
  belongs_to :client
  belongs_to :product
end
