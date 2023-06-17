class InvoiceSerializer < ActiveModel::Serializer
  attributes :id, :employee_id, :client_id, :charge, :is_finalized
  belongs_to :employee
  belongs_to :client
  has_many :products

  attribute :client_name do
    object.client&.name
  end

  attribute :employee_name do
    object.employee&.name
  end
end
