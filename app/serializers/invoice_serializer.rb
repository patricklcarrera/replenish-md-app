class InvoiceSerializer < ActiveModel::Serializer
  attributes :id, :employee_id, :product_id, :client_id, :charge, :is_finalized
  belongs_to :employee
  belongs_to :client
  belongs_to :product
  attribute :client_name do
    object.client.name
  end
  attribute :product_name do
    object.product.name
  end
  attribute :employee_name do
    object.employee.name
  end
end
