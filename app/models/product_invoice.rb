# frozen_string_literal: true

class ProductInvoice < ApplicationRecord
  self.table_name = :products_invoices
  
  belongs_to :product
  belongs_to :invoice
end
