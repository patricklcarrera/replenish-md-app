class InvoiceSerializer < ActiveModel::Serializer
  attributes :id, :employee_id, :product_id, :client_id, :charge, :is_finalized
  belongs_to :employee
end
